import Image from 'next/image';
import { useEffect } from 'react';
import { Modal, View } from 'reshaped';
import { Icon } from '@/components';
import type { ImageModalProps } from '../types';
import styles from './styles.module.scss';

export const ImageModal = ({
  active,
  image,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ImageModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (event.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    if (active) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, hasPrevious, hasNext, onPrevious, onNext]);

  if (!image) return null;

  return (
    <Modal
      active={active}
      onClose={onClose}
      size="large"
      className={styles.modal}
    >
      <div className={styles.content}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Fechar imagem"
        >
          <Icon name="x" size={24} />
        </button>

        <Image
          src={image.src}
          alt={image.alt}
          width={1800}
          height={800}
          className={styles.image}
          unoptimized
        />

        <View className={styles.navButtons}>
          <button
            className={styles.navButton}
            data-position="left"
            onClick={onPrevious}
            type="button"
            aria-label="Imagem anterior"
            disabled={!hasPrevious}
          >
            <Icon name="chevron-left" size={32} />
          </button>

          <button
            className={styles.navButton}
            data-position="right"
            onClick={onNext}
            type="button"
            aria-label="Próxima imagem"
            disabled={!hasNext}
          >
            <Icon name="chevron-right" size={32} />
          </button>
        </View>
      </div>
    </Modal>
  );
};
