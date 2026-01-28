import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/libs/api/axios';
import { WorkspaceRole } from '@/libs/api/services/workspaces/types';

export const useUpdateMemberRole = (workspaceId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberId,
      role,
    }: {
      memberId: number;
      role: WorkspaceRole;
    }) => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      await apiClient.put(
        `/api/workspaces/${workspaceId}/members/${memberId}`,
        {
          role,
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspace-members', workspaceId],
      });
    },
  });
};

export const useRemoveMember = (workspaceId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: number) => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      await apiClient.delete(
        `/api/workspaces/${workspaceId}/members/${memberId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspace-members', workspaceId],
      });
    },
  });
};

export const useInviteMember = (workspaceId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      role,
    }: {
      email: string;
      role: WorkspaceRole;
    }) => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      await apiClient.post(`/api/workspaces/${workspaceId}/invite`, {
        email,
        role,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspace-members', workspaceId],
      });
    },
  });
};
