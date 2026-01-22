import type { AreaOfInterestItemDTO } from 'types/api/areas-of-interest';
import type {
  StrapiBlock,
  StrapiCollectionResponse,
  StrapiMedia,
} from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type AreasInteresseQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiAreaInteresse = {
  id: number;
  documentId: string;
  nome: string;
  subareas: StrapiBlock[];
  capa?: StrapiMedia | null;
  instituicao?: StrapiInstitution | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type AreasInteresseResponseDTO =
  StrapiCollectionResponse<AreaOfInterestItemDTO>;

export type StrapiAreasInteresseResponse =
  StrapiCollectionResponse<StrapiAreaInteresse>;
