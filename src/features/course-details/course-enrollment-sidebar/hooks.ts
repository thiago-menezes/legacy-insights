import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  sendLeadCurso,
  sendAddToCart,
  sendBeginCheckout,
} from '@/libs/gtm/events';
import { formatPrice } from '@/utils';
import { useMutationEnrollmentSubmit } from './api/mutation';
import { CourseEnrollmentSidebarProps } from './types';

export const useCourseEnrollmentSidebar = ({
  course,
  selectedModalityId,
  selectedUnitId,
  selectedShiftName,
  selectedAdmissionFormCode,
}: CourseEnrollmentSidebarProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const modalityOfferings = (course.offerings || []).filter(
    (o) => !selectedModalityId || o.modalityId === selectedModalityId,
  );

  const selectedOffering =
    (course.offerings || []).find((o) => {
      const matchesModality =
        !selectedModalityId || o.modalityId === selectedModalityId;
      const matchesUnit = !selectedUnitId || o.unitId === selectedUnitId;
      return matchesModality && matchesUnit;
    }) || modalityOfferings[0];

  const prices = modalityOfferings
    .map((o) => o.price)
    .filter((p): p is number => p !== null && p !== undefined);
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;

  const getSelectedShiftData = useCallback(() => {
    if (!course.enrollment?.shifts) return null;

    const selectedShift =
      course.enrollment.shifts.find(
        (shift) => shift.name === selectedShiftName,
      ) || course.enrollment.shifts[0];

    const selectedForm =
      selectedShift?.admissionForms?.find(
        (form) => form.code === selectedAdmissionFormCode,
      ) || selectedShift?.admissionForms?.[0];

    const firstPaymentType = selectedForm?.paymentTypes?.[0];
    const firstPaymentOption = firstPaymentType?.paymentOptions?.[0];

    return {
      shift: selectedShift,
      form: selectedForm,
      paymentType: firstPaymentType,
      paymentOption: firstPaymentOption,
    };
  }, [course.enrollment, selectedShiftName, selectedAdmissionFormCode]);

  const getClientApiPrice = () => {
    const data = getSelectedShiftData();
    if (!data?.paymentOption?.parsed?.monthlyPrice) return null;

    return {
      price: formatPrice(Number(data.paymentOption.value)),
      monthlyPrice: data.paymentOption.parsed.monthlyPrice,
    };
  };

  const getCheckoutUrl = () => {
    if (!course.enrollment?.shifts) {
      return selectedOffering?.checkoutUrl || '';
    }

    const selectedShift =
      course.enrollment.shifts.find(
        (shift) => shift.name === selectedShiftName,
      ) || course.enrollment.shifts[0];

    if (!selectedShift) {
      return selectedOffering?.checkoutUrl || '';
    }

    const selectedForm =
      selectedShift.admissionForms?.find(
        (form) => form.code === selectedAdmissionFormCode,
      ) || selectedShift.admissionForms?.[0];

    if (!selectedForm) {
      return selectedOffering?.checkoutUrl || '';
    }

    const paymentType = selectedForm.paymentTypes?.[0];
    return paymentType?.checkoutUrl || selectedOffering?.checkoutUrl || '';
  };

  const checkoutUrl = getCheckoutUrl();

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    privacyAccepted: false,
  });

  const [formHasTouched, setFormHasTouched] = useState(false);

  const clientApiPrice = getClientApiPrice();

  const { mutateAsync, isPending } = useMutationEnrollmentSubmit();

  const isFullNameValid = formData.name.trim().split(/\s+/).length >= 2;
  const nameError = !formData.name.trim()
    ? 'Nome é obrigatório'
    : !isFullNameValid
      ? 'Informe nome e sobrenome'
      : null;

  const isPhoneComplete = formData.phone.replace(/\D/g, '').length >= 11;
  const phoneError = !formData.phone.trim()
    ? 'Celular é obrigatório'
    : !isPhoneComplete
      ? 'Informe o telefone completo'
      : null;

  const privacyError = !formData.privacyAccepted
    ? 'Você precisa aceitar a política de privacidade'
    : null;

  const isFormValid =
    !nameError && !phoneError && !!formData.email.trim() && !privacyError;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid) {
        setFormHasTouched(true);
        return;
      }

      if (!executeRecaptcha) {
        return;
      }

      try {
        const token = await executeRecaptcha('enrollment_form');

        if (token) {
          const shiftData = getSelectedShiftData();
          const productHash = shiftData?.shift?.courseShiftHash || '';
          const formaIngresso = shiftData?.form?.code || 'ESP';
          const modalidade = course.enrollment?.modality || '';
          const valorOferta =
            shiftData?.paymentOption?.parsed?.monthlyPrice?.toString() || '';

          const price = shiftData?.paymentOption?.parsed?.monthlyPrice || 0;

          sendLeadCurso({
            ies: course.institution?.name || 'Grupo Ser',
            modalidade: course.enrollment?.modality || '',
            tipoGraduacao: 'Graduação',
            turno: shiftData?.shift?.name || '',
            formaDeIngresso: shiftData?.form?.name || '',
            curso: course.name || '',
            nome: formData.name.split(' ')[0] || '',
            sobrenome: formData.name.split(' ').slice(1).join(' ') || '',
            email: formData.email,
            telefone: formData.phone,
            value: price,
          });

          sendAddToCart({
            currency: 'BRL',
            value: price,
            items: [
              {
                item_name: course.name || '',
                item_id: course.id?.toString() || '',
                price: price,
                item_brand: course.institution?.name || 'Grupo Ser',
                item_category: course.enrollment?.modality || '',
                quantity: 1,
              },
            ],
          });

          const result = await mutateAsync({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            curso: course.name || '',
            modalidade,
            formaIngresso,
            valorOferta,
            productHash,
            pageUrl: typeof window !== 'undefined' ? window.location.href : '',
            recaptchaToken: token,
          });

          if (result.success && result.checkoutUrl) {
            router.push(result.checkoutUrl);
          }
        }
      } catch {
        console.error('Error submitting enrollment');
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isFormValid,
      executeRecaptcha,
      getSelectedShiftData,
      checkoutUrl,
      router,
      formData,
      course.name,
      course.enrollment,
      course.id,
      mutateAsync,
      course.institution?.name,
    ],
  );

  const hasSentBeginCheckoutRef = useRef(false);

  useEffect(() => {
    hasSentBeginCheckoutRef.current = false;
  }, [course.id]);

  useEffect(() => {
    if (hasSentBeginCheckoutRef.current) return;

    const shiftData = getSelectedShiftData();

    if (shiftData) {
      const price = shiftData?.paymentOption?.parsed?.monthlyPrice || 0;

      sendBeginCheckout({
        currency: 'BRL',
        value: price,
        items: [
          {
            item_name: course.name || '',
            item_id: course.id?.toString() || '',
            price: price,
            item_brand: course.institution?.name || 'Grupo Ser',
            item_category: course.enrollment?.modality || '',
            quantity: 1,
          },
        ],
      });

      hasSentBeginCheckoutRef.current = true;
    }
  }, [
    course.id,
    course.name,
    course.enrollment,
    course.institution,
    getSelectedShiftData,
  ]);

  const shiftData = getSelectedShiftData();
  const displayShiftName = shiftData?.shift?.name || '';
  const selectedAdmissionFormName = shiftData?.form?.name || '';

  return {
    handleSubmit,
    formData,
    setFormData,
    formHasTouched,
    setFormHasTouched,
    isFormValid,
    nameError,
    phoneError,
    privacyError,
    isPending,
    minPrice,
    clientApiPrice,
    selectedOffering,
    selectedShiftName: displayShiftName,
    selectedAdmissionFormName,
  };
};
