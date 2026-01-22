'use server';

import { headers } from 'next/headers';
import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformLink } from './transformer';
import type {
  LinksQueryParams,
  StrapiLinksResponse,
  LinksResponseDTO,
} from './types';

export const handleLinks = async (
  params: LinksQueryParams,
): Promise<LinksResponseDTO> => {
  ensureBffInitialized();

  const headersList = await headers();
  const host = headersList.get('host') || undefined;

  if (!params.local) {
    throw new BffValidationError('local is required');
  }

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiLinksResponse>(
    'links',
    {
      filters: {
        local: { $eq: params.local },
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: '*',
      sort: ['relevancia:ASC'],
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
    data: (data.data || []).map((link) => transformLink(link, host)),
    meta: data.meta,
  };
};
