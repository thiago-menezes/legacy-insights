'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { buildClientApiUrl, clientApiFetch } from '@/bff/services/client-api';
import { CoursesResponse } from '@/types/api/courses';
import { CoursesSearchParams } from '@/types/api/courses-search';
import { transformOffers } from './transformer-offers';
import { CoursesApiResponse } from './types-api';

type OffersQueryParams = {
  marca: string;
  modalidades: string;
  turnos: string;
  duracoes: string;
  precoMin: string;
  precoMax: string;
  page: string;
  limit: string;
  curso: string;
  unidadeIds: string;
};

export const handleOffers = async (
  params: CoursesSearchParams,
): Promise<CoursesResponse> => {
  ensureBffInitialized();

  const queryParams: Partial<OffersQueryParams> = {
    marca: params.institution,
    modalidades: params.modalities,
    turnos: params.shifts,
    duracoes: params.durations,
    precoMin: params.minPrice,
    precoMax: params.maxPrice,
    page: params.page,
    limit: params.perPage,
    curso: params.course,
    unidadeIds:
      params.unitIds && params.unitIds.length > 0
        ? params.unitIds.join(',')
        : undefined,
  };

  const url = buildClientApiUrl('/cursos/ofertas', queryParams);

  const response = await clientApiFetch<CoursesApiResponse>(url);

  return transformOffers(response);
};
