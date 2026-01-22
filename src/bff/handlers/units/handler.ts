'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffValidationError } from '../../utils/errors';
import { transformUnit } from './transformers';
import type {
  StrapiUnitsResponse,
  StrapiUnitsQueryParams,
  UnitByIdQueryParams,
  UnitResponseDTO,
} from './types';

const emptyUnitsResponse: UnitResponseDTO = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

export const handleUnits = async (
  params: StrapiUnitsQueryParams,
): Promise<UnitResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }

  const units = await strapiFetch<StrapiUnitsResponse>('units', {
    filters: {
      instituicao: {
        slug: { $eq: params.institutionSlug },
      },
    },
    params: {
      status: 'published',
    },
    populate: ['instituicao', 'fotos', 'cidades', 'polos', 'qrcode'],
  });

  if (!units) return emptyUnitsResponse;

  return {
    data: (units.data || []).map(transformUnit),
    meta: units.meta,
  };
};

export const handleUnitById = async (
  params: UnitByIdQueryParams,
): Promise<UnitResponseDTO> => {
  ensureBffInitialized();

  if (!params.institutionSlug) {
    throw new BffValidationError('institutionSlug is required');
  }
  if (!params.unitId) {
    throw new BffValidationError('unitId is required');
  }

  const units = await strapiFetch<StrapiUnitsResponse>('units', {
    filters: {
      id_da_unidade: { $eq: params.unitId },
      instituicao: {
        slug: { $eq: params.institutionSlug },
      },
    },
    params: {
      status: 'published',
    },
    populate: ['instituicao', 'fotos', 'cidades', 'polos', 'qrcode'],
  });

  if (!units) return emptyUnitsResponse;

  return {
    data: (units.data || []).map(transformUnit),
    meta: units.meta,
  };
};
