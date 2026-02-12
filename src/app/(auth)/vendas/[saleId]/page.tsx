import { SaleDetail } from '@/features/sales/sale-detail';

interface SaleDetailPageProps {
  params: Promise<{ saleId: string }>;
}

export default async function SaleDetailPage({ params }: SaleDetailPageProps) {
  const { saleId } = await params;
  return <SaleDetail saleId={saleId} />;
}
