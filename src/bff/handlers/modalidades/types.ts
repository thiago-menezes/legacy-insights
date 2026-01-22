import type { ModalityDTO } from 'types/api/modalities';
import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type ModalitiesQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiModality = {
  id: number;
  documentId: string;
  nome: string;
  slug: string;
  descricao?: string | null;
  icone?: string | null;
  cta_label?: string | null;
  cta_link?: string | null;
  instituicao?: StrapiInstitution | null;
};

export type ModalitiesResponseDTO = StrapiCollectionResponse<ModalityDTO>;

export type StrapiModalitiesResponse = StrapiCollectionResponse<StrapiModality>;
