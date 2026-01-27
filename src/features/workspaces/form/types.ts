import { WorkspaceFormValues } from '../types';

export interface WorkspaceFormProps {
  initialValues?: WorkspaceFormValues;
  onSubmit: (values: WorkspaceFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isModalActive?: boolean;
}
