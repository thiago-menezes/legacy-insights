import { FormControl, TextField, View } from 'reshaped';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { IntegrationCreateInput } from '@/libs/api/services/integrations';

interface MetaAdsFieldsProps {
  watch: UseFormWatch<IntegrationCreateInput>;
  setValue: UseFormSetValue<IntegrationCreateInput>;
  isEditMode?: boolean;
  currentAccessToken?: string;
  accessTokenTouched?: boolean;
  adAccountIdsRaw: string;
  setAccessTokenTouched: (value: boolean) => void;
  setAdAccountIdsRaw: (value: string) => void;
  handleAccessTokenChange: (value: string) => void;
}

export const MetaAdsFields = ({
  watch,
  setValue,
  isEditMode,
  currentAccessToken,
  accessTokenTouched,
  adAccountIdsRaw,
  setAccessTokenTouched,
  setAdAccountIdsRaw,
  handleAccessTokenChange,
}: MetaAdsFieldsProps) => {
  return (
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
              setValue('accessToken', '');
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
          value={(watch('config.appId') as string) || ''}
          onChange={(e) => setValue('config.appId', e.value)}
          disabled={isEditMode}
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>App Secret</FormControl.Label>
        <TextField
          placeholder="Ex: a1b2..."
          name="config.appSecret"
          value={(watch('config.appSecret') as string) || ''}
          onChange={(e) => setValue('config.appSecret', e.value)}
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
  );
};
