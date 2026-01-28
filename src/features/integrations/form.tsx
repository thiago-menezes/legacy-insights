import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, View, Select, FormControl } from 'reshaped';
import {
  IntegrationCreateInput,
  IntegrationType,
  StrapiIntegration,
} from '@/libs/api/services/integrations';
import { INTEGRATION_TYPES } from './constants';
import { IntegrationFormProps } from './types';

export const IntegrationForm = ({
  initialValues,
  onSubmit,
  onCancel,
  isLoading,
  projectId,
}: IntegrationFormProps) => {
  const { register, handleSubmit, setValue, watch, reset } =
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
      reset({
        name: initialValues?.name || '',
        type: initialValues?.type || 'meta_ads',
        project: isStrapi
          ? (initialValues as StrapiIntegration).project?.documentId ||
            projectId
          : (initialValues as IntegrationCreateInput).project || projectId,
        status: (initialValues as StrapiIntegration)?.status || 'disconnected',
        config: (initialValues as StrapiIntegration)?.config || {},
      });
    }
  }, [initialValues, reset, projectId]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const typeValue = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View gap={4} paddingTop={4}>
        <FormControl>
          <FormControl.Label>Nome da Integração</FormControl.Label>
          <TextField
            placeholder="Ex: Minha Conta de Anúncios"
            {...register('name', { required: true })}
            onChange={(e) => setValue('name', e.value)}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Tipo de Integração</FormControl.Label>
          <Select
            name="type"
            options={INTEGRATION_TYPES}
            value={typeValue}
            onChange={(e) => setValue('type', e.value as IntegrationType)}
          />
        </FormControl>

        {typeValue === 'meta_ads' && (
          <View gap={4}>
            <FormControl>
              <FormControl.Label>Access Token</FormControl.Label>
              <TextField
                placeholder="EAAL..."
                {...register('accessToken', { required: true })}
                onChange={(e) => setValue('accessToken', e.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>App ID</FormControl.Label>
              <TextField
                placeholder="Ex: 8290..."
                {...register('config.appId', { required: true })}
                onChange={(e) => setValue('config.appId', e.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                Ad Account IDs (Separados por vírgula)
              </FormControl.Label>
              <TextField
                name="config.adAccountIds"
                placeholder="Ex: act_123, act_456"
                value={watch('config.adAccountIds')?.join(', ')}
                onChange={(e) => {
                  const ids = e.value
                    .split(',')
                    .map((id) => id.trim())
                    .filter(Boolean);
                  setValue('config.adAccountIds', ids);
                }}
              />
            </FormControl>
          </View>
        )}

        {typeValue === 'google_ads' && (
          <View gap={4}>
            <FormControl>
              <FormControl.Label>Client ID</FormControl.Label>
              <TextField
                placeholder="Ex: 8761..."
                {...register('config.clientId', { required: true })}
                onChange={(e) => setValue('config.clientId', e.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Client Secret</FormControl.Label>
              <TextField
                placeholder="Ex: GOCSPX-..."
                {...register('config.clientSecret', { required: true })}
                onChange={(e) => setValue('config.clientSecret', e.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Refresh Token</FormControl.Label>
              <TextField
                placeholder="Ex: 1//0..."
                {...register('refreshToken', { required: true })}
                onChange={(e) => setValue('refreshToken', e.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Developer Token</FormControl.Label>
              <TextField
                placeholder="Ex: DvD3..."
                {...register('config.developerToken', { required: true })}
                onChange={(e) => setValue('config.developerToken', e.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                Customer IDs (Separados por vírgula)
              </FormControl.Label>
              <TextField
                name="config.customerIds"
                placeholder="Ex: 5559111179, 6421607101"
                value={watch('config.customerIds')?.join(', ')}
                onChange={(e) => {
                  const ids = e.value
                    .split(',')
                    .map((id) => id.trim())
                    .filter(Boolean);
                  setValue('config.customerIds', ids);
                }}
              />
            </FormControl>
          </View>
        )}

        <View direction="row" gap={3} justify="end" paddingTop={4}>
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            {initialValues?.name ? 'Salvar Alterações' : 'Conectar'}
          </Button>
        </View>
      </View>
    </form>
  );
};
