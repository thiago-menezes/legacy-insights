import type { IconNames } from '@/components/icon/types';

export type ModalityDTO = Partial<{
  id: string;
  title: string;
  description: string;
  icon: IconNames;
  ctaLabel: string;
  ctaHref: string;
}>;
