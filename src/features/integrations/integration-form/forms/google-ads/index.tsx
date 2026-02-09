import { Button, FormControl, Text, TextField, View } from 'reshaped';
import { useGoogleAdsForm } from './use-google-ads-form';
import { IntegrationFormProps } from '../../types';
import { MASKED_TOKEN } from '../../constants';

export const GoogleAdsForm = (props: IntegrationFormProps) => {
  const { form, state, actions } = useGoogleAdsForm(props);
  const { isEditMode, errors } = form;
  const {
    refreshTokenTouched,
    clientSecretTouched,
    customerIdsRaw,
    currentRefreshToken,
    hasChanges,
  } = state;
  const {
    handleRefreshTokenChange,
    handleClientSecretChange,
    setRefreshTokenTouched,
    setClientSecretTouched,
    setCustomerIdsRaw,
    submitHandler,
  } = actions;

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <View gap={4} paddingTop={4}>
        <FormControl hasError={!!errors.name}>
          <FormControl.Label>Nome da Integração</FormControl.Label>
          <TextField
            placeholder="Ex: Minha Conta Google Ads"
            name="name"
            value={form.watch('name')}
            onChange={(e) => {
              form.setValue('name', e.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            disabled={isEditMode}
          />
          {errors.name && (
            <FormControl.Error>{errors.name.message}</FormControl.Error>
          )}
        </FormControl>

        <View padding={3} borderRadius="medium" backgroundColor="neutral-faded">
          <Text variant="body-2" weight="medium">
            Google Ads
          </Text>
        </View>

        <View gap={4}>
          <FormControl>
            <FormControl.Label>Client ID</FormControl.Label>
            <TextField
              placeholder="Ex: 8761..."
              name="config.clientId"
              value={(form.watch('config.clientId') as string) || ''}
              onChange={(e) => form.setValue('config.clientId', e.value)}
              disabled={isEditMode}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Client Secret</FormControl.Label>
            <TextField
              placeholder="Ex: GOCSPX-..."
              name="config.clientSecret"
              value={
                isEditMode && !clientSecretTouched
                  ? MASKED_TOKEN
                  : (form.watch('config.clientSecret') as string) || ''
              }
              onChange={(e) => handleClientSecretChange(e.value)}
              onFocus={() => {
                if (isEditMode && !clientSecretTouched) {
                  setClientSecretTouched(true);
                  form.setValue('config.clientSecret', '');
                }
              }}
            />
            {isEditMode && !clientSecretTouched && (
              <FormControl.Helper>
                Clique no campo para inserir um novo secret
              </FormControl.Helper>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Refresh Token</FormControl.Label>
            <TextField
              placeholder="Ex: 1//0..."
              name="refreshToken"
              value={currentRefreshToken || ''}
              onChange={(e) => handleRefreshTokenChange(e.value)}
              onFocus={() => {
                if (isEditMode && !refreshTokenTouched) {
                  setRefreshTokenTouched(true);
                  form.setValue('refreshToken', '');
                }
              }}
            />
            {isEditMode && !refreshTokenTouched && (
              <FormControl.Helper>
                Clique no campo para inserir um novo token
              </FormControl.Helper>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Developer Token</FormControl.Label>
            <TextField
              placeholder="Ex: DvD3..."
              name="config.developerToken"
              value={(form.watch('config.developerToken') as string) || ''}
              onChange={(e) => form.setValue('config.developerToken', e.value)}
              disabled={isEditMode}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              Customer IDs (Separados por vírgula)
            </FormControl.Label>
            <TextField
              name="config.customerIds"
              placeholder="Ex: 5559111179, 6421607101"
              value={customerIdsRaw}
              onChange={(e) => setCustomerIdsRaw(e.value)}
              disabled={isEditMode}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Login Customer ID (MCC)</FormControl.Label>
            <TextField
              placeholder="Ex: 3127..."
              name="config.loginCustomerId"
              value={(form.watch('config.loginCustomerId') as string) || ''}
              onChange={(e) => form.setValue('config.loginCustomerId', e.value)}
              disabled={isEditMode}
            />
            <FormControl.Helper>
              Necessário se você estiver acessando contas via MCC
            </FormControl.Helper>
          </FormControl>
        </View>

        <View direction="row" gap={3} justify="end" paddingTop={4}>
          <Button
            variant="outline"
            onClick={props.onCancel}
            disabled={!!props.isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            loading={!!props.isLoading}
            disabled={!!props.isLoading || !hasChanges || !form.isValid}
          >
            {isEditMode ? 'Atualizar Token' : 'Conectar'}
          </Button>
        </View>
      </View>
    </form>
  );
};
