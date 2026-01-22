import type {
  StrapiBlock,
  StrapiCollectionResponse,
} from 'types/strapi/common';
import { IconNames } from '@/components';

export type LinksQueryParams = {
  local: 'cabeçalho' | 'rodapé' | 'acima do cabeçalho';
  institutionSlug: string;
  noCache?: boolean;
};

export type StrapiMenuCategory = {
  documentId: string;
  nome: string;
};

export type StrapiLink = {
  id: number;
  documentId: string;
  texto: string;
  link: string;
  local: string;
  relevancia: number;
  tablericons: string;
  instituicao?: {
    slug: string;
  } | null;
  categorias?: StrapiMenuCategory[];
  sublinks?: StrapiBlock[];
};

export type LinkDTO = {
  id: string;
  text: string;
  href: string;
  location: string;
  relevance: number;
  icon: IconNames;
  category?: string;
  sublinks?: SubLinkDTO[];
};

export type SubLinkDTO = {
  text: string;
  href: string;
};

export type LinksResponseDTO = StrapiCollectionResponse<LinkDTO>;

export type StrapiLinksResponse = StrapiCollectionResponse<StrapiLink>;
