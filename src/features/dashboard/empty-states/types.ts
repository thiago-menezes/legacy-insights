export interface DashboardEmptyStateProps {
  state: 'no-project' | 'no-integration' | 'no-data';
  projectsPageUrl: string;
  integrationsPageUrl: string;
}
