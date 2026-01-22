'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { handleCitiesAutocomplete } from '@/bff/handlers/cities/autocomplete';

export type CityOption = {
  label: string;
  value: string;
  city: string;
  state: string;
};

const DEBOUNCE_DELAY = 300;

export const useCitiesAutocomplete = (searchQuery: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['cities-autocomplete', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        return { results: [] };
      }

      const response = await handleCitiesAutocomplete(debouncedQuery.trim());

      return response;
    },
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const cities: CityOption[] = data?.results ?? [];

  return {
    cities,
    isLoading,
    error,
  };
};
