import { CourseShift } from '@/features/course-search/types';

export type CourseDetailsDTO = Partial<{
  id: number;
  courseId: string;
  name: string;
  description?: string;
  methodology?: string;
  curriculumGrid?: string;
  certificate?: string;
  featuredImage?: string;
  institution?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
  };
  pedagogicalProject?: string;
  videoUrl?: string;
  featured: boolean;
  modalities?: { id: number; name: string; slug: string }[];
  shifts?: CourseShiftDTO[];
  faqs?: CourseFAQDTO[];
  salaryRanges?: CourseSalaryRangeDTO[];
  enrollment?: CourseEnrollmentDTO;
  offerings?: {
    modalityId: number;
    unitId: number;
    periodId: number;
    price: number | null;
    checkoutUrl: string;
    unit: CourseUnitDTO;
  }[];
  relatedCourses?: CourseDetailsDTO[];
  unit?: CourseUnitDTO;
  city?: string;
  seo?: SeoDTO;
}>;

export type SeoDTO = Partial<{
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  robots?: string;
  image?: string;
  structuredData?: Record<string, unknown>;
}>;

export type CourseSalaryRangeDTO = Partial<{
  level: string;
  range: string;
  description: string;
  icon?: string;
}>;

export type CourseFAQDTO = Partial<{
  question: string;
  answer: string;
}>;

export type CourseUnitDTO = Partial<{
  id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
}>;

export type EntryOfferDTO = Partial<{
  startMonth: number;
  endMonth: number;
  type: 'Percent' | 'Amount';
  value: string;
}>;

export type PaymentOptionDTO = Partial<{
  id: number;
  value: string;
  campaignTemplate: string;
  entryOffer: EntryOfferDTO[];
  basePrice: string;
  monthlyPrice: string;
  validFrom: string;
  validTo: string;
  coveragePriority: number;
  parsed: {
    currency: string;
    basePrice: number | null;
    monthlyPrice: number | null;
  };
}>;

export type PaymentTypeDTO = Partial<{
  id: number;
  name: string;
  code: string;
  checkoutUrl: string;
  paymentOptions: PaymentOptionDTO[];
}>;

export type CourseAdmissionFormDTO = Partial<{
  id: number;
  name: string;
  code: string;
  paymentTypes: PaymentTypeDTO[];
}>;

export type CourseShiftDTO = Partial<{
  id: number;
  name: CourseShift;
  period: string;
  courseShiftHash?: string;
  admissionForms: CourseAdmissionFormDTO[];
}>;

export type CourseEnrollmentDTO = Partial<{
  courseId: number;
  courseName: string;
  modality: string;
  durationMonths: number;
  shifts: CourseShiftDTO[];
}>;

export type CourseTeacherDTO = Partial<{
  id: number;
  name: string;
  role?: string;
  title?: string;
  bio?: string;
  description?: string;
  photo?: string;
  image?: string;
  phone?: string;
  whatsapp?: string;
  courseId?: string;
  modalities?: { id: number; name: string }[];
}>;
