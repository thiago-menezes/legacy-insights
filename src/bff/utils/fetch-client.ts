import { BffError, BffTimeoutError } from './errors';

export type FetchOptions = RequestInit & {
  timeout?: number;
};

export const createFetchClient = (defaultConfig: {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  defaultTimeout?: number;
}) => {
  return async <T>(
    endpoint: string,
    options: FetchOptions = {},
  ): Promise<T> => {
    const {
      timeout = defaultConfig.defaultTimeout || 15000,
      headers,
      ...restOptions
    } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const url = endpoint.startsWith('http')
      ? endpoint
      : `${defaultConfig.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: {
          'Content-Type': 'application/json',
          ...defaultConfig.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = await response.text();
        }

        throw new BffError(
          `API Error: ${response.status} ${response.statusText}`,
          response.status,
          errorBody,
        );
      }

      // Check if response is empty (204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(id);

      if (error instanceof BffError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new BffTimeoutError(`Request to ${url} timed out`);
      }

      throw new BffError(
        error instanceof Error ? error.message : 'Unknown fetch error',
        500,
      );
    }
  };
};
