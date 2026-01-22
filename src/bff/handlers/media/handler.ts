import { getStrapiBaseUrl } from '../../services/strapi';
import { BffError } from '../../utils/errors';
import type { MediaQueryParams } from './types';

export const handleMedia = async (
  params: MediaQueryParams,
): Promise<{ buffer: ArrayBuffer; contentType: string }> => {
  if (!params.path || params.path.length === 0) {
    throw new BffError('Media path is required', 400);
  }

  const mediaPath = `/${params.path.join('/')}`;
  const strapiBaseUrl = getStrapiBaseUrl();
  const strapiMediaUrl = `${strapiBaseUrl}${mediaPath}`;

  try {
    const response = await fetch(strapiMediaUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new BffError(
        `Failed to fetch media: ${response.status}`,
        response.status,
      );
    }

    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';
    const buffer = await response.arrayBuffer();

    return { buffer, contentType };
  } catch (error) {
    if (error instanceof BffError) throw error;
    throw new BffError(
      error instanceof Error ? error.message : 'Unknown media fetch error',
      500,
    );
  }
};
