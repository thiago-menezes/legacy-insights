'use client';

import { useCallback, useMemo, useState } from 'react';
import { Button, Text } from 'reshaped';
import { DATE_PRESETS } from './constants';
import styles from './styles.module.scss';
import { DateRangePickerProps } from './types';

export const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  const [showCustom, setShowCustom] = useState(false);

  const activePreset = useMemo(() => {
    return DATE_PRESETS.find((preset) => {
      const dates = preset.getDates();
      return (
        dates.startDate === value.startDate && dates.endDate === value.endDate
      );
    });
  }, [value]);

  const handlePresetClick = useCallback(
    (preset: (typeof DATE_PRESETS)[number]) => {
      setShowCustom(false);
      onChange(preset.getDates());
    },
    [onChange],
  );

  const handleCustomToggle = useCallback(() => {
    setShowCustom((prev) => !prev);
  }, []);

  return (
    <div className={styles.wrapper}>
      {DATE_PRESETS.map((preset) => (
        <Button
          key={preset.label}
          variant={activePreset?.label === preset.label ? 'solid' : 'outline'}
          size="small"
          onClick={() => handlePresetClick(preset)}
        >
          {preset.label}
        </Button>
      ))}
      <Button
        variant={showCustom ? 'solid' : 'outline'}
        size="small"
        onClick={handleCustomToggle}
      >
        Custom
      </Button>
      {showCustom && (
        <div className={styles.customInputs}>
          <input
            type="date"
            className={styles.dateInput}
            value={value.startDate}
            onChange={(e) => onChange({ ...value, startDate: e.target.value })}
          />
          <Text variant="caption-1" color="neutral-faded">
            até
          </Text>
          <input
            type="date"
            className={styles.dateInput}
            value={value.endDate}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};
