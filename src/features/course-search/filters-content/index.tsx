import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'reshaped';
import { ActiveFilters } from '../active-filters';
import { useCourseFiltersContext } from '../context';
import type { CourseFiltersFormValues } from '../types';
import { CityInput } from './city-input';
import { FILTERS_CONTENT_HEIGHT_TO_UPDATE } from './constants';
import { CourseDurationCheckboxes } from './course-duration-checkboxes';
import { CourseLevelTabs } from './course-level-tabs';
import { CourseModalityCheckboxes } from './course-modality-checkboxes';
import { CourseNameInput } from './course-name-input';
import { FilterActions } from './filter-actions';
import { ShiftCheckboxes } from './shift-checkboxes';
import styles from './styles.module.scss';

export const FiltersContent = ({
  handleCloseModal,
}: {
  handleCloseModal?: () => void;
}) => {
  const { filters: appliedFilters, applyFilters } = useCourseFiltersContext();

  const { control, handleSubmit, reset } = useForm<CourseFiltersFormValues>({
    defaultValues: appliedFilters,
    mode: 'onChange',
  });

  const [scrollTop, setScrollTop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY;
    }
    return 0;
  });

  useEffect(() => {
    reset(appliedFilters);
  }, [appliedFilters, reset]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setScrollTop(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const onSubmit = (data: CourseFiltersFormValues) => {
    applyFilters(data);
  };

  const handleEnterKeySubmit = () => {
    handleSubmit(onSubmit)();
    if (handleCloseModal) {
      handleCloseModal();
    }
  };

  return (
    <View className={styles.filtersContent}>
      <div
        className={clsx(styles.formInputsContainer, {
          [styles.formInputsUpdatedHeight]:
            scrollTop > FILTERS_CONTENT_HEIGHT_TO_UPDATE,
          [styles.viewPortMedium]: handleCloseModal,
        })}
      >
        <ActiveFilters variant="sidebar" />

        <CourseLevelTabs control={control} />

        <CityInput control={control} />

        <CourseNameInput control={control} onSubmit={handleEnterKeySubmit} />

        <CourseModalityCheckboxes control={control} />

        {/* TODO: Disable price range slider for now */}
        {/* <PriceRangeSlider control={control} /> */}

        <ShiftCheckboxes control={control} />

        <CourseDurationCheckboxes control={control} />
      </div>

      <div className={styles.filterActionsWrapper}>
        <FilterActions
          onSubmit={() => {
            handleSubmit(onSubmit)();
            if (handleCloseModal) {
              handleCloseModal();
            }
          }}
          onCancel={handleCloseModal}
        />
      </div>
    </View>
  );
};
