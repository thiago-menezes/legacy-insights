'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import useLocalStorage from 'use-local-storage';
import { toProperCase } from '@/utils';

type CitySource = 'default' | 'geolocation' | 'manual';

type CityStorageData = {
  city: string;
  state: string;
  timestamp: number;
  source?: CitySource;
  unitIds?: number[];
};

type CourseModality = 'presencial' | 'semipresencial' | 'digital';

const ALL_MODALITIES: CourseModality[] = [
  'presencial',
  'semipresencial',
  'digital',
];

type CityContextValue = {
  city: string;
  state: string;
  source: CitySource;
  unitIds: number[];
  modalities: CourseModality[];
  setCityState: (
    city: string,
    state: string,
    source?: CitySource,
    unitIds?: number[],
  ) => void;
  setModalities: (modalities: CourseModality[]) => void;
  toggleModality: (modality: CourseModality) => void;
  focusCityField: () => void;
  setFocusCityFieldCallback: (callback: () => void) => void;
};

const CityContext = createContext<CityContextValue | undefined>(undefined);

const CITY_STORAGE_KEY = 'grupo-ser:selected-city';
const DEFAULT_CITY_DATA: CityStorageData = {
  city: '',
  state: '',
  timestamp: Date.now(),
  source: 'default',
};

const parseCityFromUrl = (
  urlValue: string,
): { city: string; state: string } | null => {
  const legacyMatch = urlValue.match(/^city:(.+?)-state:([a-z]{2})$/i);
  if (legacyMatch) {
    const cityName = toProperCase(legacyMatch[1].replace(/-/g, ' '));
    const stateCode = legacyMatch[2].toUpperCase();
    return { city: cityName, state: stateCode };
  }

  const normalized = urlValue.trim();
  const lastDash = normalized.lastIndexOf('-');
  if (lastDash > 0) {
    const cityPart = toProperCase(
      normalized.slice(0, lastDash).replace(/-/g, ' '),
    );
    const statePart = normalized.slice(lastDash + 1).toUpperCase();
    if (statePart.length === 2) {
      return { city: cityPart, state: statePart };
    }
  }
  return null;
};

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [cityData, setCityData] = useLocalStorage<CityStorageData>(
    CITY_STORAGE_KEY,
    DEFAULT_CITY_DATA,
  );
  const [focusCallback, setFocusCallback] = useState<(() => void) | null>(null);
  const [modalities, setModalitiesState] =
    useState<CourseModality[]>(ALL_MODALITIES);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const cityFromUrl = urlParams.get('city');
    const stateFromUrl = urlParams.get('state');

    if (cityFromUrl) {
      const parsed = parseCityFromUrl(cityFromUrl);
      if (parsed) {
        setCityData((prev) => ({
          city: parsed.city,
          state: parsed.state,
          timestamp: Date.now(),
          source: 'manual',
          unitIds: prev?.unitIds,
        }));
        return;
      }

      if (stateFromUrl) {
        setCityData((prev) => ({
          city: toProperCase(cityFromUrl),
          state: stateFromUrl.toUpperCase(),
          timestamp: Date.now(),
          source: 'manual',
          unitIds: prev?.unitIds,
        }));
      }
    }
  }, [setCityData]);

  const city = cityData.city ? toProperCase(cityData.city) : '';
  const state = cityData.state ? cityData.state.toUpperCase() : '';
  const source = cityData.source || 'default';
  const unitIds = cityData.unitIds || [];

  const setCityState = useCallback(
    (
      newCity: string,
      newState: string,
      newSource: CitySource = 'manual',
      newUnitIds?: number[],
    ) => {
      setCityData((prev) => ({
        city: newCity,
        state: newState,
        timestamp: Date.now(),
        source: newSource,
        unitIds: newUnitIds !== undefined ? newUnitIds : prev?.unitIds,
      }));
    },
    [setCityData],
  );

  const focusCityField = useCallback(() => {
    focusCallback?.();
  }, [focusCallback]);

  const setFocusCityFieldCallback = useCallback((callback: () => void) => {
    setFocusCallback(() => callback);
  }, []);

  const setModalities = useCallback((newModalities: CourseModality[]) => {
    setModalitiesState(newModalities);
  }, []);

  const toggleModality = useCallback((modality: CourseModality) => {
    setModalitiesState((prev) =>
      prev.includes(modality)
        ? prev.filter((m) => m !== modality)
        : [...prev, modality],
    );
  }, []);

  return (
    <CityContext.Provider
      value={{
        city,
        state,
        source,
        unitIds,
        modalities,
        setCityState,
        setModalities,
        toggleModality,
        focusCityField,
        setFocusCityFieldCallback,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
};
