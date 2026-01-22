'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Reshaped, ToastProvider } from 'reshaped';
import { CityProvider } from '@/contexts/city';
import { makeQueryClient } from '@/libs';

const COLOR_MODE_STORAGE_KEY = 'rs-color-mode';

if (typeof window !== 'undefined') {
  const storedColorMode = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  if (storedColorMode === 'dark' || storedColorMode === 'light') {
    document.documentElement.setAttribute(
      'data-rs-color-mode',
      storedColorMode,
    );
  }
}

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => makeQueryClient());
  const institution = process.env.NEXT_PUBLIC_INSTITUTION || 'grupo-ser';
  const [delayToRender, setDelayToRender] = useState(true);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setDelayToRender(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  if (delayToRender) return <></>;

  return (
    <Reshaped theme={institution}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <CityProvider>
            {children}
            {process.env.NODE_ENV === 'development' ? (
              <ReactQueryDevtools initialIsOpen={false} />
            ) : null}
          </CityProvider>
        </QueryClientProvider>
      </ToastProvider>
    </Reshaped>
  );
};

export default Providers;
