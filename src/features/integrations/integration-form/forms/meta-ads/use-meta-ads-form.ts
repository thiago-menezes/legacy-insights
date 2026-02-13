import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { metaAdsSchema, MetaAdsFormData } from './schema';
import { IntegrationFormProps } from '../../types';
import {
  StrapiIntegration,
  IntegrationCreateInput,
} from '@/libs/api/services/integrations';
import { MASKED_TOKEN } from '../../constants';

export const useMetaAdsForm = ({
  initialValues,
  projectId,
  onSubmit,
}: IntegrationFormProps) => {
  const isEditMode = !!(initialValues && 'documentId' in initialValues);
  const [accessTokenTouched, setAccessTokenTouched] = useState(false);
  const [adAccountIdsRaw, setAdAccountIdsRaw] = useState('');

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<MetaAdsFormData>({
    resolver: zodResolver(metaAdsSchema),
    defaultValues: {
      name: initialValues?.name || '',
      type: 'meta_ads',
      project: projectId,
      status: (initialValues as StrapiIntegration)?.status || 'disconnected',
      config: (initialValues as StrapiIntegration)?.config || {},
      accessToken: isEditMode ? MASKED_TOKEN : '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialValues) {
      const strapiData = initialValues as StrapiIntegration;
      const config =
        strapiData?.config || (initialValues as IntegrationCreateInput)?.config;

      setAdAccountIdsRaw((config?.adAccountIds as string[])?.join(', ') || '');

      // If in edit mode, ensure token is masked initially
      if (isEditMode) {
        setValue('accessToken', MASKED_TOKEN);
      }
    }
  }, [initialValues, isEditMode, setValue]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const currentAccessToken = watch('accessToken');

  const hasChanges = useMemo(() => {
    if (!isEditMode) return true;
    const accessTokenChanged =
      accessTokenTouched && currentAccessToken !== MASKED_TOKEN;
    return isDirty || accessTokenChanged;
  }, [isEditMode, isDirty, currentAccessToken, accessTokenTouched]);

  const handleAccessTokenChange = (value: string) => {
    if (!accessTokenTouched) {
      setAccessTokenTouched(true);
      setValue('accessToken', value === MASKED_TOKEN ? '' : value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue('accessToken', value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const submitHandler = (data: MetaAdsFormData) => {
    const payload = { ...data };

    // Process adAccountIds
    if (payload.config) {
      payload.config.adAccountIds = adAccountIdsRaw
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    }

    if (isEditMode) {
      if (!accessTokenTouched || payload.accessToken === MASKED_TOKEN) {
        delete payload.accessToken;
      }
    }

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
    },
    state: {
      accessTokenTouched,
      adAccountIdsRaw,
      currentAccessToken,
      hasChanges,
    },
    actions: {
      setAccessTokenTouched,
      setAdAccountIdsRaw,
      handleAccessTokenChange,
      submitHandler,
    },
  };
};
