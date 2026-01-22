import type { StrapiCollectionResponse } from 'types/strapi/common';

export type SearchBannerPromoItemDTO = Partial<{
  id: number;
  link?: string;
  image?: string;
}>;

export type SearchBannerPromosResponseDTO = Partial<
  StrapiCollectionResponse<SearchBannerPromoItemDTO>
>;
