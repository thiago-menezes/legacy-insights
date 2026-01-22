export type HeroCarouselProps = {
  carouselItems: Array<{
    id: number | string;
    name: string;
    image: string;
    link: string;
    mobile: string;
  }>;
  showCarouselControls?: boolean;
};
