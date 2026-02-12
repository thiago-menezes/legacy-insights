import { Card, Table, Text, View } from 'reshaped';
import {
  formatCompactNumber,
  formatCurrency,
  formatPercentage,
} from '@/utils/format-currency';
import styles from './styles.module.scss';
import { MetricsTableProps } from './types';

export const MetricsTable = ({ data }: MetricsTableProps) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (sortedData.length === 0) {
    return (
      <Card padding={4}>
        <View align="center" paddingBlock={6}>
          <Text color="neutral-faded">
            Nenhuma métrica disponível para o período selecionado.
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <View gap={4}>
        <Text variant="featured-3" weight="medium">
          Métricas Diárias
        </Text>

        <div className={styles.tableWrapper}>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>Data</Table.Cell>
                <Table.Cell>Investimento</Table.Cell>
                <Table.Cell>Impressões</Table.Cell>
                <Table.Cell>Cliques</Table.Cell>
                <Table.Cell>CTR</Table.Cell>
                <Table.Cell>CPC</Table.Cell>
                <Table.Cell>CPM</Table.Cell>
                <Table.Cell>Conversões</Table.Cell>
                <Table.Cell>Custo/Conv.</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sortedData.map((metric) => (
                <Table.Row key={metric.id}>
                  <Table.Cell>
                    <Text weight="medium">
                      {new Date(metric.date).toLocaleDateString('pt-BR')}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{formatCurrency(metric.spend)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>
                      {formatCompactNumber(Number(metric.impressions || 0))}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>
                      {formatCompactNumber(Number(metric.clicks || 0))}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{formatPercentage(metric.ctr || 0, false)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{formatCurrency(metric.cpc)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{formatCurrency(metric.cpm)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{metric.conversions || 0}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{formatCurrency(metric.costPerConversion)}</Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </View>
    </Card>
  );
};
