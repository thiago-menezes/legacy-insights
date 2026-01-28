export interface CampaignsEmptyStateProps {
  state: 'no-project' | 'no-integration' | 'no-data';
  platform: 'meta' | 'google';
  projectsPageUrl: string;
  integrationsPageUrl: string;
}
