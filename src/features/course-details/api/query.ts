import { useQuery } from '@tanstack/react-query';
import { handleCertification } from '@/bff/handlers/certification';
import { handleCourseDetails } from '@/bff/handlers/courses/handler-course';
import { handleCurriculum } from '@/bff/handlers/curriculum';
import { CourseDetailsDTO } from '@/types/api/course-details';

export type CourseDetailsQueryParams = {
  courseId: string;
  slug: string;
  unitId?: string;
  initialData?: CourseDetailsDTO;
};

export const useQueryCourseDetails = (params: CourseDetailsQueryParams) => {
  const { courseId, slug, unitId, initialData } = params;
  const institution = process.env.NEXT_PUBLIC_INSTITUTION || 'Grupo Ser';

  return useQuery({
    queryKey: ['course-details', courseId, slug, unitId],
    queryFn: async () =>
      handleCourseDetails({
        courseId,
        slug,
        unitId: unitId || '',
        institution,
      }),
    enabled: !!courseId,
    initialData,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    staleTime: initialData ? 60 * 1000 : 0,
  });
};

export const useQueryCertification = (
  institutionSlug: string,
  courseId?: string,
  unitSlug?: string,
) => {
  return useQuery({
    queryKey: ['certification', institutionSlug, courseId, unitSlug],
    queryFn: () => handleCertification({ institutionSlug, courseId, unitSlug }),
    enabled: !!institutionSlug,
    refetchOnWindowFocus: false,
  });
};

export const useQueryCurriculum = (
  institutionSlug: string,
  courseId?: string,
  unitSlug?: string,
) => {
  return useQuery({
    queryKey: ['curriculum', institutionSlug, courseId, unitSlug],
    queryFn: () => handleCurriculum({ institutionSlug, courseId, unitSlug }),
    enabled: !!institutionSlug,
    refetchOnWindowFocus: false,
  });
};
