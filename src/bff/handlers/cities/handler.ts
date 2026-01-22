'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { strapiFetch } from '../../services/strapi';
import { transformCity } from './transformer';
import type {
  StrapiCitiesResponse,
  CitiesQueryParams,
  CityResponseDTO,
} from './types';

const emptyCitiesResponse: CityResponseDTO = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

export const handleCities = async (
  params: CitiesQueryParams,
): Promise<CityResponseDTO> => {
  ensureBffInitialized();

  try {
    const cities = await strapiFetch<StrapiCitiesResponse>('cities', {
      filters: {
        instituicao: {
          slug: { $eq: params.institutionSlug },
        },
      },
      params: {
        status: 'published',
      },
      sort: ['nome:ASC'],
      populate: {
        unidade: {},
        polo: {
          populate: {
            unidade: {},
          },
        },
      },
    });

    if (!cities) return emptyCitiesResponse;

    return {
      data: (cities.data || []).map(transformCity),
      meta: cities.meta,
    };
  } catch {
    return emptyCitiesResponse;
  }
};

export const handleCityByName = async (
  cityName: string,
): Promise<CityResponseDTO> => {
  ensureBffInitialized();

  const cities = await strapiFetch<StrapiCitiesResponse>('cidades', {
    filters: {
      nome: { $eq: cityName },
    },
    params: {
      status: 'published',
    },
    populate: {
      unidade: {
        fields: ['id', 'nome', 'slug', 'id_da_unidade'],
      },
      polo: {
        fields: ['id', 'nome', 'slug'],
        populate: {
          unidade: {
            fields: ['id', 'nome', 'id_da_unidade'],
          },
        },
      },
    },
  });

  if (!cities) return emptyCitiesResponse;

  return {
    data: (cities.data || []).map(transformCity),
    meta: cities.meta,
  };
};
