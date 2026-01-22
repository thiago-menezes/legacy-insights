'use client';

import { useRef } from 'react';
import { Pagination } from '@/components';
import { useCurrentInstitution, usePagination } from '@/hooks';
import { useAreasOfInterest } from './api/query';
import { AreaCard } from './area-card';
import styles from './styles.module.scss';

export const AreasSelector = () => {
  const { institutionSlug } = useCurrentInstitution();
  const { data: { data: areas = [] } = {} } =
    useAreasOfInterest(institutionSlug);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { currentPage, totalPages, goToPage, isScrollable } = usePagination({
    totalItems: areas?.length,
    containerRef: scrollRef,
    gap: 24,
    cardWidth: 290,
  });

  return (
    <section
      className={styles.section}
      aria-label="Selecione áreas de estudo"
      id="areas"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Já sabe qual área seguir? Então, encontre o curso ideal para você.
          </h2>
        </header>

        <div className={styles.carousel}>
          <div ref={scrollRef} className={styles.scrollArea} role="list">
            {areas?.map((area) => (
              <AreaCard
                key={area.id}
                area={{
                  ...area,
                  id: area.id || 0,
                  title: area.title || '',
                  imageUrl: area.imageUrl || '',
                  courses: (area.courses || []).map((c) => ({
                    id: c.id || '',
                    name: c.name || '',
                  })),
                }}
              />
            ))}
          </div>

          {isScrollable && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChangeAction={goToPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};
