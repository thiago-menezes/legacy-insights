import { buildCourseUrl } from './course-slug';

export type CourseUrlParams = {
  id: string | number;
  name: string;
  city: string;
  unitName: string;
  unitId?: number;
  modality?: string;
  shift?: string;
  admissionForm?: string;
  slug: string;
};

export const getCourseDetailsUrl = ({
  id,
  city,
  unitName,
  unitId,
  modality,
  shift,
  admissionForm,
  name,
  slug,
}: CourseUrlParams): string => {
  return buildCourseUrl({
    courseName: name,
    courseId: id.toString(),
    city,
    unitName,
    unitId,
    modality,
    shift,
    admissionForm,
    slug,
  });
};

export const routes = {
  home: '/',
  courses: '/cursos',
  courseDetails: getCourseDetailsUrl,
};
