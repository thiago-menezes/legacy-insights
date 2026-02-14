import { CampaignsFilters } from '../types';
import { ActiveFilter } from './types';

export const getActiveFilters = (filters: CampaignsFilters): ActiveFilter[] => {
  const activeFilters: ActiveFilter[] = [];

  // Search filter
  if (filters.search) {
    activeFilters.push({
      key: 'search',
      label: `Busca: "${filters.search}"`,
    });
  }

  // Date range filter
  if (filters.startDate && filters.endDate) {
    const start = filters.startDate.toLocaleDateString('pt-BR');
    const end = filters.endDate.toLocaleDateString('pt-BR');
    activeFilters.push({
      key: 'startDate',
      label: `Período: ${start} - ${end}`,
    });
  }

  return activeFilters;
};
