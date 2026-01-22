export const slugify = (text: string): string => {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()

    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

    .replace(/&/g, '-e-')

    .replace(/\s+/g, '-')

    .replace(/[^\w-]+/g, '')

    .replace(/--+/g, '-')

    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
