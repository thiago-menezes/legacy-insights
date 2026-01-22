import Image from 'next/image';
import Link from 'next/link';
import { Pagination, View } from 'reshaped';
import { CourseCard, EmptyState } from '@/components';
import { CourseCardSkeleton } from '@/components/course-card/skeleton';
import { useCourseGrid } from './hooks';
import styles from './styles.module.scss';

export const CourseGrid = () => {
  const {
    isLoading,
    isError,
    courses,
    cardsBeforeBanner,
    cardsAfterBanner,
    currentPage,
    totalPages,
    handlePageChange,
    handleCourseClick,
    bannerItem,
    isBannerLoading,
  } = useCourseGrid();

  if (!isLoading && !isError && (!courses || courses?.length === 0)) {
    return (
      <EmptyState
        icon="search"
        title="Nenhum curso encontrado"
        description="Busque por outra cidade ou mude os filtros para visualizar os cursos disponíveis."
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <View gap={4} className={styles.grid}>
          {[...Array(6)].map((_, idx) => (
            <CourseCardSkeleton key={idx} />
          ))}
        </View>
      ) : (
        !isError &&
        !isLoading && (
          <>
            <View gap={4} className={styles.grid}>
              {cardsBeforeBanner.map((course) => (
                <CourseCard
                  course={course}
                  onClick={handleCourseClick}
                  key={course.id}
                />
              ))}
            </View>

            {bannerItem?.image && !isBannerLoading && (
              <View className={styles.bannerContainer}>
                <Link
                  href={bannerItem?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={bannerItem.image}
                    alt={'Banner promocional'}
                    fill
                  />
                </Link>
              </View>
            )}

            <View gap={4} className={styles.grid}>
              {cardsAfterBanner.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={handleCourseClick}
                />
              ))}
            </View>
          </>
        )
      )}

      {totalPages > 1 && !isLoading && (
        <View align="center" paddingTop={6}>
          <Pagination
            total={totalPages}
            previousAriaLabel="Página anterior"
            nextAriaLabel="Próxima página"
            pageAriaLabel={(args) => `Página ${args.page}`}
            onChange={(args) => handlePageChange(args.page)}
            defaultPage={currentPage}
          />
        </View>
      )}
    </div>
  );
};
