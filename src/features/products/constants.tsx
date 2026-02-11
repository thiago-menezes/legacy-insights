import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Badge, Button, View } from 'reshaped';
import { StrapiProduct } from '@/libs/api/services/products/types';

interface ColumnDefsProps {
  onViewDetails: (documentId: string) => void;
  onEdit: (product: StrapiProduct) => void;
  onDelete: (documentId: string) => void;
}

export const COLUMN_DEFS = ({
  onViewDetails,
  onEdit,
  onDelete,
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
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) => {
      const { price, currency } = params.data || {};
      return price ? `${currency} ${price.toFixed(2)}` : '-';
    },
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
    width: 180,
    cellRenderer: (params: ICellRendererParams<StrapiProduct>) => {
      if (!params.data) return null;
      return (
        <View direction="row" gap={2} align="center" height="100%">
          <Button
            size="small"
            variant="ghost"
            onClick={() => onEdit(params.data!)}
          >
            Editar
          </Button>
          <Button
            size="small"
            variant="ghost"
            color="critical"
            onClick={() => onDelete(params.data!.documentId)}
          >
            Excluir
          </Button>
        </View>
      );
    },
  },
];
