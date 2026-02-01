import { CampaignStatus } from '../types';

export interface AdvancedFiltersProps {
  active: boolean;
  onClose: () => void;
  onApply: (filters: AdvancedFiltersState) => void;
  currentFilters: AdvancedFiltersState;
}

export interface AdvancedFiltersState {
  status?: CampaignStatus[];
  showOnlyActive?: boolean;
}

export interface StatusOption {
  value: CampaignStatus;
  label: string;
}

export type { CampaignStatus };
