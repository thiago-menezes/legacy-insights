import { startTransition, useCallback, useEffect, useState } from 'react';
import { Button, Grid } from 'reshaped';
import { CourseInput, Icon } from '@/components';
import { useCourseFiltersContext } from '../context';
import styles from './styles.module.scss';

export const CourseSearchBar = () => {
  const { filters, applyFilters } = useCourseFiltersContext();
  const [courseName, setCourseName] = useState(filters.courseName);

  useEffect(() => {
    if (filters.courseName !== courseName) {
      startTransition(() => {
        setCourseName(filters.courseName);
      });
    }
  }, [filters.courseName]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      applyFilters({
        ...filters,
        courseName: courseName.trim(),
      });
    },
    [filters, applyFilters, courseName],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        columns={'1fr auto'}
        gap={2}
        align="end"
        maxWidth="400px"
        className={styles.searchBar}
      >
        <CourseInput value={courseName} onChange={setCourseName} size="large" />

        <Button
          type="submit"
          variant="solid"
          color="primary"
          size="large"
          icon={<Icon name="search" />}
        >
          Buscar
        </Button>
      </Grid>
    </form>
  );
};
