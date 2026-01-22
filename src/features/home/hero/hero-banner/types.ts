import type { HomeCarouselItemDTO as CarouselItem } from '../api/types';

export type CarouselItemFormatted = {
  id: number | string;
  name: string;
  image: string;
  link: string;
  mobile: string;
};

export type HeroBannerProps = {
  carouselItems?: CarouselItem[];
  currentSlide?: number;
  direction?: 'left' | 'right';
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  isLoading?: boolean;
};

export type HeroBannerAnimatedProps = {
  carouselItems: CarouselItemFormatted[];
  currentSlide?: number;
  direction?: 'left' | 'right';
};
