import { useQuery } from '@tanstack/react-query';
import { salesService } from '@/libs/api/services/sales';
import { formatCurrency } from '@/utils/format-currency';
import { STATUS_CONFIG } from '../constants';
import { SaleInfoItem } from './types';

const initialSaleHookData = {
  sale: undefined,
  isLoading: false,
  error: undefined,
  customerItems: [],
  financialItems: [],
  productItems: [],
  participantItems: [],
  commissionItems: [],
  utmItems: [],
  hotmartPriceItems: [],
  statusConfig: undefined,
};

export const useSaleDetail = (saleId: string) => {
  const {
    data: saleData,
    isLoading: isSaleLoading,
    error: saleError,
  } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => salesService.get(saleId),
    enabled: !!saleId,
  });

  const sale = saleData?.data;
  const isHotmart = sale?.integration?.type === 'hotmart';
  const transaction = sale?.externalId;
  const integrationId = sale?.integration?.documentId;

  const {
    data: enriched,
    isLoading: isEnrichedLoading,
    error: enrichedError,
  } = useQuery({
    queryKey: ['sale', 'enriched', transaction],
    queryFn: () => salesService.getEnrichedData(transaction!, integrationId!),
    enabled: !!transaction && !!integrationId && isHotmart,
  });

  if (!sale) {
    return {
      ...initialSaleHookData,
      isLoading: isSaleLoading,
      error: (saleError || enrichedError) as Error | undefined,
    };
  }

  const customerItems: SaleInfoItem[] = [
    { label: 'Nome', value: sale.customerName || '—' },
    { label: 'E-mail', value: sale.customerEmail || '—' },
    { label: 'Telefone', value: sale.customerPhone || '—' },
  ];

  const financialItems: SaleInfoItem[] = [
    { label: 'Valor', value: formatCurrency(sale.amount, sale.currency) },
    { label: 'Moeda Original', value: sale.currency || 'BRL' },
  ];

  const productItems: SaleInfoItem[] = [
    {
      label: 'Produto',
      value: sale.productName || sale.product?.name || '—',
    },
    {
      label: 'Plataforma',
      value: sale.integration?.type
        ? sale.integration.type.charAt(0).toUpperCase() +
          sale.integration.type.slice(1)
        : '—',
    },
  ];

  const utmItems: SaleInfoItem[] = [];
  if (sale.utmSource) utmItems.push({ label: 'Source', value: sale.utmSource });
  if (sale.utmMedium) utmItems.push({ label: 'Medium', value: sale.utmMedium });
  if (sale.utmCampaign)
    utmItems.push({ label: 'Campaign', value: sale.utmCampaign });
  if (sale.utmContent)
    utmItems.push({ label: 'Content', value: sale.utmContent });
  if (sale.utmTerm) utmItems.push({ label: 'Term', value: sale.utmTerm });

  const enrichedData = enriched?.data;

  // Enriched Data Items
  const hotmartPriceItems: SaleInfoItem[] = [];
  if (enrichedData?.priceDetails?.items?.[0]) {
    const item = enrichedData.priceDetails.items[0];
    hotmartPriceItems.push({
      label: 'Total',
      value: formatCurrency(item.total.value, item.total.currency_code),
    });
    hotmartPriceItems.push({
      label: 'Base',
      value: formatCurrency(item.base.value, item.base.currency_code),
    });
    hotmartPriceItems.push({
      label: 'Taxa Hotmart',
      value: formatCurrency(item.fee.value, item.fee.currency_code),
    });
    if (item.vat.value > 0) {
      hotmartPriceItems.push({
        label: 'VAT/IVA',
        value: formatCurrency(item.vat.value, item.vat.currency_code),
      });
    }
  }

  const hotmartParticipants =
    enrichedData?.participants?.items?.[0]?.users || [];
  const hotmartCommissions =
    enrichedData?.commissions?.items?.[0]?.commissions || [];

  const participantItems: SaleInfoItem[] = hotmartParticipants.map((p) => ({
    label: p.role,
    value: p.user.name,
  }));

  const commissionItems: SaleInfoItem[] = hotmartCommissions.map((c) => ({
    label: c.user.name,
    value: formatCurrency(c.commission.value, c.commission.currency_code),
  }));

  return {
    sale,
    isLoading: isSaleLoading || (isHotmart && isEnrichedLoading),
    error: saleError || enrichedError,
    customerItems,
    financialItems,
    productItems,
    participantItems,
    commissionItems,
    utmItems,
    hotmartPriceItems,
    statusConfig: STATUS_CONFIG[sale.status],
  };
};
