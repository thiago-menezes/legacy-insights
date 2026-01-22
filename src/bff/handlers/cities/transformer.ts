import type {
  StrapiCity,
  StrapiCityUnidade,
  StrapiCityPolo,
  StrapiCityPoloUnidade,
  CityDTO,
  CityUnitDTO,
  CityPoloDTO,
  CityPoloUnitDTO,
} from './types';

export const transformCityUnit = (strapi: StrapiCityUnidade): CityUnitDTO => {
  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome || '',
    slug: strapi.slug || '',
    unitId: strapi.id_da_unidade ?? null,
  };
};

export const transformCityPoloUnit = (
  strapi: StrapiCityPoloUnidade | undefined,
): CityPoloUnitDTO | undefined => {
  if (!strapi) return undefined;

  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome || '',
    unitId: strapi.id_da_unidade ?? null,
  };
};

export const transformCityPolo = (strapi: StrapiCityPolo): CityPoloDTO => {
  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome || '',
    slug: strapi.slug || '',
    unit: transformCityPoloUnit(strapi.unidade),
  };
};

export const transformCity = (strapi: StrapiCity): CityDTO => {
  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome,
    state: strapi.estado,
    units: (strapi.unidade || []).map(transformCityUnit),
    polos: (strapi.polo || []).map(transformCityPolo),
  };
};
