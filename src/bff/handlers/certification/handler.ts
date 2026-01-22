'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { transformCertification } from './transformer';
import type {
  CertificationQueryParams,
  StrapiCertificationResponse,
  CertificationResponseDTO,
} from './types';

export const handleCertification = async (
  params: CertificationQueryParams,
): Promise<CertificationResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    return null;
  }

  const filters: Record<string, unknown> = {
    instituicao: {
      slug: { $eq: params.institutionSlug },
    },
  };

  // Apply optional unit filter
  if (params.unitSlug) {
    filters.unidades = {
      slug: { $eq: params.unitSlug },
    };
  }

  // Apply optional course filter
  if (params.courseId) {
    filters.curso_detalhes = {
      ids_dos_cursos: { $eq: params.courseId },
    };
  }

  const response = await strapiFetch<StrapiCertificationResponse>(
    'certifications',
    {
      filters,
      populate: ['instituicao', 'unidades', 'curso_detalhes'],
      params: {
        status: 'published',
      },
    },
  );

  if (!response?.data?.length) {
    return null;
  }

  return transformCertification(response.data[0]);
};
