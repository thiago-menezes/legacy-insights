import type { UnitDTO } from 'types/api/units';
import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiUnit } from 'types/strapi/units';

export type StrapiUnitsQueryParams = {
  institutionSlug: string;
};

export type ClientUnitsQueryParams = {
  institution: string;
  state: string;
  city: string;
  courseId?: string;
};

export type ClientUnitsResponse = {
  data: Array<{
    id: number;
    name: string;
    state: string;
    city: string;
  }>;
  meta: {
    total: number;
    institution: string;
    state: string;
    city: string;
    courseId?: string;
  };
};

export type UnitByIdQueryParams = {
  institutionSlug: string;
  unitId: number;
};

export type UnitResponseDTO = StrapiCollectionResponse<UnitDTO>;

export type StrapiUnitsResponse = StrapiCollectionResponse<StrapiUnit>;
