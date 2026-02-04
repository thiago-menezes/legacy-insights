import { ProjectCreateInput } from '@/libs/api/services/projects';

export interface ProjectFormProps {
  initialValues?: Partial<ProjectCreateInput>;
  onSubmit: (values: ProjectCreateInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  workspaceId: string;
  existingSlugs?: string[];
}

export interface UseProjectParams {
  workspaceId?: string;
  id?: string;
  slug?: string;
  existingSlugs?: string[];
}
