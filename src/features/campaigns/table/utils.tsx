import { StrapiCampaign } from '@/libs/api/services/campaigns';
import { CampaignRow, CampaignStatus } from '../types';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import Link from 'next/link';
import { Badge, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { STATUS_CONFIG } from '../constants';
import styles from '../styles.module.scss';
import { CellWithChange } from './cell-with-change';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from '@/utils/format-currency';

export const buildCampaignRow = (apiResponse: StrapiCampaign): CampaignRow => {
  const latestMetric = apiResponse.dailyMetrics?.[0];

  return {
    id: String(apiResponse.id),
    documentId: apiResponse.documentId,
    name: apiResponse.name,
    status: apiResponse.status as CampaignStatus,
    budget: Number(apiResponse.dailyBudget || 0),
    clicks: Number(latestMetric?.clicks || 0),
    clicksPrevious: 0,
    clicksChange: 0,
    cpc: Number(latestMetric?.cpc || 0),
    cpcPrevious: 0,
    cpcChange: 0,
    ctr: Number(latestMetric?.ctr || 0),
    ctrPrevious: 0,
    ctrChange: 0,
    conversionRate: Number(latestMetric?.conversionRate || 0),
    conversionRatePrevious: 0,
    conversionRateChange: 0,
  };
};

export const buildColumnDefs = (
  platform: 'meta' | 'google',
): ColDef<CampaignRow>[] => [
  {
    headerName: 'Nome da campanha',
    field: 'name',
    minWidth: 320,
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <Link
          href={`/campanhas/${platform}/${row.documentId}`}
          className={styles.campaignName}
        >
          {params.value}
        </Link>
      );
    },
  },
  {
    headerName: 'Veiculação',
    field: 'status',
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const config = STATUS_CONFIG[params.value as CampaignStatus];

      return (
        <View align="center" justify="center" height="100%">
          <Badge
            icon={<Icon name={config.icon} size={14} />}
            color={config.color}
            variant="faded"
            rounded
          >
            {config.label}
          </Badge>
        </View>
      );
    },
    sortable: false,
  },
  {
    headerName: 'Orçamento',
    field: 'budget',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => (
      <div className={styles.budgetCell}>
        <span>{formatCurrency(params.value as number)}</span>
        <Icon name="pencil" size={14} className={styles.editIcon} />
      </div>
    ),
  },
  {
    headerName: 'Cliques no link',
    field: 'clicks',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.clicks)}
          previousValue={formatNumber(row.clicksPrevious)}
          change={row.clicksChange}
        />
      );
    },
  },
  {
    headerName: 'CPC',
    field: 'cpc',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.cpc)}
          previousValue={formatCurrency(row.cpcPrevious)}
          change={row.cpcChange}
        />
      );
    },
  },
  {
    headerName: 'CTR',
    field: 'ctr',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatPercentage(row.ctr)}
          previousValue={formatPercentage(row.ctrPrevious)}
          change={row.ctrChange}
        />
      );
    },
  },
  {
    headerName: 'Tx. de conversão',
    field: 'conversionRate',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatPercentage(row.conversionRate)}
          previousValue={formatPercentage(row.conversionRatePrevious)}
          change={row.conversionRateChange}
        />
      );
    },
  },
];
