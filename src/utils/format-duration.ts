export const formatDurationInMonths = (months: number): string => {
  if (!months || months <= 0) return '';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return remainingMonths === 1 ? '1 mês' : `${remainingMonths} meses`;
  }

  const yearLabel = years === 1 ? 'ano' : 'anos';

  if (remainingMonths === 0) {
    return `${years} ${yearLabel}`;
  }

  if (remainingMonths === 6) {
    return `${years} ${yearLabel} e meio`;
  }

  const monthLabel = remainingMonths === 1 ? 'mês' : 'meses';
  return `${years} ${yearLabel} e ${remainingMonths} ${monthLabel}`;
};
