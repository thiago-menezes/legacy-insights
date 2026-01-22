import type { HomeCarouselItemDTO } from 'types/api/home-carousels';
import type { StrapiHomeCarouselItem } from './types';

export const transformCarouselItem = (
  strapi: StrapiHomeCarouselItem,
): HomeCarouselItemDTO => {
  return {
    id: strapi.id,
    name: strapi.nome,
    link: strapi.link,
    image: strapi.imagem?.url,
    mobile: strapi.mobile?.url,
  };
};
