'use server';

import type { CourseDetailsDTO } from 'types/api/course-details';
import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiCourse } from 'types/strapi/courses';
import { ensureBffInitialized } from '@/bff/services/bff';
import { buildClientApiUrl, clientApiFetch } from '@/bff/services/client-api';
import { logger } from '@/utils/logger';
import { strapiFetch } from '../../services/strapi';
import { BffNotFoundError, BffValidationError } from '../../utils/errors';
import { transformCourseApiToEnrollment } from './transformer-api';
import { transformStrapiCourse } from './transformer-strapi';
import { CoursesApiData } from './types-api';

export type CourseDetailsParams = {
  courseId: string;
  slug: string;
  unitId: string;
  institution: string;
};

const handleCourseDetailsFromApi = async (
  courseId: string,
  unitId: string,
  institution: string,
): Promise<CourseDetailsDTO> => {
  const url = buildClientApiUrl(`/cursos/${courseId}`, {
    marca: institution,
    unidadeId: unitId,
  });

  const courseApi = await clientApiFetch<{ data: CoursesApiData }>(url);
  const enrollment = transformCourseApiToEnrollment(courseApi.data);

  if (!courseApi) {
    throw new BffNotFoundError(
      `CourseApi course not found for courseId: ${courseId}`,
    );
  }

  const courseDetailsFromApi = {
    id: Number(courseApi.data.ID),
    courseId: courseId!,
    name: courseApi.data.Nome_Curso,
    enrollment,
    featured: false,
    unit: courseApi.data.Unidade
      ? {
          id: Number(courseApi.data.Unidade.ID),
          name: courseApi.data.Unidade.Nome,
        }
      : undefined,
    city: courseApi.data.Cidade,
  } as CourseDetailsDTO;

  return courseDetailsFromApi;
};

const handleCourseDetailsFromStrapi = async (
  slug: string,
  courseId: string,
): Promise<CourseDetailsDTO> => {
  let coursesDetailsFromStrapi = await strapiFetch<
    StrapiCollectionResponse<StrapiCourse>
  >('courses', {
    filters: {
      slug: { $eq: slug },
    },
    populate: '*',
    params: {
      status: 'published',
    },
  });

  if (!coursesDetailsFromStrapi?.data?.length && courseId) {
    coursesDetailsFromStrapi = await strapiFetch<
      StrapiCollectionResponse<StrapiCourse>
    >('courses', {
      filters: {
        courseId: { $eq: courseId },
      },
      populate: '*',
      params: {
        status: 'published',
      },
    });
  }

  if (!coursesDetailsFromStrapi?.data?.length) {
    logger.warn(
      `[Strapi] course not found for slug: ${slug} or courseId: ${courseId}`,
    );
  }

  const courseDetailsStrapi = transformStrapiCourse(
    coursesDetailsFromStrapi?.data?.[0],
  );

  return {
    ...courseDetailsStrapi,
  } as CourseDetailsDTO;
};

export const handleCourseDetails = async (
  params: CourseDetailsParams,
): Promise<CourseDetailsDTO> => {
  ensureBffInitialized();

  if (!params.slug && !params.courseId) {
    throw new BffValidationError('courseId or slug is required');
  }

  const courseDetailsFromStrapi = await handleCourseDetailsFromStrapi(
    params.slug,
    params.courseId,
  );

  const courseDetailsFromApi = await handleCourseDetailsFromApi(
    params.courseId,
    params.unitId,
    params.institution,
  );

  return {
    ...courseDetailsFromStrapi,
    ...courseDetailsFromApi,
  };
};
