import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Badge, Text, View } from 'reshaped';
import { formatCurrency } from '@/utils/format-currency';
import { STATUS_CONFIG } from '../constants';
import { SaleRow } from '../types';

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const capitalizeIntegrationType = (type: string): string => {
  if (type === '—') return type;
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const COLUMN_DEFS: ColDef<SaleRow>[] = [
  {
    headerName: 'Data',
    field: 'saleDate',
    width: 160,
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
    minWidth: 200,
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
    width: 180,
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
    width: 140,
    cellRenderer: (params: ICellRendererParams<SaleRow>) => (
      <View justify="center" height="100%">
        <Text variant="body-2" weight="medium">
          {formatCurrency(params.value, params.data?.currency)}
        </Text>
      </View>
    ),
  },
  {
    headerName: 'Comissão',
    field: 'commissionAmount',
    width: 140,
    cellRenderer: (params: ICellRendererParams<SaleRow>) => (
      <View justify="center" height="100%">
        <Text variant="body-2">
          {formatCurrency(params.value, params.data?.currency)}
        </Text>
      </View>
    ),
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 140,
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
    width: 130,
    cellRenderer: (params: ICellRendererParams<SaleRow>) => (
      <View align="center" justify="center" height="100%">
        <Badge color="neutral">
          {capitalizeIntegrationType(params.value || '—')}
        </Badge>
      </View>
    ),
  },
];
