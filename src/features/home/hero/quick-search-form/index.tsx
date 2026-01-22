'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Checkbox, FormControl, Tooltip, useToast } from 'reshaped';
import { CitySelect, CourseInput, Icon } from '@/components';
import { useCityContext } from '@/contexts/city';
import { useGeolocation, useInstitutionData } from '@/hooks';
import { toProperCase } from '@/utils';
import { useQuickSearchForm } from '../hooks';
import { CourseModality } from '../types';
import { buildSearchParams, formatCityValue } from '../utils';
import { MODALITIES } from './constants';
import styles from './styles.module.scss';
import type { CourseLevel, QuickSearchFormProps } from './types';

export const QuickSearchForm = ({ onSubmit }: QuickSearchFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<CourseLevel>('graduation');
  const [inputValue, setInputValue] = useState('');
  const isUserTypingRef = useRef(false);
  const previousCityRef = useRef<string>('');
  const { city, setCity, course, setCourse, modalities, toggleModality } =
    useQuickSearchForm();
  const [formattedCityValue, setFormattedCityValue] = useState('');
  const toast = useToast();

  const {
    city: contextCity,
    state: contextState,
    source: citySource,
    setCityState,
    setFocusCityFieldCallback,
  } = useCityContext();

  const {
    defaultCity,
    defaultState,
    isLoading: isInstitutionLoading,
  } = useInstitutionData();

  const skipGeolocation = contextCity !== '' && contextState !== '';

  const {
    city: geolocationCity,
    state: geolocationState,
    permissionDenied,
    isLoading: isGeoLoading,
  } = useGeolocation({
    institutionDefaultCity: defaultCity,
    institutionDefaultState: defaultState,
    skip: skipGeolocation,
  });

  useEffect(() => {
    setFocusCityFieldCallback(() => {
      const cityInput = document.querySelector<HTMLInputElement>(
        'select[name="city"]',
      );
      cityInput?.focus();
    });
  }, [setFocusCityFieldCallback]);

  useEffect(() => {
    if (citySource === 'manual') {
      return;
    }

    if (
      geolocationCity &&
      geolocationState &&
      !isGeoLoading &&
      !permissionDenied
    ) {
      setCityState(geolocationCity, geolocationState, 'geolocation');
      setInputValue(`${geolocationCity} - ${geolocationState}`);
      setFormattedCityValue(formatCityValue(geolocationCity, geolocationState));
      return;
    }
  }, [
    contextCity,
    contextState,
    citySource,
    isGeoLoading,
    geolocationCity,
    geolocationState,
    permissionDenied,
    defaultCity,
    defaultState,
    isInstitutionLoading,
    setCityState,
  ]);

  const currentCityLabel = useMemo(() => {
    if (contextCity && contextState) {
      const formattedCity = contextCity
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');
      return `${formattedCity} - ${contextState.toUpperCase()}`;
    }
    return '';
  }, [contextCity, contextState]);

  useEffect(() => {
    const currentCityKey =
      contextCity && contextState ? `${contextCity}-${contextState}` : '';

    if (
      currentCityKey !== previousCityRef.current &&
      !isUserTypingRef.current
    ) {
      if (contextCity && contextState) {
        setInputValue(currentCityLabel);

        setFormattedCityValue(formatCityValue(contextCity, contextState));
      }
      previousCityRef.current = currentCityKey;
    }

    if (isUserTypingRef.current) {
      const timer = setTimeout(() => {
        isUserTypingRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [
    contextCity,
    contextState,
    currentCityLabel,
    inputValue,
    formattedCityValue,
    isGeoLoading,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const searchData = {
        city: formattedCityValue || city,
        course,
        modalities,
        courseLevel: activeTab,
      };

      if (onSubmit) {
        onSubmit(searchData);
      }

      const params = buildSearchParams(searchData);
      router.push(`/cursos?${params.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.tabsContainer}>
        <Button
          size="small"
          variant={activeTab === 'graduation' ? 'solid' : 'ghost'}
          color={activeTab === 'graduation' ? 'primary' : undefined}
          onClick={() => setActiveTab('graduation')}
          disabled={isLoading}
          icon={<Icon name="school" />}
        >
          Graduação
        </Button>

        {/* TODO: Implement postgraduate logic when ready */}
        <Tooltip text="Em breve" position="top-start">
          {(attributes) => (
            <Button
              size="small"
              variant={activeTab === 'postgraduate' ? 'solid' : 'ghost'}
              color={activeTab === 'postgraduate' ? 'primary' : undefined}
              onClick={() => {
                const id = toast.show({
                  title: 'Futuro pós-graduando:',
                  text: 'Em breve você poderá encontrar os melhores cursos de pós-graduação aqui.',
                  actionsSlot: (
                    <Button
                      color="primary"
                      icon={<Icon name="help" />}
                      onClick={() => toast.hide(id)}
                    >
                      Falar com um especialista agora
                    </Button>
                  ),
                  size: 'large',
                  position: 'bottom-end',
                  timeout: 3000,
                });
              }}
              icon={<Icon name="briefcase" />}
              className={
                activeTab === 'postgraduate'
                  ? styles.secondaryButton
                  : undefined
              }
              attributes={attributes}
            >
              Pós-Graduação
            </Button>
          )}
        </Tooltip>
      </div>

      <div className={styles.inputsContainer}>
        <FormControl id="city">
          <CitySelect
            selectedCity={city}
            handleChange={setCity}
            label="Cidade"
            size="large"
          />
        </FormControl>

        <CourseInput
          value={course}
          onChange={setCourse}
          disabled={isLoading}
          size="large"
        />

        <Button
          type="submit"
          size="large"
          color="primary"
          disabled={isLoading}
          aria-label="Search courses"
          className={
            activeTab === 'postgraduate' ? styles.secondaryButton : undefined
          }
          endIcon={<Icon name="search" />}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      <div className={styles.filtersContainer}>
        <span className={styles.filtersLabel}>Modalidade:</span>
        <div className={styles.filterOptions}>
          {MODALITIES.map((modality) => {
            return (
              <Checkbox
                key={modality}
                name={`modality-${modality}`}
                checked={modalities.includes(modality as CourseModality)}
                onChange={() => toggleModality(modality as CourseModality)}
                disabled={isLoading}
                className={
                  activeTab === 'postgraduate'
                    ? styles.secondaryCheckbox
                    : undefined
                }
              >
                {modality === 'digital' ? 'EAD' : toProperCase(modality)}
              </Checkbox>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export type { QuickSearchFormProps };
