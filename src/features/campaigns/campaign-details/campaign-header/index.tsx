import { Badge, Button, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { formatCurrency } from '@/utils/format-currency';
import { CampaignHeaderData } from '../types';
import styles from './styles.module.scss';

interface CampaignHeaderProps {
  campaign: CampaignHeaderData;
  onBack: () => void;
}

const STATUS_LABELS: Record<CampaignHeaderData['status'], string> = {
  active: 'Ativa',
  paused: 'Pausada',
  archived: 'Arquivada',
  removed: 'Removida',
  deleted: 'Excluída',
};

const STATUS_COLORS: Record<
  CampaignHeaderData['status'],
  'positive' | 'neutral' | 'critical' | 'primary'
> = {
  active: 'positive',
  paused: 'neutral',
  archived: 'neutral',
  removed: 'critical',
  deleted: 'critical',
};

export const CampaignHeader = ({ campaign, onBack }: CampaignHeaderProps) => {
  const platformLabel =
    campaign.platform === 'meta' ? 'Meta Ads' : 'Google Ads';
  const platformColor = campaign.platform === 'meta' ? 'primary' : 'critical';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const budget = campaign.dailyBudget || campaign.lifetimeBudget;
  const budgetLabel = campaign.dailyBudget ? 'dia' : 'total';

  return (
    <View gap={3} className={styles.header}>
      <View direction="row" justify="space-between" align="start">
        <View gap={2}>
          <Text variant="featured-1" weight="bold">
            {campaign.name}
          </Text>

          <View direction="row" align="center" gap={2}>
            <Badge color={STATUS_COLORS[campaign.status]} variant="faded">
              {STATUS_LABELS[campaign.status]}
            </Badge>
            <Badge color={platformColor}>{platformLabel}</Badge>
            {campaign.objective && (
              <Badge color="neutral" variant="faded">
                {campaign.objective}
              </Badge>
            )}
          </View>
        </View>

        <Button variant="ghost" onClick={onBack}>
          <View direction="row" align="center" gap={2}>
            <Icon name="arrow-left" size={16} />
            Voltar
          </View>
        </Button>
      </View>

      <View direction="row" align="center" gap={4}>
        {budget && (
          <View direction="row" align="center" gap={1}>
            <Icon name="wallet" size={16} />
            <Text variant="body-2" color="neutral-faded">
              {formatCurrency(budget)}/{budgetLabel}
            </Text>
          </View>
        )}

        {campaign.startDate && (
          <View direction="row" align="center" gap={1}>
            <Icon name="calendar" size={16} />
            <Text variant="body-2" color="neutral-faded">
              {formatDate(campaign.startDate)}
              {campaign.endDate
                ? ` — ${formatDate(campaign.endDate)}`
                : ' — Em andamento'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
