import { PROCESS_STATUS_CONFIG, STATUS_CONFIG } from '../constants';
import { IntegrationProfile } from '../types';

export const useProfileStatus = (profile: IntegrationProfile) => {
  const statusConfig =
    STATUS_CONFIG[profile.status] || STATUS_CONFIG.disconnected;
  const processStatusConfig = profile.processStatus
    ? PROCESS_STATUS_CONFIG[profile.processStatus]
    : null;

  return {
    statusConfig,
    processStatusConfig,
  };
};
