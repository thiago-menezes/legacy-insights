import { StrapiUnitPhoto } from '@/features/infrastructure/api/types';
import { StrapiMedia } from './common';
import { StrapiInstitution } from './institutions';

export type StrapiUnitCity = Partial<{
  id: number;
  documentId: string;
  nome: string;
  estado: string;
}>;

export type StrapiUnitPolo = Partial<{
  id: number;
  documentId: string;
  nome: string;
}>;

export type StrapiUnit = Partial<{
  id: number;
  documentId: string;
  id_da_unidade: number;
  nome: string;
  slug: string;
  endereco: string;
  latitude: string;
  longitude: string;
  fotos: StrapiUnitPhoto[];
  instituicao: StrapiInstitution;
  cidades: StrapiUnitCity;
  polos: StrapiUnitPolo[];
  qrcode: StrapiMedia;
  link_do_qrcode: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}>;
