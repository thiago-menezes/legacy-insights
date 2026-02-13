import { Badge } from 'reshaped';
import { SourceBadgeProps } from './types';

const SOURCE_CONFIG: Record<
  string,
  { label: string; color: 'primary' | 'critical' | 'neutral' }
> = {
  meta: { label: 'Meta', color: 'primary' },
  hotmart: { label: 'Hotmart', color: 'critical' },
  calculated: { label: 'Calculado', color: 'neutral' },
};

export const SourceBadge = ({ source }: SourceBadgeProps) => {
  const config = SOURCE_CONFIG[source] || SOURCE_CONFIG.calculated;

  return (
    <Badge color={config.color} variant="faded" size="small" rounded>
      {config.label}
    </Badge>
  );
};
