import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Badge, Button, View } from 'reshaped';
import { formatCurrency } from '@/utils/format-currency';
import { StrapiProduct } from '@/libs/api/services/products/types';

interface ColumnDefsProps {
  onViewDetails: (documentId: string) => void;
}

export const COLUMN_DEFS = ({
  onViewDetails,
}: ColumnDefsProps): ColDef<StrapiProduct>[] => [
  {
    headerName: 'Nome',
    field: 'name',
    minWidth: 200,
    flex: 1,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) => {
      if (!params.data) return null;
      return (
        <View justify="center" align="start" height="100%">
          <Button
            variant="ghost"
            onClick={() => onViewDetails(params.data!.documentId)}
          >
            {params.value}
          </Button>
        </View>
      );
    },
  },
  {
    headerName: 'Plataforma',
    field: 'platform',
    width: 140,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) => (
      <View align="center" justify="center" height="100%">
        <Badge color="neutral">{params.value}</Badge>
      </View>
    ),
  },
  {
    headerName: 'Preço',
    field: 'price',
    width: 140,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) =>
      formatCurrency(params.data?.price, params.data?.currency),
  },
  {
    headerName: 'Status',
    field: 'active',
    width: 120,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) => (
      <View align="center" justify="center" height="100%">
        <Badge color={params.value ? 'positive' : 'neutral'}>
          {params.value ? 'Ativo' : 'Inativo'}
        </Badge>
      </View>
    ),
  },
  {
    headerName: 'ID Externo',
    field: 'externalId',
    width: 150,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) =>
      params.value || '-',
  },
  {
    headerName: 'Ações',
    width: 140,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) => {
      if (!params.data) return null;
      return (
        <View direction="row" gap={2} align="center" height="100%">
          <Button
            size="small"
            variant="ghost"
            onClick={() => onViewDetails(params.data!.documentId)}
          >
            Detalhes
          </Button>
        </View>
      );
    },
  },
];
