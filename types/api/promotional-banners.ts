import type { StrapiCollectionResponse } from 'types/strapi/common';

export type PromotionalBannerItemDTO = Partial<{
  id: number;
  link: string;
  image: string;
}>;

export type PromotionalBannersResponseDTO = Partial<
  StrapiCollectionResponse<PromotionalBannerItemDTO>
>;
