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
    spend: Number(latestMetric?.spend || 0),
    spendPrevious: 0,
    spendChange: 0,
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
    results: Number(latestMetric?.results || 0),
    resultsPrevious: 0,
    resultsChange: 0,
    costPerResult: Number(latestMetric?.costPerResult || 0),
    costPerResultPrevious: 0,
    costPerResultChange: 0,
    purchases: Number(latestMetric?.purchases || 0),
    purchasesPrevious: 0,
    purchasesChange: 0,
    purchaseValue: Number(latestMetric?.purchaseValue || 0),
    purchaseValuePrevious: 0,
    purchaseValueChange: 0,
    purchaseRoas: Number(latestMetric?.purchaseRoas || 0),
    purchaseRoasPrevious: 0,
    purchaseRoasChange: 0,
    costPerPurchase: Number(latestMetric?.costPerPurchase || 0),
    costPerPurchasePrevious: 0,
    costPerPurchaseChange: 0,
    landingPageViews: Number(latestMetric?.landingPageViews || 0),
    landingPageViewsPrevious: 0,
    landingPageViewsChange: 0,
    costPerLandingPageView: Number(latestMetric?.costPerLandingPageView || 0),
    costPerLandingPageViewPrevious: 0,
    costPerLandingPageViewChange: 0,
    initiateCheckouts: Number(latestMetric?.initiateCheckouts || 0),
    initiateCheckoutsPrevious: 0,
    initiateCheckoutsChange: 0,
    costPerInitiateCheckout: Number(latestMetric?.costPerInitiateCheckout || 0),
    costPerInitiateCheckoutPrevious: 0,
    costPerInitiateCheckoutChange: 0,
    outboundClicks: Number(latestMetric?.outboundClicks || 0),
    outboundClicksPrevious: 0,
    outboundClicksChange: 0,
    costPerOutboundClick: Number(latestMetric?.costPerOutboundClick || 0),
    costPerOutboundClickPrevious: 0,
    costPerOutboundClickChange: 0,
    outboundClicksCtr: Number(latestMetric?.outboundClicksCtr || 0),
    outboundClicksCtrPrevious: 0,
    outboundClicksCtrChange: 0,
    connectRate: Number(latestMetric?.connectRate || 0),
    connectRatePrevious: 0,
    connectRateChange: 0,
    initiateCheckoutRate: Number(latestMetric?.initiateCheckoutRate || 0),
    initiateCheckoutRatePrevious: 0,
    initiateCheckoutRateChange: 0,
    checkoutRate: Number(latestMetric?.checkoutRate || 0),
    checkoutRatePrevious: 0,
    checkoutRateChange: 0,
    overallConversionRate: Number(latestMetric?.overallConversionRate || 0),
    overallConversionRatePrevious: 0,
    overallConversionRateChange: 0,
  };
};

export const buildColumnDefs = (
  platform: 'meta' | 'google',
): ColDef<CampaignRow>[] => [
  {
    headerName: 'Nome da campanha',
    field: 'name',
    minWidth: 320,
    pinned: 'left',
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
    headerName: 'Orçamento diário',
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
    headerName: 'Investimento',
    field: 'spend',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.spend)}
          previousValue={formatCurrency(row.spendPrevious)}
          change={row.spendChange}
        />
      );
    },
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
  {
    headerName: 'Resultados',
    field: 'results',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.results)}
          previousValue={formatNumber(row.resultsPrevious)}
          change={row.resultsChange}
        />
      );
    },
  },
  {
    headerName: 'Custo por resultado',
    field: 'costPerResult',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.costPerResult)}
          previousValue={formatCurrency(row.costPerResultPrevious)}
          change={row.costPerResultChange}
        />
      );
    },
  },
  {
    headerName: 'Compras',
    field: 'purchases',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.purchases)}
          previousValue={formatNumber(row.purchasesPrevious)}
          change={row.purchasesChange}
        />
      );
    },
  },
  {
    headerName: 'Custo por compra',
    field: 'costPerPurchase',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.costPerPurchase)}
          previousValue={formatCurrency(row.costPerPurchasePrevious)}
          change={row.costPerPurchaseChange}
        />
      );
    },
  },
  {
    headerName: 'Valor de conversão',
    field: 'purchaseValue',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.purchaseValue)}
          previousValue={formatCurrency(row.purchaseValuePrevious)}
          change={row.purchaseValueChange}
        />
      );
    },
  },
  {
    headerName: 'ROAS',
    field: 'purchaseRoas',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.purchaseRoas)}
          previousValue={formatNumber(row.purchaseRoasPrevious)}
          change={row.purchaseRoasChange}
        />
      );
    },
  },
  {
    headerName: 'Viz. da página de destino',
    field: 'landingPageViews',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.landingPageViews)}
          previousValue={formatNumber(row.landingPageViewsPrevious)}
          change={row.landingPageViewsChange}
        />
      );
    },
  },
  {
    headerName: 'Custo por viz.',
    field: 'costPerLandingPageView',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.costPerLandingPageView)}
          previousValue={formatCurrency(row.costPerLandingPageViewPrevious)}
          change={row.costPerLandingPageViewChange}
        />
      );
    },
  },
  {
    headerName: 'Finalizações de compra',
    field: 'initiateCheckouts',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.initiateCheckouts)}
          previousValue={formatNumber(row.initiateCheckoutsPrevious)}
          change={row.initiateCheckoutsChange}
        />
      );
    },
  },
  {
    headerName: 'Custo por finalização',
    field: 'costPerInitiateCheckout',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.costPerInitiateCheckout)}
          previousValue={formatCurrency(row.costPerInitiateCheckoutPrevious)}
          change={row.costPerInitiateCheckoutChange}
        />
      );
    },
  },
  {
    headerName: 'Cliques de saída',
    field: 'outboundClicks',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatNumber(row.outboundClicks)}
          previousValue={formatNumber(row.outboundClicksPrevious)}
          change={row.outboundClicksChange}
        />
      );
    },
  },
  {
    headerName: 'Custo por clique de saída',
    field: 'costPerOutboundClick',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatCurrency(row.costPerOutboundClick)}
          previousValue={formatCurrency(row.costPerOutboundClickPrevious)}
          change={row.costPerOutboundClickChange}
        />
      );
    },
  },
  {
    headerName: 'Connect Rate',
    field: 'connectRate',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatPercentage(row.connectRate)}
          previousValue={formatPercentage(row.connectRatePrevious)}
          change={row.connectRateChange}
        />
      );
    },
  },
  {
    headerName: 'Tx. Initiate Checkout',
    field: 'initiateCheckoutRate',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatPercentage(row.initiateCheckoutRate)}
          previousValue={formatPercentage(row.initiateCheckoutRatePrevious)}
          change={row.initiateCheckoutRateChange}
        />
      );
    },
  },
  {
    headerName: 'Tx. Checkout',
    field: 'checkoutRate',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatPercentage(row.checkoutRate)}
          previousValue={formatPercentage(row.checkoutRatePrevious)}
          change={row.checkoutRateChange}
        />
      );
    },
  },
  {
    headerName: 'Conversão Geral',
    field: 'overallConversionRate',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<CampaignRow>) => {
      const row = params.data as CampaignRow;
      return (
        <CellWithChange
          value={formatPercentage(row.overallConversionRate)}
          previousValue={formatPercentage(row.overallConversionRatePrevious)}
          change={row.overallConversionRateChange}
        />
      );
    },
  },
];
