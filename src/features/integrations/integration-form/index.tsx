'use client';

import { Button, FormControl, Select, TextField, View } from 'reshaped';
import {
  IntegrationCreateInput,
  IntegrationType,
} from '@/libs/api/services/integrations';
import { INTEGRATION_TYPES } from '../constants';
import { GoogleAdsFields } from './google-ads-fields';
import { useIntegrationFormState } from './hooks';
import { MetaAdsFields } from './meta-ads-fields';
import { IntegrationFormProps } from './types';

export const IntegrationForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading,
  projectId,
}: IntegrationFormProps) => {
  const {
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
  } = useIntegrationFormState({ initialValues, projectId });

  const handleFormSubmit = (values: IntegrationCreateInput) => {
    const payload = { ...values };

    if (payload.config) {
      if (typeValue === 'meta_ads') {
        payload.config.adAccountIds = adAccountIdsRaw
          .split(',')
          .map((id) => id.trim())
          .filter(Boolean);
      } else if (typeValue === 'google_ads') {
        payload.config.customerIds = customerIdsRaw
          .split(',')
          .map((id) => id.trim())
          .filter(Boolean);
      }
    }

    if (isEditMode) {
      if (!accessTokenTouched || payload.accessToken === '••••••••••••••••') {
        delete payload.accessToken;
      }
      if (!refreshTokenTouched || payload.refreshToken === '••••••••••••••••') {
        delete payload.refreshToken;
      }
      if (!clientSecretTouched) {
        if (payload.config) {
          delete payload.config.clientSecret;
        }
      }
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <View gap={4} paddingTop={4}>
        <FormControl>
          <FormControl.Label>Nome da Integração</FormControl.Label>
          <TextField
            placeholder="Ex: Minha Conta de Anúncios"
            name="name"
            value={watch('name') || ''}
            onChange={(e) => setValue('name', e.value)}
            disabled={isEditMode}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Tipo de Integração</FormControl.Label>
          <Select
            name="type"
            options={INTEGRATION_TYPES}
            value={typeValue}
            onChange={(e) => setValue('type', e.value as IntegrationType)}
            disabled={isEditMode}
          />
        </FormControl>

        {typeValue === 'meta_ads' && (
          <MetaAdsFields
            watch={watch}
            setValue={setValue}
            isEditMode={isEditMode}
            currentAccessToken={currentAccessToken}
            accessTokenTouched={accessTokenTouched}
            adAccountIdsRaw={adAccountIdsRaw}
            setAccessTokenTouched={setAccessTokenTouched}
            setAdAccountIdsRaw={setAdAccountIdsRaw}
            handleAccessTokenChange={handleAccessTokenChange}
          />
        )}

        {typeValue === 'google_ads' && (
          <GoogleAdsFields
            watch={watch}
            setValue={setValue}
            isEditMode={isEditMode}
            currentRefreshToken={currentRefreshToken}
            refreshTokenTouched={refreshTokenTouched}
            clientSecretTouched={clientSecretTouched}
            customerIdsRaw={customerIdsRaw}
            setRefreshTokenTouched={setRefreshTokenTouched}
            setClientSecretTouched={setClientSecretTouched}
            setCustomerIdsRaw={setCustomerIdsRaw}
            handleRefreshTokenChange={handleRefreshTokenChange}
            handleClientSecretChange={handleClientSecretChange}
          />
        )}

        <View direction="row" gap={3} justify="end" paddingTop={4}>
          <Button variant="outline" onClick={onCancel} disabled={!!isLoading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            loading={!!isLoading}
            disabled={!!isLoading || !hasChanges}
          >
            {isEditMode ? 'Atualizar Token' : 'Conectar'}
          </Button>
        </View>
      </View>
    </form>
  );
};
