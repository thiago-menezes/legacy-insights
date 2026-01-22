import type { PageDTO, StrapiPage } from './types';

export const transformPage = (strapi: StrapiPage): PageDTO => {
  return {
    id: strapi.documentId,
    slug: strapi.slug,
    title: strapi.titulo || '',
    content: strapi.conteudo || '',
  };
};
