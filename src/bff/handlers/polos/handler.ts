'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformPolo } from './transformer';
import type {
  StrapiPolosResponse,
  PolosQueryParams,
  PolosResponseDTO,
  PoloDTO,
} from './types';

const emptyPolosResponse: PolosResponseDTO = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

export const handlePolos = async (
  params: PolosQueryParams,
): Promise<PolosResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const filters: Record<string, unknown> = {
    instituicao: {
      slug: { $eq: params.institutionSlug },
    },
  };

  if (params.cityId) {
    filters.cidade = {
      id: { $eq: params.cityId },
    };
  }

  const polos = await strapiFetch<StrapiPolosResponse>('polos', {
    filters,
    params: {
      status: 'published',
    },
    populate: ['cidade', 'instituicao', 'unidade'],
  });

  if (!polos) return emptyPolosResponse;

  const transformedPolos = await Promise.all(
    (polos.data || []).map(transformPolo),
  );

  return {
    data: transformedPolos,
    meta: polos.meta,
  };
};

export const handlePoloById = async (
  institutionSlug: string,
  poloId: number,
): Promise<PoloDTO | null> => {
  ensureBffInitialized();

  if (!institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const polos = await strapiFetch<StrapiPolosResponse>('polos', {
    filters: {
      id: { $eq: poloId },
      instituicao: {
        slug: { $eq: institutionSlug },
      },
    },
    params: {
      status: 'published',
    },
    populate: ['cidade', 'instituicao', 'unidade'],
  });

  if (!polos?.data?.length) return null;

  return transformPolo(polos.data[0]);
};
