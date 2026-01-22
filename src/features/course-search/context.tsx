import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from 'react';
import { useCityContext } from '@/contexts/city';
import { useQueryParams } from '@/hooks';
import { DEFAULT_FILTERS } from './filters-content/constants';
import type {
  CourseFiltersContextValues,
  CourseFiltersFormValues,
} from './types';
import {
  buildActiveFilters,
  filtersToUrlParams,
  parseFiltersFromSearchParams,
} from './utils';

const CourseFiltersContext = createContext<CourseFiltersContextValues>(
  {} as CourseFiltersContextValues,
);

export const CourseFiltersProvider = ({ children }: PropsWithChildren) => {
  const { searchParams, setParams } = useQueryParams();
  const {
    unitIds: contextUnitIds,
    modalities: contextModalities,
    setModalities: setContextModalities,
  } = useCityContext();
  const skipUrlSyncRef = useRef(false);

  const [appliedFilters, setAppliedFilters] = useState<CourseFiltersFormValues>(
    () => {
      const urlFilters = parseFiltersFromSearchParams(
        new URLSearchParams(searchParams.toString()),
      );

      return {
        ...DEFAULT_FILTERS,
        ...urlFilters,
        unitIds: contextUnitIds,
        modalities: urlFilters.modalities || contextModalities,
      };
    },
  );

  useEffect(() => {
    const urlFilters = parseFiltersFromSearchParams(
      new URLSearchParams(searchParams.toString()),
    );
    startTransition(() => {
      setAppliedFilters((prev) => {
        const hasChanges =
          (urlFilters.courseLevel &&
            urlFilters.courseLevel !== prev.courseLevel) ||
          (urlFilters.courseName !== undefined &&
            urlFilters.courseName !== prev.courseName) ||
          (urlFilters.city !== undefined && urlFilters.city !== prev.city) ||
          (urlFilters.modalities !== undefined &&
            JSON.stringify(urlFilters.modalities) !==
              JSON.stringify(prev.modalities));

        if (!hasChanges) {
          return prev;
        }

        skipUrlSyncRef.current = true;
        return {
          ...prev,
          ...urlFilters,
        };
      });
    });
  }, [searchParams]);

  // Sync unitIds from CityContext to filters
  useEffect(() => {
    setAppliedFilters((prev) => {
      const unitIdsChanged =
        JSON.stringify(prev.unitIds) !== JSON.stringify(contextUnitIds);

      if (!unitIdsChanged) {
        return prev;
      }

      return {
        ...prev,
        unitIds: contextUnitIds,
      };
    });
  }, [contextUnitIds]);

  useEffect(() => {
    if (skipUrlSyncRef.current) {
      skipUrlSyncRef.current = false;
      return;
    }
    setParams(filtersToUrlParams(appliedFilters), { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  const activeFilters = useMemo(
    () => buildActiveFilters(appliedFilters),
    [appliedFilters],
  );

  const activeFiltersCount = activeFilters.length;

  const applyFilters = useCallback(
    (filters: CourseFiltersFormValues) => {
      setAppliedFilters(filters);
      setContextModalities(filters.modalities);
    },
    [setContextModalities],
  );

  const resetFilters = useCallback(() => {
    setAppliedFilters(DEFAULT_FILTERS);
  }, []);

  const handleRemoveFilter = useCallback((filterId: string) => {
    setAppliedFilters((prev) => {
      const updated = { ...prev };

      if (filterId === 'courseName') {
        updated.courseName = '';
      } else if (filterId === 'city') {
        return prev;
      } else if (filterId === 'courseLevel') {
        updated.courseLevel = DEFAULT_FILTERS.courseLevel;
      } else if (filterId === 'priceRange') {
        updated.priceRange = { ...DEFAULT_FILTERS.priceRange };
      } else if (filterId === 'radius') {
        updated.radius = DEFAULT_FILTERS.radius;
      } else if (filterId.startsWith('modality-')) {
        const modality = filterId.replace('modality-', '');
        updated.modalities = prev.modalities.filter((m) => m !== modality);
      } else if (filterId.startsWith('shift-')) {
        const shift = filterId.replace('shift-', '');
        updated.shifts = prev.shifts.filter((s) => s !== shift);
      } else if (filterId.startsWith('duration-')) {
        const duration = filterId.replace('duration-', '');
        updated.durations = prev.durations.filter((d) => d !== duration);
      }

      return updated;
    });
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setAppliedFilters((prev) => ({
      ...DEFAULT_FILTERS,
      state: prev.state,
      city: prev.city,
      unitIds: prev.unitIds,
    }));
  }, []);

  const contextValues: CourseFiltersContextValues = {
    filters: appliedFilters,
    activeFilters,
    activeFiltersCount,
    applyFilters,
    resetFilters,
    handleRemoveFilter,
    handleClearAllFilters,
  };

  return (
    <CourseFiltersContext.Provider value={contextValues}>
      {children}
    </CourseFiltersContext.Provider>
  );
};

export const useCourseFiltersContext = (): CourseFiltersContextValues => {
  const context = useContext(CourseFiltersContext);

  if (context === undefined) {
    throw new Error(
      'useCourseFiltersContext must be used within a CourseFiltersProvider',
    );
  }

  return context;
};
