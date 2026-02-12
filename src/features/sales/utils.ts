import { StrapiSale } from '@/libs/api/services/sales/types';
import { SaleRow } from './types';

export const mapStrapiToSaleRow = (sale: StrapiSale): SaleRow => ({
  id: sale.id,
  documentId: sale.documentId,
  externalId: sale.externalId,
  productName: sale.productName || sale.product?.name || '—',
  customerName: sale.customerName || '—',
  customerEmail: sale.customerEmail || '',
  amount: sale.amount,
  currency: sale.currency || 'BRL',
  commissionAmount: sale.commissionAmount,
  status: sale.status,
  saleDate: sale.saleDate,
  integrationName: sale.integration?.name || '—',
  integrationType: sale.integration?.type || '—',
});
