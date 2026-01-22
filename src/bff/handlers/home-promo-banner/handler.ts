'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformBanner } from './transformer';
import type {
  HomePromoBannerQueryParams,
  StrapiHomePromoBannerResponse,
  HomePromoBannerResponseDTO,
} from './types';

export const handleHomePromoBanner = async (
  params: HomePromoBannerQueryParams,
): Promise<HomePromoBannerResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiHomePromoBannerResponse>(
    'home-promo-banners',
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
      sort: ['id:ASC'],
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
    data: (data.data || []).map(transformBanner),
    meta: data.meta,
  };
};
