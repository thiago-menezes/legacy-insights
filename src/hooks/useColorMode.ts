'use client';

import { useEffect } from 'react';
import { useTheme } from 'reshaped';

const COLOR_MODE_STORAGE_KEY = 'rs-color-mode';

export const useColorMode = () => {
  const { colorMode, invertColorMode } = useTheme();

  useEffect(() => {
    if (colorMode) {
      document.documentElement.setAttribute('data-rs-color-mode', colorMode);

      if (typeof window !== 'undefined') {
        localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
      }
    }
  }, [colorMode]);

  const handleInvertColorMode = () => {
    invertColorMode();

    const newColorMode = colorMode === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, newColorMode);
      document.documentElement.setAttribute('data-rs-color-mode', newColorMode);
    }
  };

  return {
    colorMode,
    invertColorMode: handleInvertColorMode,
  };
};
