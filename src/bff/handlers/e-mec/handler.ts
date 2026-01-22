'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformEMec } from './transformer';
import type {
  EMecQueryParams,
  StrapiEMecResponse,
  EMecResponseDTO,
} from './types';

export const handleEMec = async (
  params: EMecQueryParams,
): Promise<EMecResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const data = await strapiFetch<StrapiEMecResponse>(
    'e-mecs',
    {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      populate: 'qrcode',
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
    data: (data.data || []).map(transformEMec),
    meta: data.meta,
  };
};
