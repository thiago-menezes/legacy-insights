export const normalizeUrlPath = (path: string): string => {
  return decodeURIComponent(path) // Decodifica %20 → " "
    .replace(/\s+/g, '0'); // Transforma espaços em "0"
};
