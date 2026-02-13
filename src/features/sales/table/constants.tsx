import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Badge, Text, View } from 'reshaped';
import { formatCurrency } from '@/utils/format-currency';
import { STATUS_CONFIG } from '../constants';
import { SaleRow } from '../types';
import { formatDate } from '@/utils/format-date';

const capitalizeIntegrationType = (type: string): string => {
  if (type === '—') return type;
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const COLUMN_DEFS: ColDef<SaleRow>[] = [
  {
    headerName: 'Data',
    field: 'saleDate',
    cellRenderer: (params: ICellRendererParams<SaleRow>) => {
      if (!params.value) return '—';
      return (
        <View justify="center" height="100%">
          <Text variant="body-2">{formatDate(params.value)}</Text>
        </View>
      );
    },
  },
  {
    headerName: 'Produto',
    field: 'productName',
    flex: 1,
    cellRenderer: (params: ICellRendererParams<SaleRow>) => (
      <View justify="center" height="100%">
        <Text variant="body-2">{params.value || '—'}</Text>
      </View>
    ),
  },
  {
    headerName: 'Cliente',
    field: 'customerName',
    flex: 1,
    cellRenderer: (params: ICellRendererParams<SaleRow>) => {
      const email = params.data?.customerEmail;
      return (
        <View justify="center" height="100%">
          <Text variant="body-2">{params.value || '—'}</Text>
          {email && (
            <Text variant="caption-1" color="neutral-faded">
              {email}
            </Text>
          )}
        </View>
      );
    },
  },
  {
    headerName: 'Valor',
    field: 'amount',
    cellRenderer: (params: ICellRendererParams<SaleRow>) => (
      <View justify="center" height="100%">
        <Text variant="body-2" weight="medium">
          {formatCurrency(params.value, params.data?.currency)}
        </Text>
      </View>
    ),
  },
  {
    headerName: 'Status',
    field: 'status',
    cellRenderer: (params: ICellRendererParams<SaleRow>) => {
      const config = STATUS_CONFIG[params.value as keyof typeof STATUS_CONFIG];
      if (!config) return '—';
      return (
        <View align="center" justify="center" height="100%">
          <Badge color={config.color}>{config.label}</Badge>
        </View>
      );
    },
  },
  {
    headerName: 'Plataforma',
    field: 'integrationType',
    cellRenderer: (params: ICellRendererParams<SaleRow>) => (
      <View align="center" justify="center" height="100%">
        <Badge color="neutral">
          {capitalizeIntegrationType(params.value || '—')}
        </Badge>
      </View>
    ),
  },
];
