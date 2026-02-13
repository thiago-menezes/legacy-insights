'use client';

import { useCallback, useState } from 'react';
import { DateRangeValue } from './types';

const daysAgo = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

const today = (): string => new Date().toISOString().split('T')[0];

export const useDateRangePickerState = () => {
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: daysAgo(30),
    endDate: today(),
  });

  const handleDateRangeChange = useCallback((value: DateRangeValue) => {
    setDateRange(value);
  }, []);

  return {
    dateRange,
    handleDateRangeChange,
  };
};
