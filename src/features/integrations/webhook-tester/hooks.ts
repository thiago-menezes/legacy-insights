import { useState } from 'react';
import { TestResponse } from './types';

export const useWebhookTest = (source: string, secret?: string) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<TestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async (targetUrl: string, payload: string) => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hotmart-hottok':
            source === 'hotmart' ? JSON.parse(payload).hottok : '',
          'x-kiwify-signature':
            source === 'kiwify' ? secret || 'test-signature' : '',
        },
        body: payload,
      });

      const data = await res.json().catch(() => ({ status: res.statusText }));

      setResponse({
        status: res.status,
        ok: res.ok,
        data: data,
      });
    } catch (error) {
      setError(JSON.stringify(error) || 'Failed to send test webhook');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    handleTest,
  };
};
