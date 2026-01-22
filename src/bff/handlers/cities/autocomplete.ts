'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { fetchCities } from './index';

export type CityAutocompleteResult = {
  label: string;
  value: string;
  city: string;
  state: string;
};

export type CitiesAutocompleteResponse = {
  results: CityAutocompleteResult[];
};

const formatCityValue = (city: string, state: string): string => {
  return `${city.toLowerCase()}-${state.toLowerCase()}`;
};

export const handleCitiesAutocomplete = async (
  query: string = '',
): Promise<CitiesAutocompleteResponse> => {
  ensureBffInitialized();

  const cities = await fetchCities(query);

  return {
    results: cities.map((city) => ({
      label: `${city.nome} - ${city.estado}`,
      value: formatCityValue(city.nome, city.estado),
      city: city.nome,
      state: city.estado,
    })),
  };
};
