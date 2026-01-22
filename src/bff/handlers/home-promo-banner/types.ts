import type { PromotionalBannerItemDTO } from 'types/api/promotional-banners';
import type {
  StrapiCollectionResponse,
  StrapiMedia,
} from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type HomePromoBannerQueryParams = {
  institutionSlug?: string;
  noCache?: boolean;
};

export type StrapiHomePromoBannerItem = {
  id: number;
  documentId: string;
  link?: string;
  imagem?: StrapiMedia;
  instituicao?: StrapiInstitution;
};

export type HomePromoBannerResponseDTO =
  StrapiCollectionResponse<PromotionalBannerItemDTO>;

export type StrapiHomePromoBannerResponse =
  StrapiCollectionResponse<StrapiHomePromoBannerItem>;
