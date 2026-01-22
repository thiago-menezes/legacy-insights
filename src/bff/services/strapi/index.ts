import { createFetchClient } from '../../utils/fetch-client';

export type PopulateOption = string | string[] | Record<string, PopulateValue>;

export type PopulateValue =
  | string
  | boolean
  | { populate?: PopulateOption; fields?: string[] };

export type StrapiFetchOptions = {
  filters?: Record<string, unknown>;
  populate?: PopulateOption;
  sort?: string | string[];
  params?: Record<string, unknown>;
};

export type StrapiConfig = {
  baseUrl: string;
  token?: string;
  timeout?: number;
};

let config: StrapiConfig | null = null;
let fetchClient: ReturnType<typeof createFetchClient> | null = null;

export const initStrapi = (cfg: StrapiConfig): void => {
  config = cfg;
  fetchClient = createFetchClient({
    baseUrl: `${cfg.baseUrl}/api`,
    defaultHeaders: cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {},
    defaultTimeout: cfg.timeout || 10000,
  });
};

export const getConfig = (): StrapiConfig => {
  if (!config) throw new Error('Strapi not initialized');
  return config;
};

const getFetchClient = () => {
  if (!fetchClient) throw new Error('Strapi not initialized');
  return fetchClient;
};

const buildNestedFilter = (
  prefix: string,
  filters: Record<string, unknown>,
): string[] => {
  const parts: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          parts.push(
            ...buildNestedFilter(
              `${fullKey}[${index}]`,
              item as Record<string, unknown>,
            ),
          );
        } else {
          parts.push(
            `${fullKey}[${index}]=${encodeURIComponent(String(item))}`,
          );
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      const valueObj = value as Record<string, unknown>;
      const keys = Object.keys(valueObj);
      const allOperators =
        keys.length > 0 && keys.every((k) => k.startsWith('$'));

      if (allOperators) {
        Object.entries(valueObj).forEach(([opKey, opValue]) => {
          parts.push(
            `${fullKey}[${opKey}]=${encodeURIComponent(String(opValue))}`,
          );
        });
      } else {
        parts.push(...buildNestedFilter(fullKey, valueObj));
      }
    } else {
      parts.push(`${fullKey}=${encodeURIComponent(String(value))}`);
    }
  });

  return parts;
};

const buildPopulate = (
  obj: Record<string, unknown>,
  prefix = 'populate',
): string[] => {
  const parts: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'boolean') {
      parts.push(`${prefix}[${key}]=${value}`);
    } else if (typeof value === 'object' && value !== null) {
      const valueObj = value as Record<string, unknown>;

      // Handle fields array
      if ('fields' in valueObj && Array.isArray(valueObj.fields)) {
        valueObj.fields.forEach((field: string, index: number) => {
          parts.push(`${prefix}[${key}][fields][${index}]=${field}`);
        });
      }

      // Handle nested populate
      if ('populate' in valueObj) {
        if (
          typeof valueObj.populate === 'object' &&
          !Array.isArray(valueObj.populate)
        ) {
          parts.push(
            ...buildPopulate(
              valueObj.populate as Record<string, unknown>,
              `${prefix}[${key}][populate]`,
            ),
          );
        } else if (valueObj.populate === true) {
          parts.push(`${prefix}[${key}][populate]=true`);
        }
      }

      // If neither fields nor populate specified, just set to true
      if (!('fields' in valueObj) && !('populate' in valueObj)) {
        parts.push(`${prefix}[${key}]=true`);
      }
    }
  });

  return parts;
};

const buildQuery = (options?: StrapiFetchOptions): string => {
  const parts: string[] = [];

  if (options?.filters) {
    parts.push(...buildNestedFilter('filters', options.filters));
  }

  if (options?.populate) {
    if (typeof options.populate === 'string') {
      parts.push(`populate=${options.populate}`);
    } else if (Array.isArray(options.populate)) {
      options.populate.forEach((field, index) => {
        parts.push(`populate[${index}]=${field}`);
      });
    } else if (typeof options.populate === 'object') {
      parts.push(...buildPopulate(options.populate as Record<string, unknown>));
    }
  }

  if (options?.sort) {
    if (Array.isArray(options.sort)) {
      options.sort.forEach((field, index) => {
        parts.push(`sort[${index}]=${field}`);
      });
    } else {
      parts.push(`sort=${options.sort}`);
    }
  }

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      parts.push(`${key}=${encodeURIComponent(String(value))}`);
    });
  }

  return parts.length > 0 ? `?${parts.join('&')}` : '';
};

export const strapiFetch = async <T>(
  endpoint: string,
  options?: StrapiFetchOptions,
  noCache?: boolean,
): Promise<T | null> => {
  const client = getFetchClient();
  const query = buildQuery(options);
  const path = `/${endpoint}${query}`;

  try {
    return await client<T>(path, {
      headers: noCache ? { 'Cache-Control': 'no-cache' } : {},
    });
  } catch {
    return null;
  }
};

export const getStrapiBaseUrl = (): string => {
  return getConfig().baseUrl;
};
