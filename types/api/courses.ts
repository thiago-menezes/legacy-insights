export type CourseUnit = Partial<{
  id: number;
  name: string;
}>;

export type CourseData = Partial<{
  id: string;
  name: string;
  modality: string;
  period: number;
  unit: CourseUnit;
  city: string;
  price?: string;
  shift?: string;
  admissionForm?: string;
  degree?: string;
  slug: string;
}>;

export type CoursesResponse = Partial<{
  data: CourseData[];
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
}>;
