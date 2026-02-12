export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatCurrency = (
  value?: number,
  currency: string = 'BRL',
): string => {
  if (value === undefined || value === null) return '-';

  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
};

export const formatPercentage = (value: number, showSign = true): string => {
  const sign = showSign && value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2).replace('.', ',')}%`;
};

export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};
