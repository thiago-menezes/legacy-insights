export type HeroImageDTO = {
  data: {
    attributes: {
      url: string;
      alternativeText?: string;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  };
};

export type HeroCTADTO = {
  id: string;
  label: string;
  url: string;
  variant: 'primary' | 'secondary';
};

export type HeroPageDTO = {
  id: string;
  attributes: {
    title: string;
    badgeLabel: string;
    backgroundImage: HeroImageDTO;
    backgroundVideoUrl?: string;
    ctaButtons: HeroCTADTO[];
    showCarouselControls: boolean;
    showQuickSearch: boolean;
    slides?: HeroSlideDTO[];
  };
};

export type HeroSlideDTO = {
  id: string;
  title: string;
  badgeLabel: string;
  backgroundImage: HeroImageDTO;
  ctaButtons: HeroCTADTO[];
};

export type {
  HomeCarouselItemDTO,
  HomeCarouselResponseDTO,
} from '@/types/api/home-carousels';
