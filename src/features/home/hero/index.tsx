import clsx from 'clsx';
import { HomeCarouselResponseDTO } from './api/types';
import { DEFAULT_HERO_CONTENT } from './constants';
import { HeroCarousel } from './hero-carousel';
import { QuickSearchForm } from './quick-search-form';
import styles from './styles.module.scss';

export const HeroSection = ({
  carouselData,
}: {
  carouselData: HomeCarouselResponseDTO;
}) => {
  const content = DEFAULT_HERO_CONTENT;

  const carouselItemsFormatted = (carouselData.data || [])
    ?.map((item) => ({
      id: item.id || 0,
      name: item.name || '',
      image: item.image || '',
      link: item.link || '',
      mobile: item.mobile || '',
    }))
    .filter((item) => Boolean(item.image));

  const hasMobileImages =
    carouselItemsFormatted &&
    carouselItemsFormatted.some((item) => Boolean(item.mobile));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <div
            className={clsx(styles.heroCard, {
              [styles.heroCardMobile]: hasMobileImages,
            })}
          >
            <HeroCarousel
              carouselItems={carouselItemsFormatted}
              showCarouselControls={content.showCarouselControls}
            />
          </div>

          <div className={styles.searchFormContainer}>
            <QuickSearchForm />
          </div>
        </div>
      </div>
    </div>
  );
};
