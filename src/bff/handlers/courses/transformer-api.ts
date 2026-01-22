import type {
  CourseEnrollmentDTO,
  CourseShiftDTO,
  CourseAdmissionFormDTO,
  PaymentTypeDTO,
  PaymentOptionDTO,
  EntryOfferDTO,
} from 'types/api/course-details';
import { CourseShift } from '@/features/course-search/types';
import {
  CoursesApiData,
  CoursesApiFormaIngresso,
  CoursesApiOfertaEntrada,
  CoursesApiTipoPagamento,
  CoursesApiTurno,
  CoursesApiValorPagamento,
} from './types-api';

const parsePrice = (priceStr: string | undefined | null): number | null => {
  if (!priceStr) return null;
  const parsed = parseFloat(priceStr);
  return isNaN(parsed) ? null : parsed;
};

const transformEntryOffer = (
  oferta: CoursesApiOfertaEntrada,
): EntryOfferDTO => {
  return {
    startMonth: oferta.startMonth,
    endMonth: oferta.endMonth,
    type: oferta.type,
    value: oferta.value,
  };
};

const transformPaymentOption = (
  valor: CoursesApiValorPagamento,
  index: number,
): PaymentOptionDTO => {
  const basePrice = parsePrice(valor.PrecoBase);
  const monthlyPrice = parsePrice(valor.Mensalidade);

  return {
    id: index,
    value: valor.Valor,
    campaignTemplate: valor.TemplateCampanha || '',
    entryOffer: valor.OfertaEntrada?.map(transformEntryOffer) || [],
    basePrice: valor.PrecoBase,
    monthlyPrice: valor.Mensalidade,
    validFrom: '',
    validTo: '',
    coveragePriority: valor.PrioridadeAbrangencia,
    parsed: {
      currency: 'BRL',
      basePrice,
      monthlyPrice,
    },
  };
};

const transformPaymentType = (
  tipo: CoursesApiTipoPagamento,
): PaymentTypeDTO => {
  return {
    id: parseInt(tipo.ID, 10) || 0,
    name: tipo.Nome_TipoPagamento,
    code: tipo.Codigo,
    checkoutUrl: tipo.LinkCheckout,
    paymentOptions: tipo.ValoresPagamento?.map(transformPaymentOption) || [],
  };
};

const transformAdmissionForm = (
  forma: CoursesApiFormaIngresso,
): CourseAdmissionFormDTO => {
  return {
    id: parseInt(forma.ID, 10) || 0,
    name: forma.Nome_FormaIngresso,
    code: forma.Codigo,
    paymentTypes: forma.TiposPagamento?.map(transformPaymentType) || [],
  };
};

const transformShift = (turno: CoursesApiTurno): CourseShiftDTO => {
  return {
    id: parseInt(turno.ID, 10) || 0,
    name: turno.Nome_Turno as CourseShift,
    period: turno.Periodo,
    courseShiftHash: turno.Hash_CursoTurno,
    admissionForms: turno.FormasIngresso?.map(transformAdmissionForm) || [],
  };
};

const deduplicateAdmissionForms = (
  forms: CourseAdmissionFormDTO[],
): CourseAdmissionFormDTO[] => {
  const formMap = new Map<string, CourseAdmissionFormDTO>();

  for (const form of forms) {
    if (!form.code) continue;
    const existing = formMap.get(form.code);
    if (existing) {
      existing.paymentTypes = [
        ...(existing.paymentTypes || []),
        ...(form.paymentTypes || []),
      ];
    } else {
      formMap.set(form.code, { ...form });
    }
  }

  return Array.from(formMap.values());
};

const deduplicateShiftsByName = (
  shifts: CourseShiftDTO[],
): CourseShiftDTO[] => {
  const shiftMap = new Map<string, CourseShiftDTO>();

  for (const shift of shifts) {
    if (!shift.name) continue;
    const existing = shiftMap.get(shift.name);
    if (existing) {
      existing.admissionForms = [
        ...(existing.admissionForms || []),
        ...(shift.admissionForms || []),
      ];
    } else {
      shiftMap.set(shift.name, { ...shift });
    }
  }

  return Array.from(shiftMap.values()).map((shift) => ({
    ...shift,
    admissionForms: deduplicateAdmissionForms(shift.admissionForms || []),
  }));
};

export const transformCourseApiToEnrollment = (
  course: CoursesApiData,
): CourseEnrollmentDTO => {
  const allShifts = course.Turnos?.map(transformShift) || [];
  const deduplicatedShifts = deduplicateShiftsByName(allShifts);

  return {
    courseId: course.ID,
    courseName: course.Nome_Curso,
    modality: course.Modalidade,
    durationMonths: course.Periodo,
    shifts: deduplicatedShifts,
  };
};
