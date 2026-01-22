'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformModality } from './transformer';
import type {
  ModalitiesQueryParams,
  StrapiModalitiesResponse,
  ModalitiesResponseDTO,
} from './types';

export const handleModalities = async (
  params: ModalitiesQueryParams,
): Promise<ModalitiesResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiModalitiesResponse>(
    'modalidades',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: 'instituicao',
      sort: ['nome:ASC'],
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
    data: (data.data || []).map(transformModality),
    meta: data.meta,
  };
};
