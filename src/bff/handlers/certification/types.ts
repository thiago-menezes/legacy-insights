import type { StrapiCollectionResponse } from 'types/strapi/common';

export type CertificationQueryParams = {
  institutionSlug: string;
  unitSlug?: string;
  courseId?: string;
};

export type StrapiCertification = {
  id: number;
  documentId: string;
  conteudo: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiCertificationResponse =
  StrapiCollectionResponse<StrapiCertification>;

export type CertificationDTO = {
  content: string | null;
};

export type CertificationResponseDTO = CertificationDTO | null;
