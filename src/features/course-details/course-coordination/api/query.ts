import { useQuery } from '@tanstack/react-query';
import { handleCoordinatorByCourseId } from '@/bff/handlers/coordinations';
import { handleTeachersByCourseId } from '@/bff/handlers/teachers';

export const useQueryCourseCoordination = (
  courseId: string,
  unitSlug?: string,
) => {
  return useQuery({
    queryKey: ['course-coordination', courseId, unitSlug],
    queryFn: () => handleCoordinatorByCourseId({ courseId, unitSlug }),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
  });
};

export const useQueryCourseTeachers = (courseId: string, unitSlug?: string) => {
  return useQuery({
    queryKey: ['course-teachers', courseId, unitSlug],
    queryFn: () => handleTeachersByCourseId({ courseId, unitSlug }),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
  });
};
