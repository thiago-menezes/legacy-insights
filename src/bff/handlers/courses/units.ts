'use server';

import { fetchUnitsByCourse } from '@/bff/handlers/units/api';
import { transformClientUnits } from '@/bff/handlers/units/transformers';
import { ensureBffInitialized } from '@/bff/services/bff';
import { BffValidationError } from '@/bff/utils/errors';
import type { CoursesUnitsResponseDTO } from '@/types/api/courses-units';

export type CoursesUnitsParams = {
  institution: string;
  state: string;
  city: string;
  courseId: string;
};

export const handleCoursesUnits = async (
  params: CoursesUnitsParams,
): Promise<CoursesUnitsResponseDTO> => {
  ensureBffInitialized();

  const { institution, state, city, courseId } = params;

  if (!institution || !state || !city || !courseId) {
    throw new BffValidationError(
      'institution, state, city, and courseId are required',
    );
  }

  const apiResponse = await fetchUnitsByCourse(
    institution,
    state,
    city,
    courseId,
  );

  if (!apiResponse.data || apiResponse.data.length === 0) {
    return {
      data: [],
      meta: { total: 0, institution, state, city, courseId },
    };
  }

  const transformedUnits = transformClientUnits(apiResponse.data);

  return {
    data: transformedUnits,
    meta: {
      total: transformedUnits.length,
      institution,
      state,
      city,
      courseId,
    },
  };
};
