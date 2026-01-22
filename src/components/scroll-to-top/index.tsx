'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const id = hash.replace('#', '');

      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (scrollToElement()) return;

      const intervalId = setInterval(() => {
        if (scrollToElement()) {
          clearInterval(intervalId);
        }
      }, 100);

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};
