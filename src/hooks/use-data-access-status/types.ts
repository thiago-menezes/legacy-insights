export type DataAccessState =
  | 'loading'
  | 'no-workspace'
  | 'no-project'
  | 'no-integration'
  | 'no-data'
  | 'ready';

export interface DataAccessStatus {
  state: DataAccessState;
  isLoading: boolean;
  hasWorkspaces: boolean;
  hasProjects: boolean;
  hasIntegration: boolean;
  hasData: boolean;
  integrationsPageUrl: string;
  projectsPageUrl: string;
}

export interface UseDataAccessStatusOptions {
  integrationType?: 'meta_ads' | 'google_ads';
  checkData?: boolean;
  hasData?: boolean;
}
