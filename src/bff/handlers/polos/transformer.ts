'use server';

import type {
  StrapiPolo,
  StrapiPoloCity,
  StrapiPoloUnit,
  PoloDTO,
  PoloCityDTO,
  PoloUnitDTO,
} from './types';

export async function transformPoloCity(
  strapi: StrapiPoloCity | undefined,
): Promise<PoloCityDTO | undefined> {
  if (!strapi) return undefined;

  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome,
    state: strapi.estado,
  };
}

export async function transformPoloUnit(
  strapi: StrapiPoloUnit | undefined,
): Promise<PoloUnitDTO | undefined> {
  if (!strapi) return undefined;

  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome,
    slug: strapi.slug || '',
  };
}

export async function transformPolo(strapi: StrapiPolo): Promise<PoloDTO> {
  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome,
    address: strapi.endereco || '',
    city: await transformPoloCity(strapi.cidade),
    unit: await transformPoloUnit(strapi.unidade),
  };
}
