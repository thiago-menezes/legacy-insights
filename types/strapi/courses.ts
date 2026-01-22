import {
  StrapiBlock,
  StrapiMedia,
  StrapiModality,
  StrapiSharedSEO,
} from './common';
import { StrapiInstitution } from './institutions';
import type { StrapiUnit } from './units';

// JSON-LD FAQ structure from Strapi
export type StrapiFAQItem = Partial<{
  '@type': string;
  name: string;
  acceptedAnswer: {
    '@type': string;
    text: string;
  };
}>;

export type StrapiFAQ = Partial<{
  '@type': string;
  '@context': string;
  mainEntity: StrapiFAQItem[];
}>;

export type StrapiTeacher = Partial<{
  id: number;
  nome: string;
  cargo: string;
  biografia: string;
  descricao: string;
  telefone: string;
  whatsapp: string;
  materia: string;
  foto: StrapiMedia | null;
  modalidades: StrapiModality[];
  curso_detalhes: StrapiCourse[];
  unidades: StrapiUnit[];
}>;

export type StrapiCourse = Partial<{
  id: number;
  documentId: string;
  slug: string;
  nome: string;
  ids_dos_cursos: string;
  sobre: StrapiBlock[];
  metodologia: StrapiBlock[];
  grade_curricular: StrapiBlock[];
  certificado: StrapiBlock[];
  capa: StrapiMedia | null;
  instituicao: StrapiInstitution | null;
  projeto_pedagogico: StrapiBlock[];
  destaque: boolean;
  coordenadores: StrapiTeacher[];
  corpo_de_docentes: StrapiTeacher[];
  seo: StrapiSharedSEO;
  FAQ: StrapiFAQ;
  modalidades: StrapiModality[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}>;
