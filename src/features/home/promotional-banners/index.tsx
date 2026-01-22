'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks';
import { usePromotionalBanners } from './api';
import type { PromotionalBannerItemDTO } from './api/types';
import styles from './styles.module.scss';

export type PromotionalBannersProps = {
  institutionSlug: string;
};

export const PromotionalBanners = ({
  institutionSlug,
}: PromotionalBannersProps) => {
  const { data: bannersResponse, isLoading } =
    usePromotionalBanners(institutionSlug);

  const viewPortSize = window.innerWidth;

  const banners = (bannersResponse?.data ?? []).filter(
    (banner): banner is PromotionalBannerItemDTO & { image: string } =>
      Boolean(banner.image),
  );
  const [cardWidth, setCardWidth] = useState(294);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(window.innerWidth >= 440 ? 394 : 294);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const { currentPage, totalPages, goToPage } = usePagination({
    totalItems: banners.length,
    containerRef: scrollerRef,
    cardWidth: cardWidth,
    gap: 24,
  });

  if (isLoading || !banners.length) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="Banners promocionais">
      <div className={styles.container}>
        <div className={styles.scroller} role="list" ref={scrollerRef}>
          {banners.map((banner) => {
            const imageElement = (
              <Image
                src={banner.image}
                alt={'Banner promocional'}
                className={styles.bannerImage}
                priority
                quality={100}
                width={2000}
                height={800}
              />
            );

            return (
              <article
                key={banner.id}
                className={styles.bannerCard}
                role="listitem"
              >
                {banner.link ? (
                  <Link
                    href={banner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bannerLink}
                  >
                    {imageElement}
                  </Link>
                ) : (
                  imageElement
                )}
              </article>
            );
          })}
        </div>

        {viewPortSize > 1280 &&
          bannersResponse?.data &&
          bannersResponse?.data?.length > 3 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChangeAction={goToPage}
              className={styles.pagination}
            />
          )}
      </div>
    </section>
  );
};
