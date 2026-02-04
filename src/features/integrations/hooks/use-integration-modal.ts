import { useState } from 'react';
import {
  IntegrationType,
  StrapiIntegration,
} from '@/libs/api/services/integrations';

export const useIntegrationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<IntegrationType>('meta_ads');
  const [editingIntegration, setEditingIntegration] = useState<
    StrapiIntegration | undefined
  >(undefined);

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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingIntegration(undefined);
  };

  return {
    isModalOpen,
    selectedType,
    editingIntegration,
    handleAdd,
    handleEdit,
    handleModalClose,
    setIsModalOpen,
    setEditingIntegration,
  };
};
