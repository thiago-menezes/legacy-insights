import type { StrapiCollectionResponse } from 'types/strapi/common';
import type { StrapiInstitution } from 'types/strapi/institutions';

export type FAQQueryParams = {
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiFAQItem = {
  '@type': string;
  name: string;
  acceptedAnswer: {
    '@type': string;
    text: string;
  };
};

export type StrapiFAQJsonLd = {
  '@type': string;
  '@context': string;
  mainEntity: StrapiFAQItem[];
};

export type StrapiFAQEntry = {
  id: number;
  documentId: string;
  FAQ: StrapiFAQJsonLd | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  instituicao?: StrapiInstitution | null;
};

export type StrapiFAQResponse = StrapiCollectionResponse<StrapiFAQEntry>;

export type FAQItemDTO = {
  question: string;
  answer: string;
};

export type FAQResponseDTO = {
  items: FAQItemDTO[];
};
