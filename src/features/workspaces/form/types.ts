import { WorkspaceFormValues } from '../types';

export interface WorkspaceFormProps {
  initialValues?: WorkspaceFormValues;
  onSubmit: (values: WorkspaceFormValues) => void | Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isModalActive?: boolean;
}
