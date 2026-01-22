'use client';

import { Button } from 'reshaped';
import { Icon } from '@/components';
import { CarouselControls } from '../carousel-controls';
import { HeroBannerAnimated } from '../hero-banner';
import { useHeroCarousel } from '../hooks';
import styles from '../styles.module.scss';
import type { HeroCarouselProps } from './types';

export const HeroCarousel = ({
  carouselItems,
  showCarouselControls = true,
}: HeroCarouselProps) => {
  const totalSlides = carouselItems.length > 0 ? carouselItems.length : 1;

  const {
    currentSlide,
    direction,
    nextSlide,
    previousSlide,
    goToSlide,
    setIsAutoAdvancing,
    pauseAutoAdvance,
  } = useHeroCarousel(totalSlides);

  return (
    <>
      <HeroBannerAnimated
        carouselItems={carouselItems}
        currentSlide={currentSlide}
        direction={direction}
      />

      {showCarouselControls && totalSlides > 1 && (
        <>
          <div className={styles.carouselControlsWrapper}>
            <Button
              className={styles.carouselLeftButton}
              onClick={() => {
                previousSlide();
                pauseAutoAdvance();
              }}
              aria-label="Previous slide"
              icon={<Icon name="chevron-left" size={24} />}
            />
            <Button
              className={styles.carouselRightButton}
              onClick={() => {
                nextSlide();
                pauseAutoAdvance();
              }}
              aria-label="Next slide"
              icon={<Icon name="chevron-right" size={24} />}
            />
          </div>

          <div className={styles.carouselIndicators}>
            <CarouselControls
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrevious={() => {
                previousSlide();
                pauseAutoAdvance();
              }}
              onNext={() => {
                nextSlide();
                pauseAutoAdvance();
              }}
              onGoToSlide={(index) => {
                goToSlide(index);
                pauseAutoAdvance();
              }}
              onToggleAutoAdvance={setIsAutoAdvancing}
              showArrows={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export type { HeroCarouselProps };
