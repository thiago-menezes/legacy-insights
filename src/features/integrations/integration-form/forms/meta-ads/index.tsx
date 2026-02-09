import { Button, FormControl, Text, TextField, View } from 'reshaped';
import { useMetaAdsForm } from './use-meta-ads-form';
import { IntegrationFormProps } from '../../types';

export const MetaAdsForm = (props: IntegrationFormProps) => {
  const { form, state, actions } = useMetaAdsForm(props);
  const { isEditMode, errors } = form;
  const {
    accessTokenTouched,
    adAccountIdsRaw,
    currentAccessToken,
    hasChanges,
  } = state;
  const {
    handleAccessTokenChange,
    setAccessTokenTouched,
    setAdAccountIdsRaw,
    submitHandler,
  } = actions;

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <View gap={4} paddingTop={4}>
        <FormControl hasError={!!errors.name}>
          <FormControl.Label>Nome da Integração</FormControl.Label>
          <TextField
            placeholder="Ex: Minha Conta de Anúncios"
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
            Meta Ads
          </Text>
        </View>

        <View gap={4}>
          <FormControl>
            <FormControl.Label>Access Token</FormControl.Label>
            <TextField
              placeholder="EAAL..."
              name="accessToken"
              value={currentAccessToken || ''}
              onChange={(e) => handleAccessTokenChange(e.value)}
              onFocus={() => {
                if (isEditMode && !accessTokenTouched) {
                  setAccessTokenTouched(true);
                  form.setValue('accessToken', '');
                }
              }}
            />
            {isEditMode && !accessTokenTouched && (
              <FormControl.Helper>
                Clique no campo para inserir um novo token
              </FormControl.Helper>
            )}
          </FormControl>

          <FormControl>
            <FormControl.Label>App ID</FormControl.Label>
            <TextField
              placeholder="Ex: 8290..."
              name="config.appId"
              value={(form.watch('config.appId') as string) || ''}
              onChange={(e) => form.setValue('config.appId', e.value)}
              disabled={isEditMode}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>App Secret</FormControl.Label>
            <TextField
              placeholder="Ex: a1b2..."
              name="config.appSecret"
              value={(form.watch('config.appSecret') as string) || ''}
              onChange={(e) => form.setValue('config.appSecret', e.value)}
              inputAttributes={{ type: 'password' }}
              disabled={isEditMode}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>
              Lista AccountIDs (Separados por vírgula)
            </FormControl.Label>
            <TextField
              name="config.adAccountIds"
              inputAttributes={{ autoComplete: 'off' }}
              placeholder="Ex: act_123, act_456"
              value={adAccountIdsRaw}
              onChange={(e) => setAdAccountIdsRaw(e.value)}
              disabled={isEditMode}
            />
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
