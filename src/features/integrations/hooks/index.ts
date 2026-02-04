import { IntegrationCreateInput } from '@/libs/api/services/integrations';
import { useUserRole } from '../../workspaces/use-user-role';
import { useDeleteModal } from './use-delete-modal';
import { useIntegrationModal } from './use-integration-modal';
import { useIntegrationsData } from './use-integrations-data';

export const useIntegrations = (projectId?: string) => {
  const {
    integrations,
    platforms,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
    processMutation,
    show,
  } = useIntegrationsData(projectId);

  const {
    isModalOpen,
    selectedType,
    editingIntegration,
    handleAdd,
    handleEdit,
    handleModalClose,
    setIsModalOpen,
    setEditingIntegration,
  } = useIntegrationModal();

  const {
    isDeleteModalOpen,
    integrationToDelete,
    handleDeleteClick,
    handleDeleteCancel,
    setIsDeleteModalOpen,
    setIntegrationToDelete,
  } = useDeleteModal();

  const { canCreateIntegration } = useUserRole();

  const handleDelete = (id: string) => {
    const integration = integrations.find((i) => i.documentId === id);
    if (integration) {
      handleDeleteClick(integration.documentId, integration.name);
    }
  };

  const handleDeleteConfirm = async () => {
    if (integrationToDelete) {
      await deleteMutation.mutateAsync(integrationToDelete.id);
      setIsDeleteModalOpen(false);
      setIntegrationToDelete(undefined);
    }
  };

  const handleProcess = async (id: string) => {
    try {
      await processMutation.mutateAsync(id);
      show({
        title: 'Processamento',
        text: 'O Processamento foi iniciado com sucesso. Aguarde o término do processamento para continuar!',
        color: 'neutral',
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      show({
        title: 'Erro',
        text: 'Falha ao iniciar processamento.',
        color: 'critical',
      });
    }
  };

  const handleFormSubmit = async (values: IntegrationCreateInput) => {
    try {
      if (editingIntegration) {
        await updateMutation.mutateAsync({
          id: editingIntegration.documentId,
          data: values,
        });
      } else {
        await createMutation.mutateAsync({
          ...values,
          project: projectId as string,
        });
      }
      setIsModalOpen(false);
      setEditingIntegration(undefined);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return {
    platforms,
    isLoading,
    isModalOpen,
    isDeleteModalOpen,
    selectedType,
    editingIntegration,
    integrationToDelete,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleAdd,
    handleEdit,
    handleProcess,
    handleFormSubmit,
    handleModalClose,
    canCreateIntegration,
  };
};
