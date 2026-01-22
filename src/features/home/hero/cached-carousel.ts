'use cache';

import { cacheLife, cacheTag } from 'next/cache';
import { handleHomeCarousel } from '@/bff/handlers/home-carousel';

/**
 * Cached server function for fetching carousel data.
 *
 * Uses Next.js 16 caching features:
 * - `use cache` directive: Marks this function for server-side caching
 * - `cacheLife('carousel')`: Uses custom cache profile (stale: 60s, revalidate: 5min, expire: 1hr)
 * - `cacheTag`: Allows targeted cache invalidation via revalidateTag
 */
export async function getCachedCarouselData(institutionSlug: string) {
  cacheLife('carousel');
  cacheTag('home-carousel', institutionSlug);

  return handleHomeCarousel({ institutionSlug });
}
