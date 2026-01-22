import type { StrapiCollectionResponse } from 'types/strapi/common';

export type CurriculumQueryParams = {
  institutionSlug: string;
  unitSlug?: string;
  courseId?: string;
};

export type StrapiCurriculum = {
  id: number;
  documentId: string;
  conteudo: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiCurriculumResponse =
  StrapiCollectionResponse<StrapiCurriculum>;

export type CurriculumDTO = {
  content: string | null;
};

export type CurriculumResponseDTO = CurriculumDTO | null;
