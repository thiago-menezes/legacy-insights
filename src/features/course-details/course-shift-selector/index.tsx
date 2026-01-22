import { useEffect } from 'react';
import { Text, View } from 'reshaped';
import { ButtonOption } from '@/components';
import type { CourseShiftDTO } from '@/types/api/course-details';
import styles from './styles.module.scss';

export type CourseShiftSelectorProps = {
  shifts: CourseShiftDTO[];
  selectedShiftName: string | null;
  onSelectShift: (shiftName: string) => void;
};

export const CourseShiftSelector = ({
  shifts,
  selectedShiftName,
  onSelectShift,
}: CourseShiftSelectorProps) => {
  const uniqueShifts = Array.from(
    new Map(shifts.map((shift) => [shift.name, shift])).values(),
  );

  useEffect(() => {
    if (uniqueShifts.length > 0 && !selectedShiftName) {
      onSelectShift(uniqueShifts[0].name || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueShifts]);

  if (!uniqueShifts || uniqueShifts.length === 0) return null;

  return (
    <View gap={1}>
      <Text as="label" variant="body-3" weight="medium">
        Turno:
      </Text>

      <View className={styles.shiftGrid}>
        {uniqueShifts.map((shift) => {
          const isSelected =
            selectedShiftName !== null && selectedShiftName === shift.name;
          return (
            <ButtonOption
              key={shift.name}
              isSelected={isSelected}
              onClick={() => onSelectShift(shift.name || '')}
            >
              {shift.name}
            </ButtonOption>
          );
        })}
      </View>
    </View>
  );
};
