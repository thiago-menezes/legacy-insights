'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCityContext } from '@/contexts/city';
import { CAROUSEL_CONFIG } from './constants';

export const useHeroCarousel = (totalSlides: number = 1) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((prev) => {
        const newIndex = index % totalSlides;

        const forward = (newIndex - prev + totalSlides) % totalSlides;
        const backward = (prev - newIndex + totalSlides) % totalSlides;
        setDirection(forward <= backward ? 'right' : 'left');
        return newIndex;
      });
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => {
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const pauseAutoAdvance = useCallback(() => {
    setIsAutoAdvancing(false);

    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    autoAdvanceTimeoutRef.current = setTimeout(() => {
      setIsAutoAdvancing(true);
    }, 10000);
  }, []);

  useEffect(() => {
    if (!isAutoAdvancing || totalSlides <= 1) return;

    const interval = setInterval(
      nextSlide,
      CAROUSEL_CONFIG.autoAdvanceInterval,
    );

    return () => clearInterval(interval);
  }, [isAutoAdvancing, totalSlides, nextSlide]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentSlide,
    direction,
    goToSlide,
    nextSlide,
    previousSlide,
    isAutoAdvancing,
    setIsAutoAdvancing,
    pauseAutoAdvance,
  };
};

export const useQuickSearchForm = () => {
  const {
    city: contextCity,
    state: contextState,
    setCityState,
    modalities,
    toggleModality,
  } = useCityContext();
  const [localCity, setLocalCity] = useState('');
  const [course, setCourse] = useState('');

  const city = contextCity || localCity;

  const setCity = useCallback(
    (newCity: string) => {
      setLocalCity(newCity);
      setCityState(newCity, contextState);
    },
    [setCityState, contextState],
  );

  const reset = useCallback(() => {
    setCity('');
    setCourse('');
  }, [setCity]);

  return {
    city,
    setCity,
    course,
    setCourse,
    modalities,
    toggleModality,
    reset,
  };
};
