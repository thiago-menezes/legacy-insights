import type { CityOption } from './constants';

export const buildSearchParams = (data: {
  city?: string;
  course?: string;
  modalities?: string[];
  courseLevel?: string;
}): URLSearchParams => {
  const params = new URLSearchParams();

  if (data.city?.trim()) {
    params.append('city', data.city.trim());
  }

  if (data.course?.trim()) {
    params.append('course', data.course.trim());
  }

  if (data.courseLevel) {
    params.append('courseLevel', data.courseLevel);
  }

  if (data.modalities?.length && data.modalities.length < 3) {
    params.append('modalities', data.modalities.join(','));
  }

  return params;
};

export const parseCityValue = (value: string): string => {
  const legacyMatch = value.match(/^city:(.+?)-state:([a-z]{2})$/i);
  if (legacyMatch) {
    return legacyMatch[1].replace(/-/g, ' ');
  }

  const normalized = value.trim();
  const lastDash = normalized.lastIndexOf('-');
  if (lastDash > 0) {
    return normalized.slice(0, lastDash).replace(/-/g, ' ');
  }

  return value;
};

export const formatCityValue = (city: string, state: string): string => {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const stateCode = state.toLowerCase();
  return `${citySlug}-${stateCode}`;
};

const normalizeCityName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const findMatchingCity = (
  geocodedCity: string,
  geocodedState: string,
  availableCities: CityOption[],
): CityOption | null => {
  const normalizedGeocodedCity = normalizeCityName(geocodedCity);
  const normalizedGeocodedState = geocodedState.toUpperCase().trim();

  const exactMatch = availableCities.find(
    (c) =>
      normalizeCityName(c.city) === normalizedGeocodedCity &&
      c.state.toUpperCase() === normalizedGeocodedState,
  );

  if (exactMatch) {
    return exactMatch;
  }

  const partialMatch = availableCities.find((c) => {
    const normalizedCity = normalizeCityName(c.city);
    return (
      (normalizedCity.includes(normalizedGeocodedCity) ||
        normalizedGeocodedCity.includes(normalizedCity)) &&
      c.state.toUpperCase() === normalizedGeocodedState
    );
  });

  if (partialMatch) {
    return partialMatch;
  }

  return null;
};
