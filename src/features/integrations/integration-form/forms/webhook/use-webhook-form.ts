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

    // Direct match for new types
    if (
      type === 'hotmart_webhook' ||
      type === 'kiwify_webhook' ||
      type === 'kirvano_webhook' ||
      type === 'custom_webhook'
    ) {
      return type;
    }

    // Map legacy types or default from category
    if (type === 'kiwify') return 'kiwify_webhook';
    if (type === 'kirvano') return 'kirvano_webhook';
    if (type === 'hotmart') return 'hotmart_webhook';

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
