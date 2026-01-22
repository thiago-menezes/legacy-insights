'use client';

import { useState, useRef, useEffect, useMemo, startTransition } from 'react';
import { FormControl, Autocomplete } from 'reshaped';
import type { AutocompleteProps } from 'reshaped';
import { useCitiesAutocomplete, type CityOption } from '@/hooks';
import { formatCityDisplayValue } from '@/utils/format-name';
import { Icon } from '../icon';
import { CityAutocompleteProps } from './types';

export const CityAutocomplete = ({
  value = '',
  handleChange,
  label = 'Em que cidade quer estudar?',
  placeholder = 'Encontre sua cidade',
  disabled = false,
  size = 'medium',
  showGeolocation = false,
  permissionDenied = false,
  onRequestPermission,
  name = 'city',
}: CityAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const isUserTypingRef = useRef(false);
  const isGeolocationRequestRef = useRef(false);

  const { cities: searchResults, isLoading: isSearching } =
    useCitiesAutocomplete(inputValue);

  const currentDisplayValue = useMemo(
    () => formatCityDisplayValue(value || ''),
    [value],
  );

  useEffect(() => {
    if (!isUserTypingRef.current && currentDisplayValue) {
      startTransition(() => {
        setInputValue(currentDisplayValue);
      });
    }
  }, [currentDisplayValue]);

  const allOptions = useMemo(() => {
    const options: CityOption[] = [];

    if (showGeolocation && permissionDenied) {
      options.push({
        label: 'Permitir localização',
        value: 'geolocation:request',
        city: '',
        state: '',
      });
    }

    options.push(...searchResults);

    return options;
  }, [showGeolocation, permissionDenied, searchResults]);

  const handleInputChange: AutocompleteProps['onChange'] = ({ value }) => {
    if (isGeolocationRequestRef.current && value === 'Permitir localização') {
      setInputValue('');
      return;
    }

    isUserTypingRef.current = true;
    setInputValue(value || '');

    if (value !== currentDisplayValue) {
      handleChange('');
    }

    setTimeout(() => {
      isUserTypingRef.current = false;
    }, 100);
  };

  const handleItemSelect: AutocompleteProps['onItemSelect'] = ({
    value,
    data,
  }) => {
    if (data) {
      const option = data as CityOption;

      if (option.value === 'geolocation:request') {
        isGeolocationRequestRef.current = true;
        onRequestPermission?.();

        setTimeout(() => {
          setInputValue('');
          isGeolocationRequestRef.current = false;
        }, 0);
        return;
      }

      isUserTypingRef.current = false;
      handleChange(option.value);

      setInputValue(value || option.label);
    }
  };

  return (
    <FormControl disabled={disabled}>
      <FormControl.Label>{label}</FormControl.Label>
      <Autocomplete
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onItemSelect={handleItemSelect}
        disabled={disabled}
        size={size}
      >
        {isSearching && inputValue.trim().length >= 2 && (
          <Autocomplete.Item value="" data={null} disabled>
            Buscando...
          </Autocomplete.Item>
        )}
        {allOptions.map((option) => {
          if (option.value === 'geolocation:request') {
            return (
              <Autocomplete.Item
                key={option.value}
                value={option.label}
                data={option}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="current-location" size={16} />
                  <span>{option.label}</span>
                </div>
              </Autocomplete.Item>
            );
          }

          return (
            <Autocomplete.Item
              key={option.value}
              value={option.label}
              data={option}
            >
              {option.label}
            </Autocomplete.Item>
          );
        })}
      </Autocomplete>
    </FormControl>
  );
};
