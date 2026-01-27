export const normalizeUrlPath = (path: string): string => {
  return decodeURIComponent(path).replace(/\s+/g, '0');
};
