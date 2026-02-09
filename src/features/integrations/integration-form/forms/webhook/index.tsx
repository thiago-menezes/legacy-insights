import { Button, FormControl, Text, TextField, View } from 'reshaped';
import { useWebhookForm } from './use-webhook-form';
import { IntegrationFormProps } from '../../types';
import { IntegrationType } from '@/libs/api/services/integrations';

export const WebhookForm = (props: IntegrationFormProps) => {
  const { form, actions } = useWebhookForm(props);
  const { isEditMode, errors, isDirty } = form;

  const getLabel = (type: IntegrationType) => {
    const map: Record<string, string> = {
      kiwify: 'Kiwify',
      kirvano: 'Kirvano',
      custom_webhook: 'Webhook Personalizado',
    };
    return map[type as string] || type;
  };

  const type = form.watch('type') as IntegrationType;

  return (
    <form
      onSubmit={form.handleSubmit(actions.onSubmit as (data: unknown) => void)}
    >
      <View gap={4} paddingTop={4}>
        <FormControl hasError={!!errors.name}>
          <FormControl.Label>Nome da Integração</FormControl.Label>
          <TextField
            placeholder={`Ex: Minha Integração ${getLabel(type)}`}
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

        <View
          padding={3}
          borderRadius="medium"
          backgroundColor="neutral-faded"
          direction="row"
          align="center"
          gap={2}
        >
          <Text variant="body-2" weight="medium">
            {getLabel(type)}
          </Text>
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
            disabled={
              !!props.isLoading || (!isEditMode && !isDirty) || !form.isValid
            }
          >
            {isEditMode ? 'Salvar' : 'Conectar'}
          </Button>
        </View>
      </View>
    </form>
  );
};
