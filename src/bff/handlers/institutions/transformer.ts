import { InstitutionDTO } from 'types/api/institutions';
import { UnitDTO } from 'types/api/units';
import { StrapiInstitution } from 'types/strapi/institutions';
import { StrapiUnit } from 'types/strapi/units';

export const transformInstitution = (
  strapi: StrapiInstitution,
): InstitutionDTO => {
  let defaultCity = strapi.cidade_para_busca_padrao || undefined;
  let defaultStateLine: string | undefined = undefined;

  if (defaultCity && defaultCity.includes(' - ')) {
    const parts = defaultCity.split(' - ');
    if (parts.length === 2) {
      defaultCity = parts[0].trim();
      defaultStateLine = parts[1].trim();
    }
  }

  return {
    id: strapi.id,
    documentId: strapi.documentId,
    name: strapi.nome || '',
    slug: strapi.slug,
    code: strapi.codigo,
    defaultCity,
    defaultState: defaultStateLine,
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
    city: strapi.cidades
      ? {
          id: strapi.cidades.id,
          documentId: strapi.cidades.documentId,
          name: strapi.cidades.nome || '',
          state: strapi.cidades.estado || '',
        }
      : undefined,
  };
};
