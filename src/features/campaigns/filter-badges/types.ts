import { CampaignsFilters } from '../types';

export interface FilterBadgesProps {
  filters: CampaignsFilters;
  onRemoveFilter: (filterKey: keyof CampaignsFilters, value?: string) => void;
  onClearAll: () => void;
}

export interface ActiveFilter {
  key: keyof CampaignsFilters;
  label: string;
  value?: string;
}
