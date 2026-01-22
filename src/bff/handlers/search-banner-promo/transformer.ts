import type { SearchBannerPromoItemDTO } from 'types/api/search-banner-promos';
import type { StrapiSearchBannerPromoItem } from './types';

export const transformSearchBanner = (
  strapi: StrapiSearchBannerPromoItem,
): SearchBannerPromoItemDTO => {
  return {
    id: strapi.id,
    link: strapi.link,
    image: strapi.imagem?.url,
  };
};
