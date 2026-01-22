'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { transformAreaInteresse } from './transformer';
import type {
  AreasInteresseQueryParams,
  StrapiAreasInteresseResponse,
  AreasInteresseResponseDTO,
} from './types';

export const handleAreasInteresse = async (
  params: AreasInteresseQueryParams,
): Promise<AreasInteresseResponseDTO> => {
  ensureBffInitialized();
  const data = await strapiFetch<StrapiAreasInteresseResponse>(
    'areas-de-interesses',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: '*',
      sort: ['relevancia:ASC', 'nome:ASC'],
      params: {
        status: 'published',
      },
    },
    params.noCache,
  );

  if (!data) {
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
    };
  }

  return {
    data: (data.data || []).map(transformAreaInteresse),
    meta: data.meta,
  };
};
