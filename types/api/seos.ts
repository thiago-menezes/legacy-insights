import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiSeo } from '@/features/seo/types';

export type SeoDTO = Partial<StrapiSeo>;

export type SeosResponseDTO = Partial<StrapiCollectionResponse<SeoDTO>>;
