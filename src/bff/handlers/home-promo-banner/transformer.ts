import type { PromotionalBannerItemDTO } from 'types/api/promotional-banners';
import type { StrapiHomePromoBannerItem } from './types';

export const transformBanner = (
  strapi: StrapiHomePromoBannerItem,
): PromotionalBannerItemDTO => {
  return {
    id: strapi.id,
    link: strapi.link,
    image: strapi.imagem?.url,
  };
};
