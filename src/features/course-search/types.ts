import { DurationLabel } from './constants';

export type CourseLevel = 'graduation' | 'postgraduate';

export type CourseModality = 'presencial' | 'semipresencial' | 'digital';

export type CourseShift = 'matutino' | 'vespertino' | 'noturno';

export type CourseDuration = DurationLabel;

export type ActiveFilter = {
  id: string;
  label: string;
};

export type CourseFiltersFormValues = {
  courseLevel: CourseLevel;
  state: string;
  city: string;
  unitIds: number[];
  radius: number;
  courseName: string;
  modalities: CourseModality[];
  priceRange: {
    min: number;
    max: number;
  };
  shifts: CourseShift[];
  durations: CourseDuration[];
};

export type CourseFiltersContextValues = {
  filters: CourseFiltersFormValues;
  activeFilters: ActiveFilter[];
  activeFiltersCount: number;
  applyFilters: (filters: CourseFiltersFormValues) => void;
  resetFilters: () => void;
  handleRemoveFilter: (filterId: string) => void;
  handleClearAllFilters: () => void;
};
