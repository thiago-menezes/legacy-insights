import type { StrapiCurriculum, CurriculumDTO } from './types';

export const transformCurriculum = (
  strapi: StrapiCurriculum | undefined,
): CurriculumDTO | null => {
  if (!strapi) {
    return null;
  }

  return {
    content: strapi.conteudo,
  };
};
