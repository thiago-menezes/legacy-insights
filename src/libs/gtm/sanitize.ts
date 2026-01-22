export const sanitizeValue = (value: string): string => {
  if (!value) return '';

  return (
    value
      .toString()
      .toLowerCase()
      .trim()
      // Normalize accented characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Remove original hyphens first
      .replace(/-/g, '')
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove special characters (keep alphanumeric and hyphens)
      .replace(/[^\w-]+/g, '')
      // Remove multiple consecutive hyphens
      .replace(/--+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  );
};

export const sanitizeNumber = (value: number): number => {
  return parseFloat(value.toFixed(2));
};

export const sanitizePhone = (value: string): string => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};
