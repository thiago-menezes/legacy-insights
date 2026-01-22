'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformPage } from './transformer';
import type {
  PageQueryParams,
  StrapiPagesResponse,
  PageResponseDTO,
} from './types';

export const handlePage = async (
  params: PageQueryParams,
): Promise<PageResponseDTO> => {
  ensureBffInitialized();

  if (!params.pageSlug) {
    throw new BffValidationError('pageSlug is required');
  }

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiPagesResponse>(
    'pages',
    {
      filters: {
        slug: { $eq: params.pageSlug },
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: {
        instituicao: {
          fields: ['slug'],
        },
      },
      params: {
        status: 'published',
      },
    },
    params.noCache,
  );

  if (!data?.data || data.data.length === 0) {
    return {
      data: null,
    };
  }

  return {
    data: transformPage(data.data[0]),
  };
};
