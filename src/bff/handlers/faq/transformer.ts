import type { StrapiFAQEntry, FAQItemDTO } from './types';

export const transformFaqFromJsonLd = (
  strapi: StrapiFAQEntry,
): FAQItemDTO[] => {
  if (!strapi.FAQ?.mainEntity) {
    return [];
  }

  return strapi.FAQ.mainEntity.map((item) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
  }));
};
