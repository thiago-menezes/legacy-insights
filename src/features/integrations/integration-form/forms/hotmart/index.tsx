/* eslint-disable @next/next/no-img-element */
import { Button, FormControl, Text, TextArea, TextField, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { useHotmartForm } from './use-hotmart-form';
import { IntegrationFormProps } from '../../types';
import { parseHotmartCredentials } from './utils';
import styles from './styles.module.scss';
import Link from 'next/link';

export const HotmartForm = (props: IntegrationFormProps) => {
  const { form, state, actions } = useHotmartForm(props);
  const { isEditMode, errors, touchedFields } = form;
  const { hotmartCredentials } = state;
  const { submitHandler } = actions;

  const parsedCredentials = parseHotmartCredentials(hotmartCredentials || '');
  const parseError = errors.hotmartCredentials?.message as string | undefined;
  const isTouched = touchedFields.hotmartCredentials;

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <View gap={4} paddingTop={4}>
        <FormControl hasError={!!errors.name}>
          <FormControl.Label>Nome da Integração</FormControl.Label>
          <TextField
            placeholder="Ex: Minha Conta Hotmart"
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
          <img
            src="/icon-hotmart.png"
            alt="Hotmart"
            style={{ width: 20, height: 20 }}
          />
          <Text variant="body-2" weight="medium">
            Hotmart (API)
          </Text>
        </View>

        {isEditMode ? (
          <View gap={3}>
            <Text variant="body-2" color="neutral">
              As credenciais da Hotmart já foram configuradas. Para alterar,
              crie uma nova integração.
            </Text>
          </View>
        ) : (
          <View gap={4}>
            <View
              direction="row"
              align="center"
              justify="space-between"
              padding={3}
              borderRadius="medium"
              backgroundColor="primary-faded"
            >
              <View gap={1}>
                <Text variant="body-3" weight="bold">
                  Precisa gerar suas credenciais?
                </Text>
                <Text variant="body-3" color="neutral">
                  Acesse o painel da Hotmart para gerar suas credenciais de API
                </Text>
              </View>
              <Link
                href="https://app.hotmart.com/tools/credentials"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outline"
                  size="small"
                  icon={<Icon name="external-link" size={16} />}
                >
                  Abrir Hotmart
                </Button>
              </Link>
            </View>

            <FormControl hasError={!!isTouched && !!parseError}>
              <FormControl.Label>Credenciais da Hotmart</FormControl.Label>
              <TextArea
                name="hotmartCredentials"
                value={hotmartCredentials}
                onChange={({ value }) => {
                  form.setValue('hotmartCredentials', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                placeholder="Cole aqui suas credenciais da Hotmart..."
                className={styles.credentialsTextarea}
              />

              <FormControl.Helper>
                <div className={styles.helperText}>
                  Cole o bloco completo de credenciais gerado pela Hotmart. As
                  credenciais devem incluir Client ID, Client Secret e o token
                  Basic.
                </div>

                <div className={styles.exampleBlock}>
                  <div className={styles.exampleTitle}>Formato Esperado:</div>
                  <div className={styles.exampleCode}>
                    {`Client ID: c413fcd3-945e-4375-85df-7b253a12d8c1
Client Secret: 2fd4f2d9-6ee1-4742-b42d-8600165ec18c
Basic: Basic YzQxM2ZjZDMtOTQ1ZS00Mzc1...`}
                  </div>
                </div>
              </FormControl.Helper>
            </FormControl>

            {isTouched && parseError && (
              <Text color="critical" weight="medium" variant="body-2">
                <Icon name="alert-circle" size={20} />
                {parseError}
              </Text>
            )}

            {parsedCredentials && (
              <Text color="positive" weight="medium" variant="body-2">
                <Icon name="check" size={20} /> Credenciais detectadas com
                sucesso
              </Text>
            )}
          </View>
        )}

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
              !!props.isLoading ||
              (isEditMode ? false : !parsedCredentials || !form.watch('name'))
            }
          >
            {isEditMode ? 'Fechar' : 'Conectar'}
          </Button>
        </View>
      </View>
    </form>
  );
};
