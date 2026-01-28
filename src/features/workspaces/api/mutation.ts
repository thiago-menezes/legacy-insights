import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  workspacesService,
  CreateWorkspacePayload,
} from '@/libs/api/services/workspaces';
import { UpdateWorkspaceParams } from './types';

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateWorkspacePayload) =>
      workspacesService.create(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: workspacesService.keys('list', params),
      });
    },
  });
};

export const useUpdateWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, params }: UpdateWorkspaceParams) =>
      workspacesService.update(id, params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: workspacesService.keys('list', params),
      });
    },
  });
};

export const useDeleteWorkspaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspacesService.delete(id),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: workspacesService.keys('list', params),
      });
    },
  });
};
