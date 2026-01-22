import type { StrapiCollectionResponse } from 'types/strapi/common';

export type EMecDTO = {
  id: number;
  link?: string;
  qrCode?: string;
};

export type EMecResponseDTO = StrapiCollectionResponse<EMecDTO>;
