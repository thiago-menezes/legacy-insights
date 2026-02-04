import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  IntegrationCreateInput,
  StrapiIntegration,
} from '@/libs/api/services/integrations';
import { MASKED_TOKEN } from './constants';
import { IntegrationFormProps } from './types';

export const useIntegrationFormState = ({
  initialValues,
  projectId,
}: Pick<IntegrationFormProps, 'initialValues' | 'projectId'>) => {
  const isEditMode = initialValues && 'documentId' in initialValues;

  const [accessTokenTouched, setAccessTokenTouched] = useState(false);
  const [refreshTokenTouched, setRefreshTokenTouched] = useState(false);
  const [clientSecretTouched, setClientSecretTouched] = useState(false);
  const [adAccountIdsRaw, setAdAccountIdsRaw] = useState('');
  const [customerIdsRaw, setCustomerIdsRaw] = useState('');

  const { handleSubmit, setValue, watch, reset } =
    useForm<IntegrationCreateInput>({
      defaultValues: {
        name: initialValues?.name || '',
        type: initialValues?.type || 'meta_ads',
        project: projectId,
        status: (initialValues as StrapiIntegration)?.status || 'disconnected',
        config: (initialValues as StrapiIntegration)?.config || {},
      },
    });

  useEffect(() => {
    if (initialValues) {
      const isStrapi = 'documentId' in initialValues;
      const strapiData = initialValues as StrapiIntegration;
      const createData = initialValues as IntegrationCreateInput;
      const config = strapiData?.config || createData?.config;

      reset({
        name: initialValues?.name || '',
        type: initialValues?.type || 'meta_ads',
        project: isStrapi
          ? strapiData.project?.documentId || projectId
          : createData.project || projectId,
        status: strapiData?.status || 'disconnected',
        accessToken: isStrapi ? MASKED_TOKEN : createData.accessToken || '',
        refreshToken: isStrapi ? MASKED_TOKEN : createData.refreshToken || '',
        config: strapiData?.config || {},
      });

      setAdAccountIdsRaw((config?.adAccountIds as string[])?.join(', ') || '');
      setCustomerIdsRaw((config?.customerIds as string[])?.join(', ') || '');

      setAccessTokenTouched(false);
      setRefreshTokenTouched(false);
      setClientSecretTouched(false);
    }
  }, [initialValues, reset, projectId]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const typeValue = watch('type');
  const currentAccessToken = watch('accessToken');
  const currentRefreshToken = watch('refreshToken');

  const hasChanges = useMemo(() => {
    if (!isEditMode) return true;

    const accessTokenChanged =
      accessTokenTouched && currentAccessToken !== MASKED_TOKEN;
    const refreshTokenChanged =
      refreshTokenTouched && currentRefreshToken !== MASKED_TOKEN;
    const clientSecretChanged = clientSecretTouched;

    return accessTokenChanged || refreshTokenChanged || clientSecretChanged;
  }, [
    isEditMode,
    currentAccessToken,
    currentRefreshToken,
    accessTokenTouched,
    refreshTokenTouched,
    clientSecretTouched,
  ]);

  const handleAccessTokenChange = (value: string) => {
    if (!accessTokenTouched) {
      setAccessTokenTouched(true);
      setValue('accessToken', value === MASKED_TOKEN ? '' : value);
    } else {
      setValue('accessToken', value);
    }
  };

  const handleRefreshTokenChange = (value: string) => {
    if (!refreshTokenTouched) {
      setRefreshTokenTouched(true);
      setValue('refreshToken', value === MASKED_TOKEN ? '' : value);
    } else {
      setValue('refreshToken', value);
    }
  };

  const handleClientSecretChange = (value: string) => {
    if (!clientSecretTouched) {
      setClientSecretTouched(true);
      setValue('config.clientSecret', value === MASKED_TOKEN ? '' : value);
    } else {
      setValue('config.clientSecret', value);
    }
  };

  return {
    isEditMode,
    accessTokenTouched,
    refreshTokenTouched,
    clientSecretTouched,
    adAccountIdsRaw,
    customerIdsRaw,
    typeValue,
    currentAccessToken,
    currentRefreshToken,
    hasChanges,
    handleSubmit,
    setValue,
    watch,
    setAccessTokenTouched,
    setRefreshTokenTouched,
    setClientSecretTouched,
    setAdAccountIdsRaw,
    setCustomerIdsRaw,
    handleAccessTokenChange,
    handleRefreshTokenChange,
    handleClientSecretChange,
  };
};
