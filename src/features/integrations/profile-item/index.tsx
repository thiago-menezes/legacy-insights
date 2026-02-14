import { useState } from 'react';
import { Badge, Button, Text, TextField, Tooltip, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PLATFORM_METADATA } from '../constants';
import { useProfileStatus } from './hooks';
import styles from './styles.module.scss';
import { ProfileItemProps } from './types';

export const ProfileItem = ({
  profile,
  onDelete,
  onEdit,
  onProcess,
  onDetails,
  canManage,
}: ProfileItemProps) => {
  const { statusConfig, processStatusConfig } = useProfileStatus(profile);
  const [copied, setCopied] = useState(false);
  const [startDate, setStartDate] = useState('');

  const platformMetadata = PLATFORM_METADATA.find(
    (m) => m.integrationType === profile.integration.type,
  );
  const isWebhook = platformMetadata?.category === 'webhooks';

  const handleCopy = () => {
    if (profile.integration.webhookUrl) {
      navigator.clipboard.writeText(profile.integration.webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.profileItem}>
      <div className={styles.profileInfo}>
        <Text variant="body-2" weight="medium" className={styles.profileName}>
          {profile.name}
        </Text>

        <View direction="row" align="center" gap={2}>
          <div className={styles.profileStatus}>
            <span
              className={`${styles.statusDot} ${
                profile.status === 'connected'
                  ? styles.statusDot_connected
                  : styles.statusDot_disconnected
              }`}
            />
            <Text
              variant="body-3"
              color={
                statusConfig.color === 'positive' ? 'positive' : 'neutral-faded'
              }
            >
              {statusConfig.label}
            </Text>
          </div>

          {processStatusConfig && (
            <Tooltip
              text={
                profile.processStatus === 'erro'
                  ? profile.integration.errorMessage
                  : null
              }
            >
              {(props) => (
                <View {...props} direction="row" align="center" gap={2}>
                  <Text variant="body-3" color="neutral-faded">
                    Processamento:
                  </Text>
                  <Badge variant="outline" color={processStatusConfig.color}>
                    {processStatusConfig.label}
                  </Badge>
                </View>
              )}
            </Tooltip>
          )}
        </View>

        {isWebhook && profile.integration.webhookUrl && (
          <div className={styles.webhookUrlContainer}>
            <Text variant="body-3" color="neutral-faded">
              Webhook URL:
            </Text>
            <div className={styles.webhookUrlWrapper}>
              <div
                className={styles.webhookUrl}
                title={profile.integration.webhookUrl}
              >
                <Text variant="body-3">{profile.integration.webhookUrl}</Text>
              </div>
              <Tooltip text={copied ? 'Copiado!' : 'Copiar URL'}>
                {(props) => (
                  <Button
                    {...props}
                    variant="ghost"
                    size="small"
                    onClick={handleCopy}
                    className={styles.copyButton}
                  >
                    <Icon name={copied ? 'check' : 'copy'} size={14} />
                  </Button>
                )}
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      <div className={styles.profileActions}>
        <Tooltip text="Ver Detalhes">
          {(props) => (
            <Button
              {...props}
              variant="outline"
              aria-label="Detalhes"
              onClick={() => onDetails(profile.id)}
            >
              <Icon name="file-text" size={18} />
            </Button>
          )}
        </Tooltip>

        {canManage && (
          <>
            <View direction="row" align="center" gap={2}>
              <TextField
                name="startDate"
                inputAttributes={{ type: 'date' }}
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.value)}
                placeholder="Data início"
              />
              <Tooltip
                text={
                  startDate
                    ? 'Sincronizar desde a data'
                    : 'Processar Campanhas (90 dias)'
                }
              >
                {(props) => (
                  <Button
                    {...props}
                    variant="outline"
                    aria-label="Processar"
                    onClick={() => onProcess(profile.id, startDate)}
                    loading={profile.processStatus === 'processando'}
                  >
                    <Icon name="player-play" size={18} />
                  </Button>
                )}
              </Tooltip>
            </View>

            <Button
              variant="outline"
              aria-label="Atualizar Token"
              onClick={() => onEdit(profile.integration)}
            >
              <Icon name="key" size={18} />
            </Button>

            <Button
              variant="outline"
              aria-label="Remover"
              color="critical"
              onClick={() => onDelete(profile.id)}
            >
              <Icon name="trash" size={18} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
