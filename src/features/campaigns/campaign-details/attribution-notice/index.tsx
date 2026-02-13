import { Alert, Text } from 'reshaped';
import { Icon } from '@/components/icon';

interface AttributionNoticeProps {
  platform: 'meta' | 'google';
  endDate: string;
}

export const AttributionNotice = ({
  platform,
  endDate,
}: AttributionNoticeProps) => {
  if (platform !== 'meta') return null;

  // Show notice if end date is within last 72 hours
  const endDateObj = new Date(endDate);
  const now = new Date();
  const hoursDiff = (now.getTime() - endDateObj.getTime()) / (1000 * 60 * 60);

  if (hoursDiff > 72) return null;

  return (
    <Alert
      color="warning"
      icon={<Icon name="alert-triangle" size={18} />}
      title="Janela de atribuição"
    >
      <Text variant="body-3">
        Dados de conversão do Meta podem levar até 72h para serem reportados
        completamente. Os números recentes podem estar incompletos.
      </Text>
    </Alert>
  );
};
