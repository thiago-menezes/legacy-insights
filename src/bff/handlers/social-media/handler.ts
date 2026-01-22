'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformSocialMedia } from './transformer';
import type {
  SocialMediaQueryParams,
  StrapiSocialMediaResponse,
  SocialMediaResponseDTO,
} from './types';

export const handleSocialMedia = async (
  params: SocialMediaQueryParams,
): Promise<SocialMediaResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiSocialMediaResponse>(
    'social-medias',
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
    data: (data.data || []).map(transformSocialMedia),
    meta: data.meta,
  };
};
