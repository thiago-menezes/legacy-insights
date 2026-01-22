import {
  COURSE_LEVEL_LABELS,
  DURATION_OPTIONS,
  MODALITY_LABELS,
  SHIFT_LABELS,
} from './constants';
import { DEFAULT_FILTERS } from './filters-content/constants';
import {
  ActiveFilter,
  CourseDuration,
  CourseFiltersFormValues,
  CourseLevel,
} from './types';

export const formatCityForUrl = (city: string): string => {
  return city.toLowerCase().replace(/\s+/g, '-');
};

export const buildActiveFilters = (
  filters: CourseFiltersFormValues,
): ActiveFilter[] => {
  const activeFilters: ActiveFilter[] = [];

  if (filters.courseName) {
    activeFilters.push({
      id: 'courseName',
      label: filters.courseName,
    });
  }

  if (
    filters.courseLevel &&
    filters.courseLevel !== DEFAULT_FILTERS.courseLevel
  ) {
    activeFilters.push({
      id: 'courseLevel',
      label: COURSE_LEVEL_LABELS[filters.courseLevel] || filters.courseLevel,
    });
  }

  // Only show modality badges if 1 or 2 are selected (not 0 or all 3)
  if (filters.modalities.length > 0 && filters.modalities.length < 3) {
    filters.modalities.forEach((modality) => {
      activeFilters.push({
        id: `modality-${modality}`,
        label: MODALITY_LABELS[modality] || modality,
      });
    });
  }

  filters.shifts.forEach((shift) => {
    activeFilters.push({
      id: `shift-${shift}`,
      label: SHIFT_LABELS[shift] || shift,
    });
  });

  filters.durations.forEach((duration) => {
    activeFilters.push({
      id: `duration-${duration}`,
      label: duration,
    });
  });

  if (
    filters.priceRange.min !== DEFAULT_FILTERS.priceRange.min ||
    filters.priceRange.max !== DEFAULT_FILTERS.priceRange.max
  ) {
    activeFilters.push({
      id: 'priceRange',
      label: `R$ ${filters.priceRange.min} - R$ ${filters.priceRange.max}`,
    });
  }

  if (filters.radius !== DEFAULT_FILTERS.radius) {
    activeFilters.push({
      id: 'radius',
      label: `${filters.radius} km`,
    });
  }

  return activeFilters;
};

const VALID_DURATION_LABELS = DURATION_OPTIONS.map((opt) => opt.label);

export const parseFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): Partial<CourseFiltersFormValues> => {
  const filters: Partial<CourseFiltersFormValues> = {};

  const courseLevel = searchParams.get('courseLevel');
  if (courseLevel === 'graduation' || courseLevel === 'postgraduate') {
    filters.courseLevel = courseLevel as CourseLevel;
  }

  const city = searchParams.get('city');
  if (city) {
    filters.city = city;
  }

  const state = searchParams.get('state');
  if (state) {
    filters.state = state;
  }

  const courseName = searchParams.get('course');
  if (courseName) {
    filters.courseName = courseName;
  }

  const modalitiesStr = searchParams.get('modalities');
  if (modalitiesStr) {
    filters.modalities = modalitiesStr
      .split(',')
      .map((m) => (m === 'semi' ? 'semipresencial' : m))
      .filter(
        (m): m is CourseFiltersFormValues['modalities'][number] =>
          m === 'presencial' || m === 'semipresencial' || m === 'digital',
      );
  }

  const shiftsStr = searchParams.get('shifts');
  if (shiftsStr) {
    filters.shifts = shiftsStr
      .split(',')
      .filter(
        (s): s is CourseFiltersFormValues['shifts'][number] =>
          s === 'matutino' || s === 'vespertino' || s === 'noturno',
      );
  }

  const durationsStr = searchParams.get('durations');
  if (durationsStr) {
    filters.durations = durationsStr
      .split(',')
      .filter((d): d is CourseDuration =>
        VALID_DURATION_LABELS.includes(d as CourseDuration),
      );
  }

  const radius = searchParams.get('radius');
  if (radius) {
    const parsedRadius = Number(radius);
    if (!isNaN(parsedRadius)) {
      filters.radius = parsedRadius;
    }
  }

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    filters.priceRange = {
      min: minPrice ? Number(minPrice) : DEFAULT_FILTERS.priceRange.min,
      max: maxPrice ? Number(maxPrice) : DEFAULT_FILTERS.priceRange.max,
    };
  }

  return filters;
};

export const filtersToUrlParams = (filters: CourseFiltersFormValues) => ({
  city: filters.city ? filters.city : null,
  courseLevel:
    filters.courseLevel !== DEFAULT_FILTERS.courseLevel
      ? filters.courseLevel
      : null,
  course: filters.courseName.trim() ? filters.courseName.trim() : null,
  // Only add modalities to URL if 1 or 2 are selected (not 0 or all 3)
  modalities:
    filters.modalities.length > 0 && filters.modalities.length < 3
      ? filters.modalities.join(',')
      : null,
  shifts: filters.shifts.length > 0 ? filters.shifts.join(',') : null,
  durations: filters.durations.length > 0 ? filters.durations.join(',') : null,
  radius:
    filters.radius !== DEFAULT_FILTERS.radius ? String(filters.radius) : null,
  minPrice:
    filters.priceRange.min !== DEFAULT_FILTERS.priceRange.min
      ? String(filters.priceRange.min)
      : null,
  maxPrice:
    filters.priceRange.max !== DEFAULT_FILTERS.priceRange.max
      ? String(filters.priceRange.max)
      : null,
  page: null,
});
