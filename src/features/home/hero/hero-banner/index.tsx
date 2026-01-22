import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { HeroBannerSkeleton } from '../hero-banner-skeleton';
import styles from './styles.module.scss';
import type { HeroBannerProps } from './types';

export const HeroBanner = ({
  carouselItems,
  currentSlide = 0,
}: HeroBannerProps) => {
  const useCarousel = carouselItems && carouselItems.length > 0;

  if (useCarousel) {
    return (
      <div className={styles.container}>
        <div className={styles.slidesWrapper}>
          {carouselItems.map((item, index) => {
            const isActive = index === currentSlide % carouselItems.length;
            const hasMobile = !!item.mobile;

            const imageElement = (
              <>
                <Image
                  src={item.image || ''}
                  alt={item.name || `Hero banner ${index + 1}`}
                  fill
                  className={clsx(
                    styles.image,
                    styles.desktopImage,
                    hasMobile && styles.hasMobile,
                  )}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1440px"
                />
                {hasMobile && (
                  <Image
                    src={item.mobile || ''}
                    alt={item.name || `Hero banner mobile ${index + 1}`}
                    fill
                    className={clsx(styles.image, styles.mobileImage)}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw"
                  />
                )}
              </>
            );

            return (
              <div
                key={index}
                className={clsx(styles.slide, isActive && styles.slideActive)}
              >
                {item.link ? (
                  <Link
                    href={item.link}
                    target="_blank"
                    className={styles.imageLink}
                    rel="noopener noreferrer"
                  >
                    {imageElement}
                  </Link>
                ) : (
                  imageElement
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <HeroBannerSkeleton />;
};

export { HeroBannerAnimated } from './hero-banner-animated';
export type { HeroBannerProps, HeroBannerAnimatedProps } from './types';
