'use server';

import type { CourseTeacherDTO } from 'types/api/course-details';
import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiTeacher } from 'types/strapi/courses';
import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../services/strapi';

export type CoordinationQueryParams = {
  courseId: string;
  unitSlug?: string;
};

export const handleCoordinatorByCourseId = async (
  params: CoordinationQueryParams,
): Promise<CourseTeacherDTO | null> => {
  ensureBffInitialized();

  if (!params.courseId) return null;

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
    'coordenacoes',
    {
      filters,
      populate: '*',
      params: {
        status: 'published',
      },
    },
  );

  if (!response?.data || response.data.length === 0) {
    return null;
  }

  const t = response.data[0];

  return {
    id: t.id,
    name: t.nome,
    role: t.cargo,
    title: t.cargo,
    bio: t.biografia,
    description: t.descricao,
    image: t.foto?.url,
    photo: t.foto?.url,
    phone: t.telefone,
    whatsapp: t.whatsapp,
  };
};
