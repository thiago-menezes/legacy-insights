import { handleHomeCarousel } from '@/bff/handlers/home-carousel/handler';

export const getHomeCarousel = async (institutionSlug: string) =>
  handleHomeCarousel({
    institutionSlug,
  });
