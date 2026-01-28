import { createServiceKeys } from '../../utils';
import { campaignHandler } from './handlers';

export const campaignService =
  createServiceKeys<typeof campaignHandler>(campaignHandler);

export type * from './types';
