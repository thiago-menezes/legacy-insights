'use client';

import { useEffect, useMemo, useRef } from 'react';
import { FormControl, Select } from 'reshaped';
import type { CityDTO } from '@/bff/handlers/cities/types';
import { Icon } from '@/components';
import { useCityContext } from '@/contexts/city';
import { useCities } from './hooks';
import type { CitySelectProps } from './types';

const extractUnitIds = (cityData: CityDTO): number[] => {
  const unitIds: number[] = [];

  cityData.units.forEach((unit) => {
    if (unit.unitId !== null) {
      unitIds.push(unit.unitId);
    }
  });

  cityData.polos.forEach((polo) => {
    if (polo.unit?.unitId !== null && polo.unit?.unitId !== undefined) {
      unitIds.push(polo.unit.unitId);
    }
  });

  return [...new Set(unitIds)];
};

export const CitySelect = ({
  selectedCity = '',
  handleChange,
  label = 'Cidade:',
  size = 'large',
  id,
}: CitySelectProps) => {
  const { cities, isLoading } = useCities();
  const {
    city: contextCity,
    state: contextState,
    setCityState,
  } = useCityContext();
  const hasAutoSelected = useRef(false);
  const lastManualChangeRef = useRef<string | null>(null);

  const currentCityValue = useMemo(() => {
    if (selectedCity && cities.length > 0) {
      const isValidCity = cities.some((city) => {
        const cityValue = `${city.name.toLowerCase()}-${city.state.toLowerCase()}`;
        return cityValue === selectedCity;
      });
      if (isValidCity) {
        return selectedCity;
      }
    }

    if (contextCity && contextState) {
      return `${contextCity.toLowerCase()}-${contextState.toLowerCase()}`;
    }

    if (selectedCity) {
      return selectedCity;
    }

    return '';
  }, [selectedCity, contextCity, contextState, cities]);

  const isCurrentCityValid = useMemo(() => {
    if (!currentCityValue || cities.length === 0) return false;
    return cities.some((city) => {
      const cityValue = `${city.name.toLowerCase()}-${city.state.toLowerCase()}`;
      return cityValue === currentCityValue;
    });
  }, [currentCityValue, cities]);

  useEffect(() => {
    if (
      !isLoading &&
      cities.length > 0 &&
      !isCurrentCityValid &&
      !hasAutoSelected.current
    ) {
      hasAutoSelected.current = true;
      const firstCity = cities[0];
      const firstCityValue = `${firstCity.name.toLowerCase()}-${firstCity.state.toLowerCase()}`;
      const unitIds = extractUnitIds(firstCity);
      handleChange(firstCityValue);
      setCityState(firstCity.name, firstCity.state, 'manual', unitIds);
    }
  }, [isLoading, cities, isCurrentCityValid, handleChange, setCityState]);

  useEffect(() => {
    if (lastManualChangeRef.current === currentCityValue) {
      lastManualChangeRef.current = null;
      return;
    }

    if (
      !isLoading &&
      cities.length > 0 &&
      isCurrentCityValid &&
      currentCityValue
    ) {
      const matchedCity = cities.find((city) => {
        const cityValue = `${city.name.toLowerCase()}-${city.state.toLowerCase()}`;
        return cityValue === currentCityValue;
      });

      if (matchedCity) {
        const unitIds = extractUnitIds(matchedCity);
        setCityState(matchedCity.name, matchedCity.state, 'manual', unitIds);
      }
    }
  }, [isLoading, cities, isCurrentCityValid, currentCityValue, setCityState]);

  const handleCityChange = (value: string) => {
    lastManualChangeRef.current = value;
    handleChange(value);

    const selectedCityData = cities.find((city) => {
      const cityValue = `${city.name.toLowerCase()}-${city.state.toLowerCase()}`;
      return cityValue === value;
    });

    if (selectedCityData) {
      const unitIds = extractUnitIds(selectedCityData);
      setCityState(
        selectedCityData.name,
        selectedCityData.state,
        'manual',
        unitIds,
      );
    }
  };

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Select
        disabled={isLoading}
        id={id}
        name="city"
        placeholder="Selecione uma cidade"
        value={currentCityValue || ''}
        onChange={({ value }) => handleCityChange(value)}
        icon={<Icon name="location" />}
        size={size}
      >
        {isLoading && <option value="">Carregando...</option>}
        {cities.map((city) => {
          const cityValue = `${city.name.toLowerCase()}-${city.state.toLowerCase()}`;
          return (
            <option key={cityValue} value={cityValue}>
              {city.name} - {city.state}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export type { CitySelectProps, City } from './types';
