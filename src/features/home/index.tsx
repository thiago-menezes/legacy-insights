import { preload } from 'react-dom';
import { AreasSelector } from '@/features/home/areas-selector';
import { CareerPath } from '@/features/home/career-path';
import { EntryMethodsSection } from '@/features/home/entry-methods';
import { HomeFAQSection } from '@/features/home/faq-section';
import { FeaturedCoursesSection } from '@/features/home/featured-courses';
import { HeroSection } from '@/features/home/hero';
import { getCachedCarouselData } from '@/features/home/hero/cached-carousel';
import { ModalitiesSection } from '@/features/home/modalities-section';
import { PromotionalBanners } from '@/features/home/promotional-banners';
import { InfrastructureSection } from '@/features/infrastructure';

async function HeroWithData() {
  const institutionSlug = process.env.NEXT_PUBLIC_INSTITUTION || '';

  const carouselData = await getCachedCarouselData(institutionSlug);

  const firstImage = carouselData.data?.[0];
  if (firstImage?.image) {
    preload(firstImage.image, { as: 'image', fetchPriority: 'high' });
  }
  if (firstImage?.mobile) {
    preload(firstImage.mobile, { as: 'image', fetchPriority: 'high' });
  }

  return <HeroSection carouselData={carouselData} />;
}

export const HomePageContent = async () => {
  const institutionSlug = process.env.NEXT_PUBLIC_INSTITUTION || '';

  return (
    <main>
      <HeroWithData />

      <FeaturedCoursesSection
        title="Encontre o seu curso e transforme sua carreira!"
        variant="grid"
      />
      <PromotionalBanners institutionSlug={institutionSlug} />
      <ModalitiesSection />
      <AreasSelector />
      <CareerPath />
      <EntryMethodsSection />
      <InfrastructureSection />
      <HomeFAQSection />
    </main>
  );
};
