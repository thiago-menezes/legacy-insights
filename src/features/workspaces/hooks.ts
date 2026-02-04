import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from 'reshaped';
import { useAuth } from '@/features/auth/context';
import { Workspace } from '@/libs/api/services/workspaces';
import {
  useCreateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from './api/mutation';
import { useWorkspacesQuery } from './api/query';
import { WorkspaceFormValues } from './types';
import { useQueryClient } from '@tanstack/react-query';
import { isApiError } from '@/libs/api/axios';

export const useWorkspaces = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();

  const createWorkspace = useCreateWorkspaceMutation();
  const updateWorkspace = useUpdateWorkspaceMutation();
  const deleteWorkspace = useDeleteWorkspaceMutation();
  const getWorkspaces = useWorkspacesQuery();

  const error =
    createWorkspace.error ||
    updateWorkspace.error ||
    deleteWorkspace.error ||
    getWorkspaces.error;

  const handleGetWorkspaces = () => getWorkspaces.refetch();

  const [isModalActive, setIsModalActive] = useState(false);

  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(
    null,
  );

  const [isSwitchModalActive, setIsSwitchModalActive] = useState(false);
  const [pendingWorkspace, setPendingWorkspace] = useState<Workspace | null>(
    null,
  );

  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(
    null,
  );

  const router = useRouter();

  const handleOpenCreate = () => {
    setEditingWorkspace(null);
    setIsModalActive(true);
  };

  const handleOpenEdit = (workspace: Workspace) => {
    setEditingWorkspace(workspace);
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setEditingWorkspace(null);
  };

  const handleSubmit = async (values: WorkspaceFormValues) => {
    if (editingWorkspace) {
      await updateWorkspace.mutateAsync(
        {
          id: editingWorkspace.documentId,
          params: values,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['workspaces', 'list'],
            });
            toast.show({
              title: 'Workspace atualizado',
              text: 'As alterações foram salvas com sucesso.',
              color: 'positive',
            });
            handleCloseModal();
          },
          onError: (error) => {
            if (isApiError(error)) {
              const errorMessage = error?.response?.data?.error?.message;
              const isUniqueError =
                errorMessage === 'This attribute must be unique' ||
                error?.response?.data?.error?.name === 'ValidationError' ||
                error?.status === 409 ||
                error?.response?.status === 409;

              if (isUniqueError) {
                throw error;
              } else {
                toast.show({
                  title: 'Erro ao atualizar workspace',
                  text: 'Ocorreu um erro ao salvar as alterações.',
                  color: 'critical',
                });
              }
            }
          },
        },
      );
    } else {
      if (user?.id) {
        await createWorkspace.mutateAsync(
          {
            ...values,
            owner: user.id,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['workspaces', 'list'],
              });
              toast.show({
                title: 'Workspace criado',
                text: 'Seu workspace foi criado com sucesso.',
                color: 'positive',
              });
              handleCloseModal();
            },
            onError: (error) => {
              const errorMessage = error.response?.data?.error?.message;
              const isUniqueError =
                errorMessage === 'This attribute must be unique' ||
                error.response?.data?.error?.name === 'ValidationError' ||
                error.status === 409 ||
                error.response?.status === 409;

              if (isUniqueError) {
                throw error;
              } else {
                toast.show({
                  title: 'Erro ao criar workspace',
                  text: 'Ocorreu um erro inesperado ao criar o workspace.',
                  color: 'critical',
                });
              }
            },
          },
        );
      }
    }
  };

  const handleDelete = (workspace: Workspace) => {
    setWorkspaceToDelete(workspace);
    setIsDeleteModalActive(true);
  };

  const handleConfirmDelete = () => {
    if (workspaceToDelete) {
      deleteWorkspace.mutate(workspaceToDelete.documentId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['workspaces', 'list'] });
          toast.show({
            title: 'Workspace excluído',
            text: 'O workspace foi removido com sucesso.',
            color: 'positive',
          });
          handleCloseModal();
          setIsDeleteModalActive(false);
          setWorkspaceToDelete(null);
        },
        onError: () => {
          toast.show({
            title: 'Erro ao excluir workspace',
            text: 'Ocorreu um erro ao tentar excluir o workspace.',
            color: 'critical',
          });
        },
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalActive(false);
    setWorkspaceToDelete(null);
  };

  const handleWorkspaceClick = (
    workspace: Workspace,
    currentWorkspaceId?: string,
  ) => {
    if (workspace.documentId !== currentWorkspaceId) {
      setPendingWorkspace(workspace);
      setIsSwitchModalActive(true);
    } else {
      router.push(`/workspaces/${workspace.slug}`);
    }
  };

  const handleConfirmSwitch = (
    selectWorkspace: (orgId: string, projectId: string) => void,
  ) => {
    if (pendingWorkspace) {
      selectWorkspace(
        pendingWorkspace.documentId,
        String(pendingWorkspace.projects?.[0]?.id || ''),
      );
      router.push(`/workspaces/${pendingWorkspace.slug}`);
      setIsSwitchModalActive(false);
      setPendingWorkspace(null);
    }
  };

  const handleCloseSwitchModal = () => {
    setIsSwitchModalActive(false);
    setPendingWorkspace(null);
  };

  return {
    handleGetWorkspaces,
    workspaces: getWorkspaces.data || { data: [] },
    error,
    isLoading:
      getWorkspaces.isLoading ||
      updateWorkspace.isPending ||
      createWorkspace.isPending ||
      deleteWorkspace.isPending,
    isModalActive,
    editingWorkspace,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleSubmit,
    handleDelete,
    isDeleteModalActive,
    workspaceToDelete,
    handleConfirmDelete,
    handleCloseDeleteModal,
    isSwitchModalActive,
    pendingWorkspace,
    handleWorkspaceClick,
    handleConfirmSwitch,
    handleCloseSwitchModal,
  };
};
