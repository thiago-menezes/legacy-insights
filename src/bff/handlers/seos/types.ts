import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiSeo } from '@/features/seo/types';

export type SeoQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiSeoResponse = StrapiCollectionResponse<StrapiSeo>;
