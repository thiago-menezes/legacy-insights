'use server';

import { revalidateTag } from 'next/cache';

/**
 * Server action to manually purge the carousel cache.
 *
 * Use this when carousel content is updated in the CMS
 * to ensure users see the latest images immediately.
 *
 * @param institutionSlug - Optional institution to revalidate specifically
 */
export async function revalidateCarouselCache(institutionSlug?: string) {
  // Revalidate specific institution if provided
  if (institutionSlug) {
    revalidateTag(institutionSlug, 'carousel');
  }

  // Always revalidate the general carousel tag
  revalidateTag('home-carousel', 'carousel');
}
