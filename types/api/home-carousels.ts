import type { StrapiCollectionResponse } from 'types/strapi/common';

export type HomeCarouselItemDTO = Partial<{
  id: number;
  name: string;
  link?: string;
  image?: string;
  mobile?: string;
}>;

export type HomeCarouselResponseDTO = Partial<
  StrapiCollectionResponse<HomeCarouselItemDTO>
>;
