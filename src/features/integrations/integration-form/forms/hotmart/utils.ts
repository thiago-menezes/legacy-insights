export interface HotmartCredentials {
  clientId: string;
  clientSecret: string;
  basicToken: string;
}

/**
 * Parse Hotmart credentials from pasted text block
 */
export const parseHotmartCredentials = (
  text: string,
): HotmartCredentials | null => {
  try {
    const clientIdMatch = text.match(/Client\s*ID[:\s]*([a-f0-9-]+)/i);
    const clientSecretMatch = text.match(/Client\s*Secret[:\s]*([a-f0-9-]+)/i);
    const basicMatch = text.match(/Basic[:\s]+(?:Basic\s+)?([A-Za-z0-9+/=]+)/i);

    if (!clientIdMatch || !clientSecretMatch || !basicMatch) {
      return null;
    }

    return {
      clientId: clientIdMatch[1].trim(),
      clientSecret: clientSecretMatch[1].trim(),
      basicToken: basicMatch[1].trim(),
    };
  } catch {
    return null;
  }
};

/**
 * Mask sensitive credential string for display
 */
export const maskCredential = (value: string): string => {
  if (!value || value.length < 8) {
    return '••••••••';
  }
  return `${value.substring(0, 4)}••••${value.substring(value.length - 4)}`;
};
