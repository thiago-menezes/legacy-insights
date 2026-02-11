import { MOBILE_BREAKPOINT, STORAGE_KEY } from './constants';
import { ShellPreferences } from './types';

export const loadPreferences = (): ShellPreferences => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }

      return {
        sidebarVisible: window.innerWidth > MOBILE_BREAKPOINT,
        headerVisible: true,
      };
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse shell preferences:', e);
  }
  return {
    sidebarVisible: true,
    headerVisible: true,
  };
};
