import { ProjectCreateInput } from '@/libs/api/services/projects';

export interface ProjectFormProps {
  initialValues?: Partial<ProjectCreateInput>;
  onSubmit: (values: ProjectCreateInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
  workspaceId: string;
}
