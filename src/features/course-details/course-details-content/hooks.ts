import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { formatCourseName } from '@/utils/format-course-name';
import type { CourseDetails } from '../types';
import {
  buildPaymentMethodDisplays,
  findBestPaymentOption,
  type PaymentMethodDisplay,
} from '../utils/payment-utils';

export const useCourseDetailsContent = (course: CourseDetails) => {
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Cursos', href: '/cursos' },
    { label: formatCourseName(course.name || '') },
  ];

  const handleOpenCurriculumModal = useCallback(() => {
    setIsCurriculumModalOpen(true);
  }, []);

  const handleCloseCurriculumModal = useCallback(() => {
    setIsCurriculumModalOpen(false);
  }, []);

  const searchParams = useSearchParams();

  const [selectedModalityId, setSelectedModalityId] = useState<number | null>(
    () => {
      const modality = searchParams.get('modality');
      return modality ? Number(modality) : course.modalities?.[0]?.id || null;
    },
  );

  const [selectedUnitId, setSelectedUnitId] = useState<number | undefined>(
    () => {
      const unit = searchParams.get('unit');
      return unit ? Number(unit) : course.offerings?.[0]?.unitId;
    },
  );

  const [selectedShiftName, setSelectedShiftName] = useState<string | null>(
    () => {
      const shift = searchParams.get('shift');
      return shift || course.enrollment?.shifts?.[0]?.name || null;
    },
  );

  const [selectedAdmissionFormCode, setSelectedAdmissionFormCode] = useState<
    string | null
  >(() => {
    const admissionForm = searchParams.get('admissionForm');
    return (
      admissionForm ||
      course.enrollment?.shifts?.[0]?.admissionForms?.[0]?.code ||
      null
    );
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(() => {
    const paymentMethod = searchParams.get('paymentMethod');
    return paymentMethod || 'Pix';
  });

  const updateUrl = useCallback((key: string, value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.replaceState(null, '', url.pathname + url.search);
  }, []);

  const handleSetModalityId = useCallback(
    (id: number | null) => {
      setSelectedModalityId(id);
      updateUrl('modality', id?.toString() || null);
    },
    [updateUrl],
  );

  const handleSetUnitId = useCallback(
    (id: number | undefined) => {
      setSelectedUnitId(id);
      updateUrl('unit', id?.toString() || null);
    },
    [updateUrl],
  );

  const handleSetShiftName = useCallback(
    (name: string | null) => {
      setSelectedShiftName(name);
      updateUrl('shift', name);
    },
    [updateUrl],
  );

  const handleSetAdmissionFormCode = useCallback(
    (code: string | null) => {
      setSelectedAdmissionFormCode(code);
      updateUrl('admissionForm', code);
    },
    [updateUrl],
  );

  const handleSetPaymentMethod = useCallback(
    (method: string | null) => {
      setSelectedPaymentMethod(method);
      updateUrl('paymentMethod', method);
    },
    [updateUrl],
  );

  const getPaymentMethods = (): PaymentMethodDisplay[] => {
    if (!course.enrollment?.shifts) return [];

    const selectedShift =
      course.enrollment.shifts.find((s) => s.name === selectedShiftName) ||
      course.enrollment.shifts[0];

    if (!selectedShift) return [];

    const selectedForm =
      selectedShift.admissionForms?.find(
        (f) => f.code === selectedAdmissionFormCode,
      ) || selectedShift.admissionForms?.[0];

    if (!selectedForm?.paymentTypes?.[0]?.paymentOptions) return [];

    const paymentType = selectedForm.paymentTypes[0];
    const checkoutUrl = paymentType.checkoutUrl || '';

    const paymentOptions = (paymentType.paymentOptions || []).map((opt) => ({
      condicaoFormaPagamento: opt.id?.toString() || 'Pix',
      Valor: opt.value || '0',
      PrecoBase: opt.basePrice || '0',
      Mensalidade: opt.monthlyPrice?.toString() || '0',
    }));

    const methods = buildPaymentMethodDisplays(paymentOptions, checkoutUrl);

    const bestOption = findBestPaymentOption(methods);
    if (bestOption) {
      return methods.map((m) => ({
        ...m,
        isBestOption: m.type === bestOption.type,
      }));
    }

    return methods;
  };

  const paymentMethods = getPaymentMethods();

  return {
    breadcrumbItems,
    isCurriculumModalOpen,
    setIsCurriculumModalOpen,
    handleOpenCurriculumModal,
    handleCloseCurriculumModal,
    selectedModalityId,
    selectedUnitId,
    selectedShiftName,
    selectedAdmissionFormCode,
    selectedPaymentMethod,
    setSelectedModalityId: handleSetModalityId,
    setSelectedUnitId: handleSetUnitId,
    setSelectedShiftName: handleSetShiftName,
    setSelectedAdmissionFormCode: handleSetAdmissionFormCode,
    setSelectedPaymentMethod: handleSetPaymentMethod,
    paymentMethods,
  };
};
