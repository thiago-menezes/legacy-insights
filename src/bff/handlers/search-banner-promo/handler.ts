'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformSearchBanner } from './transformer';
import type {
  SearchBannerPromoQueryParams,
  StrapiSearchBannerPromoResponse,
  SearchBannerPromoResponseDTO,
} from './types';

export const handleSearchBannerPromo = async (
  params: SearchBannerPromoQueryParams,
): Promise<SearchBannerPromoResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiSearchBannerPromoResponse>(
    'search-banner-promos',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: {
        imagem: true,
        instituicao: true,
      },
      params: {
        status: 'published',
      },
      sort: ['createdAt:DESC'],
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
    data: (data.data || []).map(transformSearchBanner),
    meta: data.meta,
  };
};
