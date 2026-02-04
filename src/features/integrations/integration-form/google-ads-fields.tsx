import { FormControl, TextField, View } from 'reshaped';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IntegrationCreateInput } from '@/libs/api/services/integrations';
import { MASKED_TOKEN } from './constants';

interface GoogleAdsFieldsProps {
  watch: UseFormWatch<IntegrationCreateInput>;
  setValue: UseFormSetValue<IntegrationCreateInput>;
  isEditMode?: boolean;
  currentRefreshToken?: string;
  refreshTokenTouched?: boolean;
  clientSecretTouched?: boolean;
  customerIdsRaw: string;
  setRefreshTokenTouched: (value: boolean) => void;
  setClientSecretTouched: (value: boolean) => void;
  setCustomerIdsRaw: (value: string) => void;
  handleRefreshTokenChange: (value: string) => void;
  handleClientSecretChange: (value: string) => void;
}

export const GoogleAdsFields = ({
  watch,
  setValue,
  isEditMode,
  currentRefreshToken,
  refreshTokenTouched,
  clientSecretTouched,
  customerIdsRaw,
  setRefreshTokenTouched,
  setClientSecretTouched,
  setCustomerIdsRaw,
  handleRefreshTokenChange,
  handleClientSecretChange,
}: GoogleAdsFieldsProps) => {
  return (
    <View gap={4}>
      <FormControl>
        <FormControl.Label>Client ID</FormControl.Label>
        <TextField
          placeholder="Ex: 8761..."
          name="config.clientId"
          value={(watch('config.clientId') as string) || ''}
          onChange={(e) => setValue('config.clientId', e.value)}
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
              : (watch('config.clientSecret') as string) || ''
          }
          onChange={(e) => handleClientSecretChange(e.value)}
          onFocus={() => {
            if (isEditMode && !clientSecretTouched) {
              setClientSecretTouched(true);
              setValue('config.clientSecret', '');
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
              setValue('refreshToken', '');
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
          value={(watch('config.developerToken') as string) || ''}
          onChange={(e) => setValue('config.developerToken', e.value)}
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
          value={(watch('config.loginCustomerId') as string) || ''}
          onChange={(e) => setValue('config.loginCustomerId', e.value)}
          disabled={isEditMode}
        />
        <FormControl.Helper>
          Necessário se você estiver acessando contas via MCC
        </FormControl.Helper>
      </FormControl>
    </View>
  );
};
