import { useMutation } from '@tanstack/react-query';
import {
  projectsService,
  ProjectCreateInput,
} from '@/libs/api/services/projects';
import { useProjectsQuery } from './query';
import { UpdateProjectParams } from './types';

export const useCreateProjectMutation = (workspaceId?: string) => {
  const { refetch } = useProjectsQuery(workspaceId);

  return useMutation({
    mutationFn: (params: ProjectCreateInput) => projectsService.create(params),
    onSuccess: () => {
      refetch();
    },
  });
};

export const useUpdateProjectMutation = (workspaceId?: string) => {
  const { refetch } = useProjectsQuery(workspaceId);

  return useMutation({
    mutationFn: ({ id, params }: UpdateProjectParams) =>
      projectsService.update(id, params),
    onSuccess: () => {
      refetch();
    },
  });
};

export const useDeleteProjectMutation = (workspaceId?: string) => {
  const { refetch } = useProjectsQuery(workspaceId);

  return useMutation({
    mutationFn: (id: string) => projectsService.deleteProject(id),
    onSuccess: () => {
      refetch();
    },
  });
};
