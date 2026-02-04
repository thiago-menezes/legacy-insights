import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectCreateInput } from '@/libs/api/services/projects';
import { ProjectFormProps } from '../types';
import { isApiError } from '@/libs/api/axios';

export const useProjectForm = ({
  initialValues,
  workspaceId,
  onSubmit,
}: Pick<ProjectFormProps, 'initialValues' | 'workspaceId' | 'onSubmit'>) => {
  const [isSlugManual, setIsSlugManual] = useState(false);
  const { register, handleSubmit, setValue, watch, setError, formState } =
    useForm<ProjectCreateInput>({
      defaultValues: {
        name: initialValues?.name || '',
        slug: initialValues?.slug || '',
        description: initialValues?.description || '',
        workspace: workspaceId,
      },
    });

  const handleNameChange = (value: string) => {
    setValue('name', value);
    if (!initialValues?.slug && !isSlugManual) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  };

  const handleInternalSubmit = async (data: ProjectCreateInput) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (isApiError(error)) {
        const errorMessage = error.response?.data?.error?.message;
        const isUniqueError =
          errorMessage === 'This attribute must be unique' ||
          error.response?.data?.error?.name === 'ValidationError' ||
          error.status === 409 ||
          error.response?.status === 409;

        if (isUniqueError) {
          setError('slug', {
            type: 'manual',
            message:
              'Já existe um projeto com este Identificador. Por favor, escolha outro.',
          });
        }
      }
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    handleNameChange,
    watch,
    setIsSlugManual,
    formState,
    handleInternalSubmit,
  };
};
