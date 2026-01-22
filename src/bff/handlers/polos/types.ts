'use server';

import type { StrapiCollectionResponse } from 'types/strapi/common';

export type PolosQueryParams = {
  institutionSlug: string;
  cityId?: number;
};

export type StrapiPoloCity = {
  id: number;
  documentId: string;
  nome: string;
  estado: string;
};

export type StrapiPoloInstitution = {
  id: number;
  documentId: string;
  slug: string;
  nome: string;
};

export type StrapiPoloUnit = {
  id: number;
  documentId: string;
  nome: string;
  slug?: string;
};

export type StrapiPolo = {
  id: number;
  documentId: string;
  nome: string;
  endereco: string | null;
  cidade?: StrapiPoloCity;
  instituicoes?: StrapiPoloInstitution[];
  unidade?: StrapiPoloUnit;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiPolosResponse = StrapiCollectionResponse<StrapiPolo>;

export type PoloCityDTO = {
  id: number;
  documentId: string;
  name: string;
  state: string;
};

export type PoloUnitDTO = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

export type PoloDTO = {
  id: number;
  documentId: string;
  name: string;
  address: string;
  city?: PoloCityDTO;
  unit?: PoloUnitDTO;
};

export type PolosResponseDTO = StrapiCollectionResponse<PoloDTO>;
