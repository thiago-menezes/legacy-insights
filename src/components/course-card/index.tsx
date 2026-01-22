import Link from 'next/link';
import { Button } from 'reshaped';
import { toProperCase, formatDurationInMonths, formatPrice } from '@/utils';
import { routes } from '@/utils/routes';
import { Icon } from '../icon';
import { MODALITY_LABELS } from './constants';
import styles from './styles.module.scss';
import type { CourseCardProps } from './types';

export const CourseCard = ({ course, className }: CourseCardProps) => {
  const courseUrl = routes.courseDetails({
    id: course.id || '',
    city: course.city || '',
    unitName: course.unit?.name || '',
    unitId: course.unit?.id,
    modality: course.modality,
    shift: course.shift,
    admissionForm: course.admissionForm,
    name: course.name || '',
    slug: course.slug || '',
  });

  return (
    <Link href={courseUrl} className={`${styles.card} ${className || ''}`}>
      <div className={styles.header}>
        <div className={styles.title}>{course.name}</div>

        <div className={styles.meta}>
          {formatDurationInMonths(course.period || 0) && (
            <div className={styles.metaItem}>
              <Icon name="clock" size={12} aria-hidden="true" />
              <span>{formatDurationInMonths(course.period || 0)}</span>
            </div>
          )}

          <div className={styles.metaItem}>
            <Icon name="book" size={12} aria-hidden="true" />
            <span>{course.degree}</span>
          </div>

          {course.city && (
            <div className={styles.metaItem}>
              <Icon name="map-pin" size={12} aria-hidden="true" />
              <span>{course.city}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.modalities}>
        <div className={styles.modalitiesLabel}>Modalidade:</div>
        <div className={styles.modalitiesList}>
          <span className={styles.badge}>
            {(course.modality && MODALITY_LABELS[course.modality]) ||
              course.modality ||
              ''}
          </span>
        </div>
      </div>

      <div className={styles.campusWrapper}>
        {course.unit &&
          course.modality?.toLowerCase() !== 'digital' &&
          course.modality?.toLowerCase() !== 'semipresencial' && (
            <div className={styles.campus}>
              <div className={styles.campusLabel}>Unidade:</div>
              <div className={styles.campusName}>{course.unit.name}</div>
            </div>
          )}
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceLabel}>Primeira parcela:</div>
        <div className={styles.price}>
          {course.price ? formatPrice(course.price) : 'Consultar'}
        </div>
      </div>

      <Button
        color="primary"
        fullWidth
        aria-label={`Saiba mais sobre ${toProperCase(course.name || '')}`}
      >
        Mais sobre o curso
      </Button>
    </Link>
  );
};
