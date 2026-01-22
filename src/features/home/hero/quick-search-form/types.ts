import { CourseModality } from '../types';

export type QuickSearchFormProps = {
  onSubmit?: (data: QuickSearchFormData) => void;
};

export type QuickSearchFormData = {
  city: string;
  course: string;
  modalities: Array<CourseModality>;
  courseLevel: CourseLevel;
};

export type CourseLevel = 'graduation' | 'postgraduate';
