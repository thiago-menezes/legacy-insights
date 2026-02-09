import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { webhookSchema, WebhookFormData } from './schema';
import { IntegrationFormProps } from '../../types';
import { StrapiIntegration } from '@/libs/api/services/integrations';

export const useWebhookForm = ({
  initialValues,
  projectId,
  onSubmit,
}: IntegrationFormProps) => {
  const isEditMode = !!(initialValues && 'documentId' in initialValues);

  const getWebhookType = (): WebhookFormData['type'] => {
    const type = initialValues?.type;
    if (type === 'kiwify' || type === 'kirvano' || type === 'custom_webhook') {
      return type;
    }
    return 'custom_webhook';
  };

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<WebhookFormData>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      name: initialValues?.name || '',
      type: getWebhookType(),
      project: projectId,
      status: (initialValues as StrapiIntegration)?.status || 'disconnected',
      config: (initialValues as StrapiIntegration)?.config || {},
    },
    mode: 'onChange',
  });

  return {
    form: {
      handleSubmit,
      setValue,
      watch,
      control,
      errors,
      isValid,
      isEditMode,
      isDirty,
    },
    actions: {
      onSubmit,
    },
  };
};
