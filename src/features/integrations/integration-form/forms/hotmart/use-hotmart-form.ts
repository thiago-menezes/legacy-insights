import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotmartSchema, HotmartFormData } from './schema';
import { IntegrationFormProps } from '../../types';
import {
  StrapiIntegration,
  IntegrationCreateInput,
} from '@/libs/api/services/integrations';
import { parseHotmartCredentials } from './utils';

export const useHotmartForm = ({
  initialValues,
  projectId,
  onSubmit,
}: IntegrationFormProps) => {
  const isEditMode = !!(initialValues && 'documentId' in initialValues);

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid, touchedFields },
  } = useForm<HotmartFormData>({
    resolver: zodResolver(hotmartSchema),
    defaultValues: {
      name: initialValues?.name || '',
      type: initialValues?.type === 'hotmart' ? 'hotmart' : 'hotmart_sales',
      project: projectId,
      status: (initialValues as StrapiIntegration)?.status || 'disconnected',
      config: (initialValues as StrapiIntegration)?.config || {},
      accessToken: (initialValues as IntegrationCreateInput)?.accessToken || '',
      hotmartCredentials: '',
    },
    mode: 'onChange',
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const hotmartCredentials = watch('hotmartCredentials');

  useEffect(() => {
    if (hotmartCredentials) {
      const parsed = parseHotmartCredentials(hotmartCredentials);
      if (parsed) {
        setValue('accessToken', parsed.basicToken, { shouldDirty: true });
        setValue('config.clientId', parsed.clientId, { shouldDirty: true });
        setValue('config.clientSecret', parsed.clientSecret, {
          shouldDirty: true,
        });
      }
    }
  }, [hotmartCredentials, setValue]);

  const submitHandler = (data: HotmartFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hotmartCredentials: _, ...payload } = data;
    onSubmit(payload as IntegrationCreateInput);
  };

  return {
    form: {
      handleSubmit,
      setValue,
      watch,
      control,
      errors,
      isValid,
      isEditMode,
      touchedFields,
    },
    state: {
      hotmartCredentials,
    },
    actions: {
      submitHandler,
    },
  };
};
