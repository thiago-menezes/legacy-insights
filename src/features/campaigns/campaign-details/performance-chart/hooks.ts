'use client';

import { useState } from 'react';

type ChartGranularity = 'daily' | 'weekly';

export const usePerformanceChartState = () => {
  const [granularity, setGranularity] = useState<ChartGranularity>('daily');

  return {
    granularity,
    handleGranularityChange: setGranularity,
  };
};
