import type { SearchBannerPromoItemDTO } from 'types/api/search-banner-promos';
import type {
  StrapiCollectionResponse,
  StrapiMedia,
} from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type SearchBannerPromoQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiSearchBannerPromoItem = {
  id: number;
  documentId: string;
  link?: string;
  imagem?: StrapiMedia;
  instituicao?: StrapiInstitution;
};

export type SearchBannerPromoResponseDTO =
  StrapiCollectionResponse<SearchBannerPromoItemDTO>;

export type StrapiSearchBannerPromoResponse =
  StrapiCollectionResponse<StrapiSearchBannerPromoItem>;
