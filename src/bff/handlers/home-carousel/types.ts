import type { HomeCarouselItemDTO } from 'types/api/home-carousels';
import type {
  StrapiCollectionResponse,
  StrapiMedia,
} from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type HomeCarouselQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiHomeCarouselItem = {
  id: number;
  documentId: string;
  nome: string;
  link?: string;
  imagem?: StrapiMedia;
  mobile?: StrapiMedia;
  instituicao?: StrapiInstitution;
};

export type HomeCarouselResponseDTO =
  StrapiCollectionResponse<HomeCarouselItemDTO>;

export type StrapiHomeCarouselResponse =
  StrapiCollectionResponse<StrapiHomeCarouselItem>;
