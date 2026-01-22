import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useCurrentInstitution } from '@/hooks';
import { CourseData } from '@/types/api/courses';
import { buildCourseUrl } from '@/utils';
import { useQuerySearchBannerPromos } from '../banner-promo/api/query';
import { useCourseFiltersContext } from '../context';
import { useQueryOffers } from './api/query';
import { ITEMS_PER_PAGE } from './constants';
import { buildPayloadToQueryOffers } from './transformer';

export const useCourseGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { filters } = useCourseFiltersContext();
  const { institutionId } = useCurrentInstitution();
  const router = useRouter();
  const { institutionSlug } = useCurrentInstitution();

  const handleCourseClick = (course: CourseData) => {
    const url = buildCourseUrl({
      courseName: course.name || '',
      courseId: course.id || '',
      city: course.city || '',
      unitName: course.unit?.name || '',
      unitId: course.unit?.id,
      modality: course.modality,
      shift: course.shift,
      admissionForm: course.admissionForm,
      slug: course.slug || '',
    });

    router.push(url);
  };

  const { data: bannerData, isLoading: isBannerLoading } =
    useQuerySearchBannerPromos({
      institutionSlug,
      enabled: !!institutionSlug,
    });

  const bannerItem = bannerData?.data?.[0];

  const {
    data: coursesRequest,
    isLoading,
    isError,
    error,
  } = useQueryOffers(
    buildPayloadToQueryOffers(filters, institutionId),
    currentPage,
    ITEMS_PER_PAGE,
  );

  const totalPages = coursesRequest?.totalPages ?? 0;
  const total = coursesRequest?.total ?? 0;

  const cardsBeforeBanner = coursesRequest?.data?.slice(0, 6) || [];
  const cardsAfterBanner = coursesRequest?.data?.slice(6) || [];

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    isBannerLoading,
    courses: coursesRequest?.data,
    totalPages,
    total,
    currentPage,
    isLoading,
    isError,
    error,
    cardsBeforeBanner,
    cardsAfterBanner,
    bannerItem,
    handlePageChange,
    handleCourseClick,
  };
};
