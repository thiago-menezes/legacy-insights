'use server';

import type { CourseTeacherDTO } from 'types/api/course-details';
import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiTeacher } from 'types/strapi/courses';
import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../services/strapi';

export type TeachersQueryParams = {
  courseId: string;
  unitSlug?: string;
};

export const handleTeachersByCourseId = async (
  params: TeachersQueryParams,
): Promise<CourseTeacherDTO[]> => {
  ensureBffInitialized();

  if (!params.courseId) return [];

  const filters: Record<string, unknown> = {
    curso_detalhes: {
      ids_dos_cursos: { $eq: params.courseId },
    },
  };

  // Apply optional unit filter
  if (params.unitSlug) {
    filters.unidades = {
      slug: { $eq: params.unitSlug },
    };
  }

  const response = await strapiFetch<StrapiCollectionResponse<StrapiTeacher>>(
    'corpo-de-docentes',
    {
      filters,
      populate: '*',
      params: {
        status: 'published',
      },
    },
  );

  if (!response?.data) return [];

  return response.data.map((t) => ({
    id: t.id,
    name: t.nome,
    role: t.materia,
    title: t.materia,
    bio: t.biografia,
    description: t.descricao,
    photo: t.foto?.url,
    image: t.foto?.url,
    modalities: t.modalidades?.map((m) => ({
      id: m.id || 0,
      name: m.nome || '',
    })),
  }));
};
