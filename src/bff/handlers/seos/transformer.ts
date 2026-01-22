import type { SeoDTO } from 'types/api/seos';
import type { StrapiSeo } from '@/features/seo/types';

export const transformSeo = (strapi: StrapiSeo): SeoDTO => {
  return strapi;
};
