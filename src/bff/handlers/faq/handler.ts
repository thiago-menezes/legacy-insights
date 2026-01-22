'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformFaqFromJsonLd } from './transformer';
import type {
  FAQQueryParams,
  StrapiFAQResponse,
  FAQResponseDTO,
} from './types';

export const handleFAQ = async (
  params: FAQQueryParams,
): Promise<FAQResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiFAQResponse>(
    'faqs',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: ['instituicao', 'FAQ'],
      params: {
        status: 'published',
      },
    },
    params.noCache,
  );

  if (!data?.data?.length) {
    return { items: [] };
  }

  // Flatten all FAQ items from all entries
  const items = data.data.flatMap(transformFaqFromJsonLd);

  return { items };
};
