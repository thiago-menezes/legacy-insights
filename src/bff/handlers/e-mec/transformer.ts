import type { EMecDTO } from 'types/api/e-mecs';
import type { StrapiEMecItem } from './types';

export const transformEMec = (strapi: StrapiEMecItem): EMecDTO => {
  return {
    id: strapi.id,
    link: strapi.link,
    qrCode: strapi.qrcode?.url,
  };
};
