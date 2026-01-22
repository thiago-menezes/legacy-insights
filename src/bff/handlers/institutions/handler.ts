'use server';

import type { InstitutionDTO } from 'types/api/institutions';
import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';
import { ensureBffInitialized } from '../../services/bff';
import { strapiFetch } from '../../services/strapi';
import { BffNotFoundError, BffValidationError } from '../../utils/errors';
import { transformInstitution } from './transformer';

export type InstitutionQueryParams = {
  slug: string;
  noCache?: boolean;
};

export const handleInstitutionBySlug = async (
  params: InstitutionQueryParams,
): Promise<InstitutionDTO> => {
  ensureBffInitialized();

  if (!params.slug) {
    throw new BffValidationError('institution slug is required');
  }

  const response = await strapiFetch<
    StrapiCollectionResponse<StrapiInstitution>
  >(
    'institutions',
    {
      filters: {
        slug: { $eq: params.slug },
      },
      params: {
        status: 'published',
      },
      populate: '*',
    },
    params.noCache,
  );

  if (!response?.data || response.data.length === 0) {
    throw new BffNotFoundError(`Institution not found: ${params.slug}`);
  }

  return transformInstitution(response.data[0]);
};
