'use server';

import type { StrapiCollectionResponse } from 'types/strapi/common';

// Strapi response types (Portuguese keys)
export type StrapiCityUnidade = {
  id: number;
  documentId: string;
  nome?: string;
  slug?: string;
  id_da_unidade?: number | null;
};

export type StrapiCityPoloUnidade = {
  id: number;
  documentId: string;
  nome?: string;
  id_da_unidade?: number | null;
};

export type StrapiCityPolo = {
  id: number;
  documentId: string;
  nome?: string;
  slug?: string;
  unidade?: StrapiCityPoloUnidade;
};

export type StrapiCity = {
  id: number;
  documentId: string;
  nome: string;
  estado: string;
  unidade?: StrapiCityUnidade[];
  polo?: StrapiCityPolo[];
};

export type StrapiCitiesResponse = StrapiCollectionResponse<StrapiCity>;

export type CityUnitDTO = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  unitId: number | null;
};

export type CityPoloUnitDTO = {
  id: number;
  documentId: string;
  name: string;
  unitId: number | null;
};

export type CityPoloDTO = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  unit?: CityPoloUnitDTO;
};

export type CityDTO = {
  id: number;
  documentId: string;
  name: string;
  state: string;
  units: CityUnitDTO[];
  polos: CityPoloDTO[];
};

export type CityResponseDTO = StrapiCollectionResponse<CityDTO>;

export type CitiesQueryParams = {
  institutionSlug: string;
};
