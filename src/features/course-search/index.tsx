'use client';

import { useState } from 'react';
import { View } from 'reshaped';
import { ActiveFilters } from './active-filters';
import { CourseFiltersProvider } from './context';
import { CourseGrid } from './course-grid';
import { FiltersButton } from './filters-button';
import { FiltersContent } from './filters-content';
import { FiltersModal } from './filters-modal';
import { CourseSearchHeader } from './header';
import { ResultsHeader } from './results-header';
import { CourseSearchBar } from './search-bar';
import styles from './styles.module.scss';

const CourseSearchPageContent = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  return (
    <View className={styles.page}>
      <View className={styles.container}>
        <CourseSearchHeader />
        <CourseSearchBar />
        <View direction="row" gap={4}>
          <FiltersButton onClick={() => setIsFiltersModalOpen(true)} />
          <ActiveFilters variant="mobile" />
        </View>

        <View className={styles.mainContent}>
          <View className={styles.filtersSidebar}>
            <FiltersContent />
          </View>

          <ResultsHeader />

          <CourseGrid />
        </View>
      </View>

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
      />
    </View>
  );
};

export const CourseSearchPage = () => {
  return (
    <CourseFiltersProvider>
      <CourseSearchPageContent />
    </CourseFiltersProvider>
  );
};
