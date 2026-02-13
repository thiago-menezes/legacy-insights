import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { googleAdsSchema, GoogleAdsFormData } from './schema';
import { IntegrationFormProps } from '../../types';
import {
  StrapiIntegration,
  IntegrationCreateInput,
} from '@/libs/api/services/integrations';
import { MASKED_TOKEN } from '../../constants';

export const useGoogleAdsForm = ({
  initialValues,
  projectId,
  onSubmit,
}: IntegrationFormProps) => {
  const isEditMode = !!(initialValues && 'documentId' in initialValues);

  const [refreshTokenTouched, setRefreshTokenTouched] = useState(false);
  const [clientSecretTouched, setClientSecretTouched] = useState(false);
  const [customerIdsRaw, setCustomerIdsRaw] = useState('');

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<GoogleAdsFormData>({
    resolver: zodResolver(googleAdsSchema),
    defaultValues: {
      name: initialValues?.name || '',
      type: 'google_ads',
      project: projectId,
      status: (initialValues as StrapiIntegration)?.status || 'disconnected',
      config: (initialValues as StrapiIntegration)?.config || {},
      refreshToken: isEditMode ? MASKED_TOKEN : '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialValues) {
      const strapiData = initialValues as StrapiIntegration;
      const config =
        strapiData?.config || (initialValues as IntegrationCreateInput)?.config;

      setCustomerIdsRaw((config?.customerIds as string[])?.join(', ') || '');

      if (isEditMode) {
        setValue('refreshToken', MASKED_TOKEN);
        // Client Secret is inside config, handle separately if needed, but schema handles it via config object.
        // However, the original code treated clientSecret specially for masking.
        // Let's ensure we handle masking for clientSecret if it's in config.
        // Actually, react-hook-form defaultValues 'config' handles deep merge?
        // Let's manually set client secret to masked if needed, but 'config' from initialValues might have the real secret.
        // We should mask it in the form state.
        setValue('config.clientSecret', MASKED_TOKEN);
      }
    }
  }, [initialValues, isEditMode, setValue]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const currentRefreshToken = watch('refreshToken');

  const currentClientSecret = watch('config.clientSecret');

  const hasChanges = useMemo(() => {
    if (!isEditMode) return true;

    const refreshTokenChanged =
      refreshTokenTouched && currentRefreshToken !== MASKED_TOKEN;
    const clientSecretChanged =
      clientSecretTouched && currentClientSecret !== MASKED_TOKEN;

    return isDirty || refreshTokenChanged || clientSecretChanged;
  }, [
    isEditMode,
    isDirty,
    currentRefreshToken,
    refreshTokenTouched,
    currentClientSecret,
    clientSecretTouched,
  ]);

  const handleRefreshTokenChange = (value: string) => {
    if (!refreshTokenTouched) {
      setRefreshTokenTouched(true);
      setValue('refreshToken', value === MASKED_TOKEN ? '' : value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue('refreshToken', value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const handleClientSecretChange = (value: string) => {
    if (!clientSecretTouched) {
      setClientSecretTouched(true);
      setValue('config.clientSecret', value === MASKED_TOKEN ? '' : value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue('config.clientSecret', value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const submitHandler = (data: GoogleAdsFormData) => {
    const payload = { ...data };

    if (payload.config) {
      payload.config.customerIds = customerIdsRaw
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    }

    if (isEditMode) {
      if (!refreshTokenTouched || payload.refreshToken === MASKED_TOKEN) {
        delete payload.refreshToken;
      }
      if (!clientSecretTouched && payload.config) {
        // If client secret wasn't touched, remove it from payload to avoid sending masked token?
        // Or if it is masked, remove it.
        if (payload.config.clientSecret === MASKED_TOKEN) {
          delete payload.config.clientSecret;
        }
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
      refreshTokenTouched,
      clientSecretTouched,
      customerIdsRaw,
      currentRefreshToken,
      hasChanges,
    },
    actions: {
      setRefreshTokenTouched,
      setClientSecretTouched,
      setCustomerIdsRaw,
      handleRefreshTokenChange,
      handleClientSecretChange,
      submitHandler,
    },
  };
};
