import { useState } from 'react';
import { Alert, Button, Grid, Modal, Text, TextField, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { HotmartSyncModalProps } from './types';
import { useHotmartSync } from './hooks';
import { getDefaultDateRange, formatSyncStats } from './utils';

export const HotmartSyncModal = ({
  integrationId,
  integrationName,
  isOpen,
  onClose,
  onSuccess,
}: HotmartSyncModalProps) => {
  const defaultDates = getDefaultDateRange();
  const [startDate, setStartDate] = useState(defaultDates.startDate);
  const [endDate, setEndDate] = useState(defaultDates.endDate);

  const { loading, error, stats, syncSales, reset } = useHotmartSync();

  const handleSync = async () => {
    try {
      await syncSales(integrationId, startDate, endDate);
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      // Error is handled by React Query
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      // Reset state after modal closes
      setTimeout(() => {
        const defaultDates = getDefaultDateRange();
        setStartDate(defaultDates.startDate);
        setEndDate(defaultDates.endDate);
        reset(); // Reset React Query mutation state
      }, 300);
    }
  };

  const isFormValid =
    startDate && endDate && new Date(startDate) <= new Date(endDate);

  return (
    <Modal active={isOpen} onClose={handleClose} size="medium">
      <Modal.Title>Sincronizar Vendas Hotmart</Modal.Title>
      <Modal.Subtitle>
        Sincronize vendas do período selecionado da integração{' '}
        <strong>{integrationName}</strong>.
      </Modal.Subtitle>

      <View gap={4} paddingTop={4}>
        <View gap={3}>
          <View direction={{ s: 'column', m: 'row' }} gap={4}>
            <View gap={2}>
              <Text variant="body-3" weight="medium">
                Data Inicial
              </Text>
              <TextField
                name="startDate"
                inputAttributes={{ type: 'date' }}
                value={startDate}
                onChange={(e: { value: string }) => setStartDate(e.value)}
                disabled={loading}
              />
            </View>

            <View gap={2}>
              <Text variant="body-3" weight="medium">
                Data Final
              </Text>
              <TextField
                name="endDate"
                inputAttributes={{ type: 'date' }}
                value={endDate}
                onChange={(e: { value: string }) => setEndDate(e.value)}
                disabled={loading}
              />
            </View>
          </View>

          {!isFormValid && startDate && endDate && (
            <Text variant="body-3" color="critical">
              A data inicial deve ser anterior à data final.
            </Text>
          )}
        </View>

        {error && (
          <Alert
            color="critical"
            title="Erro na sincronização"
            icon={<Icon name="alert-circle" size={20} />}
          >
            {error}
          </Alert>
        )}

        {stats && (
          <View
            backgroundColor="positive-faded"
            borderRadius="medium"
            padding={4}
            gap={3}
          >
            <Grid columns={{ s: 1, m: 3 }} gap={3}>
              <View
                gap={1}
                backgroundColor="white"
                borderRadius="medium"
                padding={2}
                align="center"
                justify="center"
              >
                <Text variant="featured-1" weight="bold" color="primary">
                  {stats.created}
                </Text>
                <Text variant="caption-1" weight="medium" color="neutral">
                  Criadas
                </Text>
              </View>

              <View
                gap={1}
                backgroundColor="white"
                borderRadius="medium"
                padding={2}
                align="center"
                justify="center"
              >
                <Text variant="featured-1" weight="bold" color="primary">
                  {stats.updated}
                </Text>
                <Text variant="caption-1" weight="medium" color="neutral">
                  Atualizadas
                </Text>
              </View>

              <View
                gap={1}
                backgroundColor="white"
                borderRadius="medium"
                padding={2}
                align="center"
                justify="center"
              >
                <Text variant="featured-1" weight="bold" color="primary">
                  {stats.errors}
                </Text>
                <Text variant="caption-1" weight="medium" color="neutral">
                  Erros
                </Text>
              </View>
            </Grid>

            <Text variant="body-3" color="neutral">
              {formatSyncStats(stats)}
            </Text>
          </View>
        )}

        <View direction="row" gap={3} justify="end" paddingTop={2}>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {stats ? 'Fechar' : 'Cancelar'}
          </Button>
          {!stats && (
            <Button
              color="primary"
              onClick={handleSync}
              loading={loading}
              disabled={loading || !isFormValid}
              icon={<Icon name="refresh" size={16} />}
            >
              Sincronizar
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};
