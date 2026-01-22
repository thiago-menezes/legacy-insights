import { createFetchClient } from '../../utils/fetch-client';

export type ApiConfig = {
  baseUrl: string;
  timeout?: number;
  apiKey?: string;
};

let config: ApiConfig | null = null;
let fetchClient: ReturnType<typeof createFetchClient> | null = null;

export const initClientApi = (cfg: ApiConfig): void => {
  config = cfg;
  fetchClient = createFetchClient({
    baseUrl: cfg.baseUrl,
    defaultHeaders: cfg.apiKey ? { 'x-api-key': cfg.apiKey } : {},
    defaultTimeout: cfg.timeout || 15000,
  });
};

export const getClientApiConfig = (): ApiConfig => {
  if (!config) throw new Error('Client API not initialized');
  return config;
};

const getFetchClient = () => {
  if (!fetchClient) throw new Error('Client API not initialized');
  return fetchClient;
};

export const buildClientApiUrl = (
  path: string,
  params?: Record<string, string | number | undefined>,
): string => {
  const { baseUrl } = getClientApiConfig();
  const url = new URL(`${baseUrl}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });
  }
  return url.toString();
};

export const clientApiFetch = async <T>(
  url: string,
  options?: RequestInit & { timeout?: number },
): Promise<T> => {
  const client = getFetchClient();
  // client-api-fetch sometimes receives a full URL, sometimes a path
  // Our fetch client handles both
  return client<T>(url, options);
};
