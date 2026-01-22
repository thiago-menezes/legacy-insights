export const formatCityDisplayValue = (value: string): string => {
  if (!value) return '';

  const techFormatMatch = value.match(/^city:(.+?)-state:([a-z]{2})$/i);

  if (techFormatMatch) {
    const citySlug = techFormatMatch[1];
    const stateCode = techFormatMatch[2].toUpperCase();
    const cityName = citySlug.replace(/-/g, ' ');

    const formattedCity = toProperCase(cityName);

    return `${formattedCity} - ${stateCode}`;
  }

  const normalized = value.trim();
  const lastDash = normalized.lastIndexOf('-');
  if (lastDash > 0) {
    const citySlug = normalized.slice(0, lastDash);
    const stateCode = normalized.slice(lastDash + 1).toUpperCase();
    if (stateCode.length === 2) {
      const cityName = citySlug.replace(/-/g, ' ');
      const formattedCity = toProperCase(cityName);
      return `${formattedCity} - ${stateCode}`;
    }
  }

  const displayFormatMatch = value.match(/^(.+?)\s*-\s*([A-Z]{2})$/);
  if (displayFormatMatch) {
    return value;
  }

  return toProperCase(value);
};

const LOWERCASE_WORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em']);

export const toProperCase = (text: string): string => {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      if (LOWERCASE_WORDS.has(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
