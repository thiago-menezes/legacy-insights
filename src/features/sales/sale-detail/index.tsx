'use client';

import { useRouter } from 'next/navigation';
import { Badge, Button, Card, Loader, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { formatCurrency } from '@/utils/format-currency';
import { useSaleDetail } from './hooks';
import { SaleInfoCard } from './sale-info-card';
import styles from './styles.module.scss';
import { SaleDetailProps } from './types';
import { formatDate } from '@/utils/format-date';

export const SaleDetail = ({ saleId }: SaleDetailProps) => {
  const router = useRouter();
  const {
    sale,
    isLoading,
    customerItems,
    financialItems,
    productItems,
    participantItems,
    commissionItems,
    utmItems,
    hotmartPriceItems,
    statusConfig,
  } = useSaleDetail(saleId);

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

        {hotmartPriceItems.length > 0 && (
          <SaleInfoCard
            title="Detalhes de Preço"
            icon="coin"
            items={hotmartPriceItems}
          />
        )}

        {participantItems.length > 0 && (
          <SaleInfoCard
            title="Participantes"
            icon="users"
            items={participantItems}
          />
        )}

        {commissionItems.length > 0 && (
          <SaleInfoCard
            title="Comissões"
            icon="percentage"
            items={commissionItems}
          />
        )}

        {utmItems.length > 0 && (
          <SaleInfoCard title="UTM Tracking" icon="link" items={utmItems} />
        )}
      </div>
    </View>
  );
};
