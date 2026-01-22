import type { ModalityDTO } from 'types/api/modalities';
import type { IconNames } from '@/components/icon/types';
import type { StrapiModality } from './types';

export const transformModality = (strapi: StrapiModality): ModalityDTO => {
  return {
    id: strapi.slug,
    title: strapi.nome,
    description: strapi.descricao || '',
    icon: (strapi.icone || 'laptop') as IconNames,
    ctaLabel: strapi.cta_label || 'Veja cursos',
    ctaHref: strapi.cta_link || `/cursos?modalities=${strapi.slug}`,
  };
};
