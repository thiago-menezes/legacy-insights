import type { StrapiBlock, StrapiChild } from 'types/strapi/common';
import { IconNames } from '@/components';
import type { LinkDTO, StrapiLink, SubLinkDTO } from './types';

const getInternalPath = (url: string, currentHost?: string): string => {
  const isTheSameHost = url.includes(currentHost || '');

  if (isTheSameHost) {
    return url.split(currentHost || '')[1];
  }

  return url;
};

const extractSublinks = (
  blocks?: StrapiBlock[],
  currentHost?: string,
): SubLinkDTO[] => {
  if (!blocks) return [];
  const links: SubLinkDTO[] = [];

  blocks.forEach((block) => {
    if (block.children) {
      block.children.forEach((child: StrapiChild) => {
        if (child.type === 'link' && child.url) {
          const text =
            child.children?.map((c: StrapiChild) => c.text).join('') ||
            child.text ||
            '';

          const href = getInternalPath(child.url, currentHost);
          links.push({ text, href });
        }
      });
    }
  });

  return links;
};

export const transformLink = (
  strapi: StrapiLink,
  currentHost?: string,
): LinkDTO => {
  const category = strapi.categorias?.[0]?.nome;

  return {
    id: strapi.documentId,
    text: strapi.texto,
    href: strapi.link,
    location: strapi.local,
    relevance: strapi.relevancia,
    icon: strapi.tablericons as IconNames,
    category,
    sublinks: extractSublinks(strapi.sublinks, currentHost),
  };
};
