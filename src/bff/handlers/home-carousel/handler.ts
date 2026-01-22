'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformCarouselItem } from './transformer';
import type {
  HomeCarouselQueryParams,
  StrapiHomeCarouselResponse,
  HomeCarouselResponseDTO,
} from './types';

export const handleHomeCarousel = async (
  params: HomeCarouselQueryParams,
): Promise<HomeCarouselResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiHomeCarouselResponse>(
    'home-carousels',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: '*',
      params: {
        status: 'published',
      },
      sort: ['nome:ASC'],
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
    data: (data.data || []).map(transformCarouselItem),
    meta: data.meta,
  };
};
