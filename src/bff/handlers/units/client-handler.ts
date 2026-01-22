'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { fetchUnits, fetchUnitsByCourse } from './api';
import { transformClientUnits } from './transformers';
import type { ClientUnitsQueryParams, ClientUnitsResponse } from './types';

export const handleClientUnits = async (
  params: ClientUnitsQueryParams,
): Promise<ClientUnitsResponse> => {
  ensureBffInitialized();

  if (!params.institution) {
    throw new Error('Institution is required');
  }
  if (!params.state) {
    throw new Error('State is required');
  }
  if (!params.city) {
    throw new Error('City is required');
  }

  try {
    const apiResponse = params.courseId
      ? await fetchUnitsByCourse(
          params.institution,
          params.state,
          params.city,
          params.courseId,
        )
      : await fetchUnits(params.institution, params.state, params.city);

    if (!apiResponse.data || apiResponse.data.length === 0) {
      return {
        data: [],
        meta: {
          total: 0,
          institution: params.institution,
          state: params.state,
          city: params.city,
          courseId: params.courseId,
        },
      };
    }

    const transformedUnits = transformClientUnits(apiResponse.data);

    return {
      data: transformedUnits,
      meta: {
        total: transformedUnits.length,
        institution: params.institution,
        state: params.state,
        city: params.city,
        courseId: params.courseId,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch units from client API: ${error.message}`,
      );
    }
    throw new Error('Failed to fetch units from client API: Unknown error');
  }
};
