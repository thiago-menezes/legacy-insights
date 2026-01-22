'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { sendUserInteraction } from './events';
import { usePageView } from './hooks';
import type { PageData, UserData } from './types';

export const GTMHandler = () => {
  const pathname = usePathname();
  const { coordinates, city, state, isLoading } = useGeolocation();

  const getPageData = useCallback((): PageData => {
    let area: PageData['area'] = 'home';
    if (pathname.startsWith('/cursos')) area = 'cursos';
    if (pathname.startsWith('/checkout')) area = 'checkout';

    // This logic can be refined based on actual URL patterns
    let flow: PageData['flow'] = 'presencial';
    if (pathname.includes('/digital')) flow = 'digital';

    // Defaulting product type, this might need dynamic logic if URL contains it
    const productType: PageData['productType'] = 'graduacao';

    return {
      name: document.title, // Client-side title
      pagePath: pathname,
      area,
      flow,
      productType,
      environment: 'web',
      platform: 'browser',
    };
  }, [pathname]);

  const getUserData = useCallback((): UserData => {
    return {
      isLoggedin: false, // No global auth context found yet
      address:
        city && state
          ? {
              city,
              state,
              country: 'Brasil',
            }
          : undefined,
      geoLocation: coordinates
        ? {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }
        : undefined,
      machine: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screenResolution:
          typeof window !== 'undefined'
            ? `${window.screen.width}x${window.screen.height}`
            : '',
        language: typeof navigator !== 'undefined' ? navigator.language : '',
      },
    };
  }, [coordinates, city, state]);

  usePageView({
    getPageData,
    getUserData,
    ready: !isLoading, // Only send pageView when geolocation is ready
  });

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button =
        target.closest('button') || target.closest('[role="button"]');

      if (button) {
        sendUserInteraction({
          component: 'button',
          action: 'click-button',
          description:
            button.innerText || button.getAttribute('aria-label') || '',
          step: pathname.replace(/\//g, ' '),
          value: 0,
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
};
