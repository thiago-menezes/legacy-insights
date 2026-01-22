import { CourseData, CoursesResponse } from '@/types/api/courses';
import { slugify } from '@/utils';
import { formatCourseName, getDegreeTag } from '@/utils/format-course-name';
import { CoursesApiData, CoursesApiResponse } from './types-api';

const transformCourseData = (courseData: CoursesApiData): CourseData => {
  const firstShift = courseData.Turnos?.[0];
  const firstAdmissionForm = firstShift?.FormasIngresso?.[0];

  return {
    id: courseData.ID.toString(),
    name: formatCourseName(courseData.Nome_Curso),
    degree: getDegreeTag(courseData.Nome_Curso),
    modality: courseData.Modalidade,
    period: courseData.Periodo,
    unit: {
      id: courseData.Unidade.ID,
      name: courseData.Unidade.Nome,
    },
    city: courseData.Cidade,
    price: firstAdmissionForm?.TiposPagamento[0]?.ValoresPagamento[0]?.Valor,
    shift: firstShift?.Nome_Turno,
    admissionForm: firstAdmissionForm?.Codigo,
    slug: slugify(courseData.Nome_Curso),
  };
};

export const transformOffers = (
  courseRequest: CoursesApiResponse,
): CoursesResponse => {
  const courses = courseRequest.data
    .map((courseData) => transformCourseData(courseData))
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'pt-BR'));

  return {
    data: courses,
    total: courseRequest.total,
    totalPages: Math.ceil(courseRequest.total / courseRequest.limit),
    page: courseRequest.page,
    limit: courseRequest.limit,
  };
};
