import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateWorkspacePayload,
  workspacesService,
} from '@/libs/api/services/workspaces';
import { UpdateWorkspaceParams } from './types';

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateWorkspacePayload) =>
      workspacesService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', 'list'] });
    },
  });
};

export const useUpdateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, params }: UpdateWorkspaceParams) =>
      workspacesService.update(id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', 'list'] });
    },
  });
};

export const useDeleteWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspacesService.deleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', 'list'] });
    },
  });
};
