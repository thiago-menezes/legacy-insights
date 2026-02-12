'use client';

import { Select, View } from 'reshaped';
import { subDays } from 'date-fns';
import { DATE_PRESET_OPTIONS, PRESET_DAYS } from './constants';
import { DateFilterProps, DatePreset } from './types';

export const DateFilter = ({
  startDate,
  endDate,
  preset,
  onPresetChange,
  onDateRangeChange,
}: DateFilterProps) => {
  const handlePresetChange = (value: string) => {
    const newPreset = value as DatePreset;
    onPresetChange(newPreset);

    if (newPreset !== 'custom') {
      const days = PRESET_DAYS[newPreset];
      const end = new Date();
      const start = subDays(end, days);
      onDateRangeChange(start, end);
    }
  };

  const formatDateForInput = (date?: Date): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <View direction="row" gap={2} align="center">
      <Select
        name="date-preset"
        onChange={({ value }) => handlePresetChange(value)}
        value={preset}
      >
        {DATE_PRESET_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {preset === 'custom' && (
        <View direction="row" gap={2} align="center">
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={(e) => {
              const newStart = e.target.value
                ? new Date(e.target.value)
                : undefined;
              onDateRangeChange(newStart, endDate);
            }}
            style={{
              padding: 'var(--rs-unit-x2) var(--rs-unit-x3)',
              borderRadius: 'var(--rs-radius-small)',
              border: '1px solid var(--rs-color-border-neutral-faded)',
              backgroundColor: 'var(--rs-color-background-neutral-faded)',
              color: 'var(--rs-color-foreground-neutral)',
              fontSize: '14px',
            }}
          />
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={(e) => {
              const newEnd = e.target.value
                ? new Date(e.target.value)
                : undefined;
              onDateRangeChange(startDate, newEnd);
            }}
            style={{
              padding: 'var(--rs-unit-x2) var(--rs-unit-x3)',
              borderRadius: 'var(--rs-radius-small)',
              border: '1px solid var(--rs-color-border-neutral-faded)',
              backgroundColor: 'var(--rs-color-background-neutral-faded)',
              color: 'var(--rs-color-foreground-neutral)',
              fontSize: '14px',
            }}
          />
        </View>
      )}
    </View>
  );
};
