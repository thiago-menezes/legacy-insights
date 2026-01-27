import { createServiceKeys } from '../../utils';
import { workspaceHandler } from './handlers';

export const workspacesService =
  createServiceKeys<typeof workspaceHandler>(workspaceHandler);

export type * from './types';
