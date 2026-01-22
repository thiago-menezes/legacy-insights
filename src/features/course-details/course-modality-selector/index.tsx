import { useEffect } from 'react';
import { Text, View } from 'reshaped';
import { ButtonOption } from '@/components';
import type { CourseDetails } from '../types';
import styles from './styles.module.scss';

export type CourseModalitySelectorProps = {
  modalities: CourseDetails['modalities'];
  selectedModalityId: number | null;
  onSelectModality: (modalityId: number) => void;
};

export const CourseModalitySelector = ({
  modalities = [],
  selectedModalityId,
  onSelectModality,
}: CourseModalitySelectorProps) => {
  useEffect(() => {
    if (modalities.length > 0 && !selectedModalityId) {
      onSelectModality(modalities[0].id);
    }
  }, [modalities, onSelectModality, selectedModalityId]);

  if (modalities.length === 0) return null;

  return (
    <View gap={1}>
      <Text as="label" variant="body-3" weight="medium">
        Modalidade:
      </Text>

      <View className={styles.modalityGrid}>
        {modalities.map(
          (modality: { id: number; name: string; slug: string }) => {
            const isSelected = selectedModalityId === modality.id;
            return (
              <ButtonOption
                key={modality.id}
                isSelected={isSelected}
                onClick={() => onSelectModality(modality.id)}
              >
                {modality.name}
              </ButtonOption>
            );
          },
        )}
      </View>
    </View>
  );
};
