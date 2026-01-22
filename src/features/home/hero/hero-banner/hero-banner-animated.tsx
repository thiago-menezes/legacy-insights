'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import type { HeroBannerAnimatedProps } from './types';

export const HeroBannerAnimated = ({
  carouselItems,
  currentSlide = 0,
  direction = 'right',
}: HeroBannerAnimatedProps) => {
  const isInitialMount = useRef(true);
  const prevSlideRef = useRef<number | null>(null);
  const [animatingSlides, setAnimatingSlides] = useState<Set<number>>(
    new Set(),
  );

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevSlideRef.current = currentSlide;
      return;
    }

    const prevSlide = prevSlideRef.current;
    if (prevSlide !== null && prevSlide !== currentSlide) {
      setAnimatingSlides(new Set([currentSlide, prevSlide]));
    }

    prevSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    if (animatingSlides.size === 0) return;

    const timer = setTimeout(() => {
      setAnimatingSlides(new Set());
    }, 600);

    return () => clearTimeout(timer);
  }, [animatingSlides]);

  if (!carouselItems || carouselItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.slidesWrapper}>
        {carouselItems.map((item, index) => {
          const isActive = index === currentSlide % carouselItems.length;
          const shouldAnimate = animatingSlides.has(index);
          const slideDirectionClass =
            direction === 'right' ? styles.slideRight : styles.slideLeft;
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
              className={clsx(
                styles.slide,
                isActive && styles.slideActive,
                slideDirectionClass,
                shouldAnimate && styles.slideAnimated,
              )}
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
};
