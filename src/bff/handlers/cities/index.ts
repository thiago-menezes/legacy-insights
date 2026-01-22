'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { clientApiFetch, buildClientApiUrl } from '../../services/client-api';

export type City = {
  nome: string;
  estado: string;
};

export const fetchCities = async (query?: string): Promise<City[]> => {
  const url = buildClientApiUrl('/cs/cidades', { c: query });
  // ClientApiFetch already throws on error
  return clientApiFetch<City[]>(url);
};

export type CityResponse = {
  cities: City[];
};

export const handleGetAllCities = async (): Promise<CityResponse> => {
  ensureBffInitialized();
  const cities = await fetchCities();
  return { cities };
};
