import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Table } from '@/components/table';
import { CampaignsTableProps } from '../types';
import { COLUMN_DEFS } from './constants';

ModuleRegistry.registerModules([AllCommunityModule]);

export const CampaignsTable = ({
  data,
  pageSize,
  onPageChange,
}: CampaignsTableProps) => {
  return (
    <Table
      rowData={data}
      columnDefs={COLUMN_DEFS}
      defaultColDef={{
        resizable: true,
        suppressMovable: true,
      }}
      rowSelection="multiple"
      onSelectionChanged={() => {}}
      domLayout="autoHeight"
      rowHeight={72}
      headerHeight={48}
      pagination={true}
      paginationPageSize={pageSize}
      onPaginationChanged={(event) => {
        if (onPageChange && event.newPage) {
          onPageChange(event.api.paginationGetCurrentPage() + 1);
        }
      }}
    />
  );
};
