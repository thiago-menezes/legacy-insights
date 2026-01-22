import type { Metadata } from 'next';
import { getCachedFaqData, getCachedSeoData } from './cached-seo';
import type { StrapiSeo } from './types';

const extractMetadata = (seoData: StrapiSeo): Metadata | undefined => {
  const nested = (seoData as unknown as { metadata?: { metadata?: Metadata } })
    ?.metadata?.metadata;
  return nested ?? (seoData.metadata as unknown as Metadata) ?? undefined;
};

const extractJsonLd = (seoData: StrapiSeo): StrapiSeo['jsonld'] | undefined => {
  return seoData.jsonld ?? undefined;
};

export const generateFaqJsonLd = (
  items: { question: string; answer: string }[] | undefined,
): object | undefined => {
  if (!items?.length) return undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

export const generateMetadata = async (): Promise<Metadata> => {
  const institution = process.env.NEXT_PUBLIC_INSTITUTION || '';

  const icons = {
    icon: `/favicons/${institution}.ico`,
  };

  const defaultMetadata: Metadata = {
    title: 'Grupo SER - Portal Institucional',
    description: 'Portal multi-institucional do Grupo SER Educacional',
    icons,
    robots: {
      index: false,
      follow: false,
    },
  };

  if (!institution) {
    return defaultMetadata;
  }

  try {
    const seoData = await getCachedSeoData(institution);
    const strapiMetadata = seoData ? extractMetadata(seoData) : undefined;
    const organizationJsonLd = seoData ? extractJsonLd(seoData) : undefined;

    const faqResponse = await getCachedFaqData(institution);
    const faqJsonLd = generateFaqJsonLd(faqResponse.items);

    // Combine all JSON-LD objects into array
    const jsonLdItems = [organizationJsonLd, faqJsonLd].filter(Boolean);

    return {
      ...(strapiMetadata || defaultMetadata),
      icons,
      robots: {
        index: false,
        follow: false,
      },
      other: jsonLdItems.length
        ? { 'script:ld+json': jsonLdItems.map((item) => JSON.stringify(item)) }
        : undefined,
    };
  } catch (error) {
    console.error('SEO: Error fetching metadata:', error);
    return defaultMetadata;
  }
};
