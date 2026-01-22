import type { AreaOfInterestItemDTO } from 'types/api/areas-of-interest';
import type { StrapiBlock } from 'types/strapi/common';
import { slugify } from '@/utils';
import type { StrapiAreaInteresse } from './types';

const extractCoursesFromRichText = (subareas: StrapiBlock[]): string[] => {
  if (!subareas || !Array.isArray(subareas)) {
    return [];
  }

  return subareas
    .filter((block) => block.type === 'paragraph')
    .flatMap((block) =>
      (block.children || [])
        .filter(
          (child: { type?: string; text?: string }) =>
            child.type === 'text' && child.text?.trim(),
        )
        .map((child: { text?: string }) => child.text!.trim()),
    );
};

export const transformAreaInteresse = (
  strapi: StrapiAreaInteresse,
): AreaOfInterestItemDTO => {
  const courseNames = extractCoursesFromRichText(strapi.subareas || []);

  return {
    id: strapi.id || 0,
    title: strapi.nome || '',
    slug: slugify(strapi.nome || ''),
    imageUrl: strapi.capa?.url || '',
    imageAlt: strapi.capa?.alternativeText || strapi.nome || '',
    courses: courseNames.map((name) => ({
      id: slugify(name || ''),
      name: name || '',
      slug: slugify(name || ''),
    })),
  };
};
