'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { Button, Text, useResponsiveClientValue, View } from 'reshaped';
import type { CourseData } from 'types/api/courses';
import { Icon, Pagination, CourseCard } from '@/components';
import { CourseCardSkeleton } from '@/components/course-card/skeleton';
import { useCityContext } from '@/contexts/city';
import { useCurrentInstitution, usePagination } from '@/hooks';
import { buildCourseUrl, slugify } from '@/utils';
import { useQueryFeaturedCourses } from './api';
import styles from './styles.module.scss';
import type { FeaturedCoursesSectionProps } from './types';

const SKELETON_COUNT = 8;
const COURSES_LIMIT = 8;

export const FeaturedCoursesSection = ({
  title,
  variant = 'carousel',
}: FeaturedCoursesSectionProps) => {
  const router = useRouter();
  const responsiveVariant = useResponsiveClientValue({
    s: 'carousel',
    l: variant === 'grid' ? 'grid' : 'carousel',
  });
  const { institutionId } = useCurrentInstitution();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { city, state, unitIds, focusCityField } = useCityContext();

  const { data, isLoading: isFetching } = useQueryFeaturedCourses({
    unitIds,
    perPage: COURSES_LIMIT,
  });

  const showSkeletons = isFetching;

  const hasCity = useMemo(() => {
    return !!city && !!state;
  }, [city, state]);

  const coursesToShow = useMemo(() => {
    if (showSkeletons || !data?.data) return [];
    return data.data;
  }, [showSkeletons, data]);

  const { currentPage, totalPages, goToPage, isScrollable } = usePagination({
    totalItems: showSkeletons ? SKELETON_COUNT : coursesToShow?.length || 0,
    containerRef: scrollContainerRef as React.RefObject<HTMLDivElement>,
  });

  const handleScroll = useCallback(
    (_e: React.UIEvent<HTMLDivElement>) => {},
    [],
  );

  const handleCourseClick = useCallback(
    (course: CourseData) => {
      if (!institutionId) return;

      const url = buildCourseUrl({
        courseName: course.name || '',
        courseId: course.id || '',
        city: slugify(course.city || ''),
        unitName: course.unit?.name ?? '',
        unitId: course.unit?.id,
        modality: course.modality,
        shift: course.shift,
        admissionForm: course.admissionForm,
        slug: course.slug || '',
      });

      router.push(url);
    },
    [router, institutionId],
  );

  // If there are no courses and we are not loading, we might want to hide the section or show something else.
  // For now, if no city is selected effectively (should generally have a default), we just render.
  if (!showSkeletons && coursesToShow.length === 0) return null;

  return (
    <section className={styles.section} id="cursos">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Text as="h2" variant="featured-1" weight="bold">
              {title}
            </Text>
            <div className={styles.subtitle}>
              <Text as="span" variant="body-2">
                Cursos em:
              </Text>

              {hasCity && (
                <button
                  type="button"
                  onClick={focusCityField}
                  className={styles.locationButton}
                  disabled={isFetching}
                >
                  <Text as="span" variant="body-2" weight="medium">
                    {city} - {state}
                  </Text>
                  <Icon name="current-location" size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.coursesContainer}>
          <div
            ref={scrollContainerRef}
            className={
              responsiveVariant === 'grid' ? styles.grid : styles.coursesScroll
            }
            onScroll={handleScroll}
            role="list"
          >
            {showSkeletons
              ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className={clsx(styles.card, {
                      [styles.cardHorizontalScroll]:
                        responsiveVariant !== 'grid' &&
                        isScrollable &&
                        !showSkeletons,
                    })}
                    role="listitem"
                  >
                    <CourseCardSkeleton />
                  </div>
                ))
              : coursesToShow?.map((course) => (
                  <div
                    key={course.id}
                    className={clsx(styles.card, {
                      [styles.cardHorizontalScroll]:
                        responsiveVariant !== 'grid' &&
                        isScrollable &&
                        !showSkeletons,
                    })}
                    role="listitem"
                  >
                    <CourseCard
                      key={course.id}
                      course={course}
                      onClick={handleCourseClick}
                      className={
                        responsiveVariant === 'grid'
                          ? styles.cardInner
                          : undefined
                      }
                    />
                  </div>
                ))}
          </div>

          {responsiveVariant !== 'grid' && isScrollable && !showSkeletons && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChangeAction={goToPage}
            />
          )}

          <View paddingTop={4} align="center">
            <Link href="/cursos">
              <Button
                color="primary"
                aria-label="Ver todos os cursos disponíveis"
                endIcon={<Icon name="arrow-right" size={16} />}
              >
                Ver todos os cursos
              </Button>
            </Link>
          </View>
        </div>
      </div>
    </section>
  );
};
