'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { Button, Text } from 'reshaped';
import { Icon } from '@/components';
import { useCityContext } from '@/contexts/city';
import { useInfrastructure } from './hooks';
import { ImageModal } from './image-modal';
import styles from './styles.module.scss';

export type InfrastructureSectionProps = {
  preselectedUnitId?: number;
  courseId?: string;
  fixedUnitId?: number;
};

export const InfrastructureSection = ({
  preselectedUnitId,
  courseId,
  fixedUnitId,
}: InfrastructureSectionProps = {}) => {
  const { focusCityField } = useCityContext();
  const {
    city,
    state,
    permissionDenied,
    requestPermission,
    isLoading,
    sortedUnits,
    handleUnitClick,
    mainImage,
    sideImages,
    handleImageClick,
    handleCloseModal,
    handlePreviousImage,
    handleNextImage,
    hasPreviousImage,
    hasNextImage,
    selectedImageId,
    selectedUnitId,
    selectedUnitAddress,
    selectedImage,
    isError,
  } = useInfrastructure(fixedUnitId || preselectedUnitId, courseId);

  const hasCity = Boolean(city && state);

  if (!sortedUnits || sortedUnits.length === 0) {
    return null;
  }

  const showGallery = Boolean(mainImage);

  return (
    <section
      id="infraestrutura"
      className={styles.section}
      aria-labelledby="infrastructure-section-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Text
              as="h2"
              variant="featured-1"
              weight="bold"
              className={styles.title}
            >
              Conheça nossa infraestrutura
            </Text>
            {!fixedUnitId && (
              <div className={styles.locationInfo}>
                <Text as="span" variant="body-2">
                  Unidades próximas a:
                </Text>
                <div className={styles.location}>
                  {!hasCity && permissionDenied ? (
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={requestPermission}
                      disabled={isLoading}
                      className={styles.locationButton}
                    >
                      <Icon name="current-location" size={16} />
                      Permitir localização
                    </Button>
                  ) : hasCity ? (
                    <button
                      type="button"
                      onClick={focusCityField}
                      className={styles.locationButton}
                      disabled={isLoading}
                    >
                      <Text
                        as="span"
                        variant="body-2"
                        weight="medium"
                        className={styles.locationText}
                      >
                        {city} - {state}
                      </Text>
                      <Icon
                        name="current-location"
                        size={16}
                        className={styles.locationIcon}
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.tags}>
          {fixedUnitId
            ? sortedUnits
                .filter((unit) => unit.id === fixedUnitId.toString())
                .map((unit) => (
                  <button
                    key={unit.id}
                    className={clsx(styles.tag, styles.tagActive)}
                    type="button"
                    disabled
                  >
                    {unit.name}
                  </button>
                ))
            : sortedUnits.map((unit) => {
                const isActive =
                  selectedUnitId === unit.id ||
                  (!selectedUnitId && unit.isActive);
                return (
                  <button
                    key={unit.id}
                    className={clsx(styles.tag, isActive && styles.tagActive)}
                    onClick={() => handleUnitClick(unit.id)}
                    type="button"
                  >
                    {unit.name}
                  </button>
                );
              })}
        </div>

        {selectedUnitAddress && (
          <div className={styles.address}>
            <Text variant="body-3" color="neutral-faded">
              {selectedUnitAddress}
            </Text>
          </div>
        )}

        {showGallery && (
          <div className={styles.gallery}>
            <button
              className={styles.mainImage}
              onClick={() => handleImageClick(mainImage.id)}
              type="button"
              aria-label={mainImage.alt}
            >
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={604}
                height={424}
                className={styles.image}
              />
            </button>
            <div className={styles.sideImages}>
              {sideImages.map((image) => (
                <button
                  key={image.id}
                  className={styles.sideImage}
                  onClick={() => handleImageClick(image.id)}
                  type="button"
                  aria-label={image.alt}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={290}
                    height={200}
                    className={styles.image}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {!showGallery && !isLoading && sortedUnits.length > 0 && (
          <div className={styles.emptyState}>
            <Text variant="body-2" color="neutral-faded">
              {selectedUnitId
                ? 'No momento, não possuímos fotos da infraestrutura desta unidade.'
                : 'Selecione uma unidade acima para visualizar as fotos da infraestrutura.'}
            </Text>
          </div>
        )}

        {isError && !isLoading && hasCity && (
          <div className={styles.emptyState}>
            <Text variant="body-2" color="neutral-faded">
              Não foi possível carregar as informações das unidades no momento.
              Por favor, tente novamente mais tarde.
            </Text>
          </div>
        )}
      </div>

      <ImageModal
        active={selectedImageId !== null}
        image={selectedImage || null}
        onClose={handleCloseModal}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
        hasPrevious={hasPreviousImage}
        hasNext={hasNextImage}
      />
    </section>
  );
};
