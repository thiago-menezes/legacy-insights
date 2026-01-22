'use server';

import type { SeosResponseDTO } from 'types/api/seos';
import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformSeo } from './transformer';
import type { SeoQueryParams, StrapiSeoResponse } from './types';

export const handleSeo = async (
  params: SeoQueryParams,
): Promise<SeosResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiSeoResponse>(
    'seos',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: 'instituicao',
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
    data: (data.data || []).map(transformSeo),
    meta: data.meta,
  };
};
