'use client';

import { useEffect, useRef } from 'react';
import { Button, useToast } from 'reshaped';

const STORAGE_KEY = 'cookie_consent';

export const CookieConsent = () => {
  const toast = useToast();
  const toastRef = useRef<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);

    if (!consent && !toastRef.current) {
      setTimeout(() => {
        const id = toast.show({
          title: 'Valorizamos sua privacidade',
          text: 'Utilizamos cookies para aprimorar sua experiência de navegação, exibir anúncios ou conteúdo personalizado e analisar nosso tráfego. Ao clicar em "OK", você concorda com nosso uso de cookies.',
          actionsSlot: (
            <Button
              color="primary"
              onClick={() => {
                localStorage.setItem(STORAGE_KEY, 'true');
                if (toastRef.current) {
                  toast.hide(toastRef.current);
                }
              }}
            >
              OK
            </Button>
          ),
          position: 'bottom-start',
          timeout: 0,
        });
        toastRef.current = id;
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
