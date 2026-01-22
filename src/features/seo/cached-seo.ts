'use cache';

import { cacheLife, cacheTag } from 'next/cache';
import { handleFAQ } from '@/bff/handlers/faq';
import { getSeoFromStrapi } from './api';
import type { StrapiSeoResponse } from './types';

export async function getCachedSeoData(
  institutionSlug: string,
): Promise<StrapiSeoResponse['data'][0] | null> {
  cacheLife('hours');
  cacheTag('seo', institutionSlug);

  return getSeoFromStrapi(institutionSlug);
}

export async function getCachedFaqData(institutionSlug: string) {
  cacheLife('hours');
  cacheTag('faq', institutionSlug);

  return handleFAQ({ institutionSlug });
}
