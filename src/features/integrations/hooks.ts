import { useState, useMemo } from 'react';
import {
  IntegrationCreateInput,
  IntegrationType,
  StrapiIntegration,
} from '@/libs/api/services/integrations';
import {
  useCreateIntegrationMutation,
  useDeleteIntegrationMutation,
  useUpdateIntegrationMutation,
  useValidateIntegrationMutation,
  useProcessIntegrationMutation,
} from './api/mutation';
import { useIntegrationsQuery } from './api/query';
import { PLATFORM_METADATA } from './constants';

export const useIntegrations = (projectId?: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<IntegrationType>('meta_ads');
  const [editingIntegration, setEditingIntegration] = useState<
    StrapiIntegration | undefined
  >(undefined);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [integrationToDelete, setIntegrationToDelete] = useState<
    | {
        id: string;
        name: string;
      }
    | undefined
  >(undefined);

  const { data: integrationsData, isLoading } = useIntegrationsQuery(projectId);

  const createMutation = useCreateIntegrationMutation(projectId);
  const updateMutation = useUpdateIntegrationMutation(projectId);
  const deleteMutation = useDeleteIntegrationMutation(projectId);
  const validateMutation = useValidateIntegrationMutation(projectId);
  const processMutation = useProcessIntegrationMutation(projectId);

  const integrations = useMemo(
    () => integrationsData?.data || [],
    [integrationsData?.data],
  );

  const platforms = useMemo(() => {
    return PLATFORM_METADATA.map((platform) => ({
      ...platform,
      profiles: integrations
        .filter((i) => i.type === platform.id)
        .map((i) => ({
          id: i.documentId,
          name: i.name,
          status: i.status || 'disconnected',
          processStatus: i.processStatus,
          integration: i,
        })),
    }));
  }, [integrations]);

  const handleDeleteClick = (id: string) => {
    const integration = integrations.find((i) => i.documentId === id);
    if (integration) {
      setIntegrationToDelete({
        id: integration.documentId,
        name: integration.name,
      });
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (integrationToDelete) {
      await deleteMutation.mutateAsync(integrationToDelete.id);
      setIsDeleteModalOpen(false);
      setIntegrationToDelete(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setIntegrationToDelete(undefined);
  };

  const handleAdd = (type: IntegrationType) => {
    setEditingIntegration(undefined);
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleEdit = (integration: StrapiIntegration) => {
    setEditingIntegration(integration);
    setSelectedType(integration.type);
    setIsModalOpen(true);
  };

  const handleValidate = async (id: string) => {
    try {
      const result = await validateMutation.mutateAsync(id);
      if (result.valid) {
        alert('Integração validada com sucesso!');
      } else {
        alert(`Erro na validação: ${result.message}`);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Falha ao validar integração.');
    }
  };

  const handleProcess = async (id: string) => {
    try {
      await processMutation.mutateAsync(id);
      alert('Processamento iniciado!');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Falha ao iniciar processamento.');
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingIntegration(undefined);
  };

  return {
    platforms,
    isLoading,
    isModalOpen,
    isDeleteModalOpen,
    selectedType,
    editingIntegration,
    integrationToDelete,
    handleDelete: handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleAdd,
    handleEdit,
    handleValidate,
    handleProcess,
    handleFormSubmit,
    handleModalClose,
  };
};
