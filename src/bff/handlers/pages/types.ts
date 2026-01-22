import type { StrapiCollectionResponse } from 'types/strapi/common';

export type PageQueryParams = {
  institutionSlug: string;
  pageSlug: string;
  noCache?: boolean;
};

export type StrapiInstitution = {
  id: number;
  documentId: string;
  nome: string;
  slug: string;
};

export type StrapiPage = {
  id: number;
  documentId: string;
  slug: string;
  titulo: string;
  conteudo: string;
  instituicoes?: StrapiInstitution[];
};

export type PageDTO = {
  id: string;
  slug: string;
  title: string;
  content: string;
};

export type PageResponseDTO = {
  data: PageDTO | null;
};

export type StrapiPagesResponse = StrapiCollectionResponse<StrapiPage>;
