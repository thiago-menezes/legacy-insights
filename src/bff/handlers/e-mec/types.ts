import type { EMecDTO } from 'types/api/e-mecs';
import type {
  StrapiCollectionResponse,
  StrapiMedia,
} from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type EMecQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiEMecItem = {
  id: number;
  documentId: string;
  link?: string;
  qrcode?: StrapiMedia;
  instituicao?: StrapiInstitution;
};

export type EMecResponseDTO = StrapiCollectionResponse<EMecDTO>;

export type StrapiEMecResponse = StrapiCollectionResponse<StrapiEMecItem>;
