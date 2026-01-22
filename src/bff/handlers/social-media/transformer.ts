import type { SocialMediaDTO, StrapiSocialMedia } from './types';

export const transformSocialMedia = (
  strapi: StrapiSocialMedia,
): SocialMediaDTO => {
  return {
    id: strapi.documentId,
    name: strapi.nome,
    url: strapi.url,
    icon: strapi.icone,
  };
};
