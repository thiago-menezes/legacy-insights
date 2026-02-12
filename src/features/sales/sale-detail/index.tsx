'use client';

import { useRouter } from 'next/navigation';
import { Badge, Button, Card, Loader, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { formatCurrency } from '@/utils/format-currency';
import { STATUS_CONFIG } from '../constants';
import { useSaleDetail } from './hooks';
import { SaleInfoCard } from './sale-info-card';
import styles from './styles.module.scss';
import { SaleDetailProps, SaleInfoItem } from './types';

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export const SaleDetail = ({ saleId }: SaleDetailProps) => {
  const router = useRouter();
  const { sale, isLoading } = useSaleDetail(saleId);

  if (isLoading) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Loader />
      </View>
    );
  }

  if (!sale) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Text color="neutral-faded">Venda não encontrada.</Text>
      </View>
    );
  }

  const statusConfig = STATUS_CONFIG[sale.status];

  const customerItems: SaleInfoItem[] = [
    { label: 'Nome', value: sale.customerName || '—' },
    { label: 'E-mail', value: sale.customerEmail || '—' },
    { label: 'Telefone', value: sale.customerPhone || '—' },
  ];

  const financialItems: SaleInfoItem[] = [
    { label: 'Valor', value: formatCurrency(sale.amount, sale.currency) },
    {
      label: 'Comissão',
      value: formatCurrency(sale.commissionAmount, sale.currency),
    },
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

  return (
    <View gap={4}>
      <PageTitle
        icon={<Icon name="receipt" size={32} />}
        title="Detalhes da Venda"
        breadcrumbs={[
          { label: 'Vendas', href: '/vendas' },
          { label: sale.externalId || `#${sale.id}` },
        ]}
      >
        <Button
          variant="outline"
          icon={<Icon name="arrow-left" />}
          onClick={() => router.push('/vendas')}
        >
          Voltar
        </Button>
      </PageTitle>

      <div className={styles.detailGrid}>
        <Card padding={4} className={styles.headerCard}>
          <View direction="row" align="center" justify="space-between" gap={4}>
            <View gap={1}>
              <View direction="row" align="center" gap={3}>
                <Text variant="title-6" weight="bold">
                  {sale.externalId || `Venda #${sale.id}`}
                </Text>
                {statusConfig && (
                  <Badge color={statusConfig.color}>{statusConfig.label}</Badge>
                )}
              </View>
              <Text variant="body-2" color="neutral-faded">
                {formatDate(sale.saleDate)} · {sale.integration?.name || '—'}
              </Text>
            </View>

            <Text variant="title-5" weight="bold">
              {formatCurrency(sale.amount, sale.currency)}
            </Text>
          </View>
        </Card>

        <SaleInfoCard title="Cliente" icon="user" items={customerItems} />
        <SaleInfoCard
          title="Financeiro"
          icon="credit-card"
          items={financialItems}
        />
        <SaleInfoCard title="Produto" icon="tag" items={productItems} />

        {utmItems.length > 0 && (
          <SaleInfoCard title="UTM Tracking" icon="link" items={utmItems} />
        )}
      </div>
    </View>
  );
};
