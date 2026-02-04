import { PLATFORM_PAYLOADS } from './constants';

export const getDefaultPayload = (source: string): string => {
  const payload =
    PLATFORM_PAYLOADS[source as keyof typeof PLATFORM_PAYLOADS] ||
    PLATFORM_PAYLOADS.default;
  return JSON.stringify(payload, null, 2);
};
