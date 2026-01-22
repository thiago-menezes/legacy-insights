export type CoursesSearchParams = Partial<{
  institution: string;
  level?: 'undergraduate' | 'graduate';
  course?: string;
  modalities?: string;
  shifts?: string;
  durations?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  perPage?: string;
  unitIds?: number[];
}>;
