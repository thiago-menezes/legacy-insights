/**
 * Get default date range for Hotmart sync (last 90 days)
 */
export const getDefaultDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

/**
 * Format sync stats for display
 */
export const formatSyncStats = (stats: {
  created: number;
  updated: number;
  errors: number;
}): string => {
  const parts = [];

  if (stats.created > 0) {
    parts.push(`${stats.created} nova${stats.created !== 1 ? 's' : ''}`);
  }

  if (stats.updated > 0) {
    parts.push(`${stats.updated} atualizada${stats.updated !== 1 ? 's' : ''}`);
  }

  if (stats.errors > 0) {
    parts.push(`${stats.errors} erro${stats.errors !== 1 ? 's' : ''}`);
  }

  return parts.length > 0 ? parts.join(', ') : 'Nenhuma alteração';
};
