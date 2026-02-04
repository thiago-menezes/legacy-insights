import { useState } from 'react';

export const useDeleteModal = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [integrationToDelete, setIntegrationToDelete] = useState<
    | {
        id: string;
        name: string;
      }
    | undefined
  >(undefined);

  const handleDeleteClick = (id: string, name: string) => {
    setIntegrationToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setIntegrationToDelete(undefined);
  };

  return {
    isDeleteModalOpen,
    integrationToDelete,
    handleDeleteClick,
    handleDeleteCancel,
    setIsDeleteModalOpen,
    setIntegrationToDelete,
  };
};
