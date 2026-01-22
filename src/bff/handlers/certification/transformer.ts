import type { StrapiCertification, CertificationDTO } from './types';

export const transformCertification = (
  strapi: StrapiCertification | undefined,
): CertificationDTO | null => {
  if (!strapi) {
    return null;
  }

  return {
    content: strapi.conteudo,
  };
};
