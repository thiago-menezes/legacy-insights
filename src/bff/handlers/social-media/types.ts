import type { StrapiCollectionResponse } from 'types/strapi/common';

export type SocialMediaQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiSocialMedia = {
  id: number;
  documentId: string;
  nome: string;
  url: string;
  icone: string;
  instituicao?: {
    slug: string;
  } | null;
};

export type SocialMediaDTO = {
  id: string;
  name: string;
  url: string;
  icon: string;
};

export type SocialMediaResponseDTO = StrapiCollectionResponse<SocialMediaDTO>;

export type StrapiSocialMediaResponse =
  StrapiCollectionResponse<StrapiSocialMedia>;
