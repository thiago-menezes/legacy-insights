import { UnitDTO, UnitCityDTO } from '@/types/api/units';
import { StrapiUnit, StrapiUnitCity } from '@/types/strapi/units';
import { transformInstitution } from '../institutions/transformer';
import type { Unit } from './api';

export type ClientUnit = {
  id: number;
  name: string;
  state: string;
  city: string;
};

export const transformClientUnit = (apiUnit: Unit): ClientUnit => {
  return {
    id: apiUnit.ID,
    name: apiUnit.Nome_Unidade,
    state: apiUnit.Estado,
    city: apiUnit.Cidade,
  };
};

export const transformClientUnits = (apiUnits: Unit[]): ClientUnit[] => {
  return apiUnits.map(transformClientUnit);
};

export const transformUnitCity = (
  strapi: StrapiUnitCity | undefined,
): UnitCityDTO | undefined => {
  if (!strapi) return undefined;

  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome,
    state: strapi.estado,
  };
};

export const transformUnit = (strapi: StrapiUnit): UnitDTO => {
  return {
    id: strapi.id,
    documentId: strapi.documentId,
    unitId: strapi.id_da_unidade,
    name: strapi.nome || '',
    slug: strapi.slug,
    address: strapi.endereco || '',
    latitude: strapi.latitude,
    longitude: strapi.longitude,
    photos: strapi.fotos || [],
    institution: strapi.instituicao
      ? transformInstitution(strapi.instituicao)
      : undefined,
    city: transformUnitCity(strapi.cidades),
    qrcode: strapi.qrcode
      ? {
          url: strapi.qrcode.url,
          alt: strapi.qrcode.alternativeText ?? undefined,
        }
      : undefined,
    qrcodeLink: strapi.link_do_qrcode ?? undefined,
  };
};
