import { useState } from 'react';
import { Button, Text, TextArea, TextField, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { useWebhookTest } from './hooks';
import { WebhookTesterProps } from './types';
import { getDefaultPayload } from './utils';

export const WebhookTester = ({
  webhookUrl,
  source,
  secret,
}: WebhookTesterProps) => {
  const [expanded, setExpanded] = useState(false);
  const [payload, setPayload] = useState(getDefaultPayload(source));
  const [targetUrl, setTargetUrl] = useState(webhookUrl);

  const { loading, response, error, handleTest } = useWebhookTest(
    source,
    secret,
  );

  if (!expanded) {
    return (
      <Button
        variant="outline"
        onClick={() => setExpanded(true)}
        icon={<Icon name="bolt" size={16} />}
      >
        Testar Webhook
      </Button>
    );
  }

  return (
    <View
      gap={4}
      padding={4}
      backgroundColor="neutral-faded"
      borderRadius="medium"
    >
      <View direction="row" justify="space-between" align="center">
        <Text weight="bold">Testar Webhook</Text>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setExpanded(false)}
          icon={<Icon name="x" size={16} />}
        />
      </View>

      <Text variant="body-3">
        Envie um payload de teste para verificar se sua integração está
        recebendo os eventos corretamente. Certifique-se de que o &quot;Webhook
        Secret&quot; está configurado corretamente se estiver testando validação
        de assinatura.
      </Text>

      <View gap={2}>
        <Text weight="medium">URL do Webhook</Text>
        <TextField
          name="targetUrl"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.value)}
        />
      </View>

      <View gap={2}>
        <Text weight="medium">Payload (JSON)</Text>
        <TextArea
          name="payload"
          value={payload}
          onChange={(e) => setPayload(e.value)}
          attributes={{
            style: { fontFamily: 'monospace', minHeight: '200px' },
          }}
        />
      </View>

      <View direction="row" gap={2}>
        <Button
          color="primary"
          onClick={() => handleTest(targetUrl, payload)}
          loading={loading}
          disabled={loading}
        >
          Enviar Teste
        </Button>
        <Button
          variant="outline"
          onClick={() => setPayload(getDefaultPayload(source))}
        >
          Resetar Payload
        </Button>
      </View>

      {error && (
        <View padding={3} backgroundColor="critical-faded" borderRadius="small">
          <Text color="critical" variant="body-3">
            {error}
          </Text>
        </View>
      )}

      {response && (
        <View
          gap={2}
          padding={3}
          backgroundColor={response.ok ? 'positive-faded' : 'critical-faded'}
          borderRadius="small"
        >
          <Text weight="bold" color={response.ok ? 'positive' : 'critical'}>
            Status: {response.status} {response.ok ? 'OK' : 'Error'}
          </Text>
          <View>
            <Text variant="body-3">
              {JSON.stringify(response.data, null, 2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
