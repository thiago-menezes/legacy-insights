import { CourseFiltersFormValues } from '../types';

export const FILTERS_CONTENT_HEIGHT_TO_UPDATE = 240;

export const DEFAULT_FILTERS: CourseFiltersFormValues = {
  courseLevel: 'graduation',
  city: '',
  state: '',
  unitIds: [],
  radius: 60,
  courseName: '',
  modalities: ['presencial', 'semipresencial', 'digital'],
  priceRange: {
    min: 100,
    max: 4500,
  },
  shifts: [],
  durations: [],
};
