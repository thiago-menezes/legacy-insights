'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutationGeocode } from './useMutationGeocode';

type GeolocationState = {
  city: string | null;
  state: string | null;
  coordinates: { lat: number; lng: number } | null;
  isLoading: boolean;
  error: GeolocationPositionError | null;
  permissionDenied: boolean;
  requestPermission: () => void;
};

type UseGeolocationOptions = {
  manualCity?: string | null;
  manualState?: string | null;
  institutionDefaultCity?: string | null;
  institutionDefaultState?: string | null;
  skip?: boolean;
};

export const useGeolocation = (
  options?: UseGeolocationOptions,
): GeolocationState => {
  const {
    manualCity,
    manualState,
    institutionDefaultCity,
    institutionDefaultState,
    skip = false,
  } = options || {};
  const [city, setCity] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(!skip);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const { mutateAsync: geocode } = useMutationGeocode();

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(null);
      setPermissionDenied(true);
      return;
    }

    setIsLoading((prev) => (prev ? prev : true));
    setError((prev) => (prev ? null : prev));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Store coordinates immediately when we get them from the browser
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinates(coords);

        try {
          const result = await geocode({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          if (result.success && result.data) {
            setCity(result.data.city);
            setState(result.data.state);
            setPermissionDenied(false);
            setIsLoading(false);
          } else {
            throw new Error('Geocoding failed');
          }
        } catch {
          // Even if geocoding fails, we keep the coordinates
          setCity(null);
          setState(null);
          setIsLoading(false);
        }
      },
      (err) => {
        setError(err);
        setPermissionDenied(
          err.code === GeolocationPositionError.PERMISSION_DENIED,
        );
        setIsLoading(false);
      },
    );
  }, [geocode]);

  useEffect(() => {
    if (skip) {
      return;
    }

    const param = requestAnimationFrame(() => {
      getLocation();
    });

    return () => {
      cancelAnimationFrame(param);
    };
  }, [skip, getLocation]);

  const getDefaultCity = () => {
    if (permissionDenied) {
      return institutionDefaultCity;
    }
    return null;
  };

  const getDefaultState = () => {
    if (permissionDenied) {
      return institutionDefaultState;
    }
    return null;
  };

  const finalCity =
    manualCity !== undefined && manualCity !== null && manualCity !== ''
      ? manualCity
      : city || getDefaultCity() || '';
  const finalState =
    manualState !== undefined && manualState !== null && manualState !== ''
      ? manualState
      : state || getDefaultState() || '';

  return {
    city: finalCity,
    state: finalState,
    coordinates,
    isLoading,
    error,
    permissionDenied,
    requestPermission: getLocation,
  };
};
