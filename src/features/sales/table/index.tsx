import { Pagination, Text, View } from 'reshaped';
import { Table } from '@/components/table';
import { SaleRow } from '../types';
import { COLUMN_DEFS } from './constants';
import { SalesTableProps } from './types';

export const SalesTable = ({
  data,
  isLoading,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
}: SalesTableProps) => {
  if (!isLoading && data.length === 0) {
    return (
      <View align="center" justify="center" paddingTop={10} paddingBottom={10}>
        <Text color="neutral-faded">Nenhuma venda encontrada.</Text>
      </View>
    );
  }

  return (
    <View gap={4}>
      <Table<SaleRow>
        rowData={data}
        columnDefs={COLUMN_DEFS}
        defaultColDef={{
          resizable: true,
          suppressMovable: true,
        }}
        domLayout="autoHeight"
        rowHeight={72}
        headerHeight={48}
        pagination={false}
        onRowClicked={(event) => {
          if (event.data?.documentId && onRowClick) {
            onRowClick(event.data.documentId);
          }
        }}
        rowStyle={onRowClick ? { cursor: 'pointer' } : undefined}
      />

      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          page={currentPage}
          previousAriaLabel="Página anterior"
          nextAriaLabel="Próxima página"
          onChange={({ page }) => onPageChange?.(page)}
        />
      )}
    </View>
  );
};
