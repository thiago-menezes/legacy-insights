import { CoursesSearchParams } from '@/types/api/courses-search';
import { getDurationValuesFromLabels } from '../constants';
import { CourseFiltersFormValues } from '../types';

export const buildPayloadToQueryOffers = (
  filters: CourseFiltersFormValues,
  institutionId: string,
): Partial<CoursesSearchParams> => {
  const durationValues = getDurationValuesFromLabels(filters.durations);

  return {
    institution: institutionId,
    unitIds: filters.unitIds,
    modalities:
      filters.modalities?.length > 0 ? filters.modalities.join(',') : undefined,
    shifts: filters.shifts?.length > 0 ? filters.shifts.join(',') : undefined,
    durations: durationValues.length > 0 ? durationValues.join(',') : undefined,
    course: filters.courseName || undefined,
    minPrice:
      filters.priceRange?.min !== 100
        ? String(filters.priceRange?.min)
        : undefined,
    maxPrice:
      filters.priceRange?.max !== 4500
        ? String(filters.priceRange?.max)
        : undefined,
  };
};
