import { ProjectCreateInput } from '@/libs/api/services/projects';

export interface UpdateProjectParams {
  id: string;
  params: Partial<ProjectCreateInput>;
}
