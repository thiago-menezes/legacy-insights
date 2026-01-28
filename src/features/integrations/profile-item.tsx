import { Text, Button } from 'reshaped';
import { Icon } from '@/components/icon';
import { STATUS_CONFIG } from './constants';
import styles from './styles.module.scss';
import { ProfileItemProps } from './types';

export const ProfileItem = ({
  profile,
  onDelete,
  onEdit,
  onValidate,
}: ProfileItemProps) => {
  const statusConfig =
    STATUS_CONFIG[profile.status] || STATUS_CONFIG.disconnected;

  return (
    <div className={styles.profileItem}>
      <Text variant="body-2" weight="medium" className={styles.profileName}>
        {profile.name}
      </Text>

      <div className={styles.profileStatus}>
        <span
          className={`${styles.statusDot} ${
            profile.status === 'connected'
              ? styles.statusDot_connected
              : styles.statusDot_disconnected
          }`}
        />
        <Text
          variant="body-2"
          color={
            statusConfig.color === 'positive' ? 'positive' : 'neutral-faded'
          }
        >
          {statusConfig.label}
        </Text>
      </div>

      <div className={styles.profileActions}>
        <Button
          variant="outline"
          aria-label="Verificar Status"
          onClick={() => onValidate(profile.id)}
        >
          <Icon name="refresh" size={18} />
        </Button>

        <Button
          variant="outline"
          aria-label="Editar"
          onClick={() => onEdit(profile.integration)}
        >
          <Icon name="edit" size={18} />
        </Button>

        <Button
          variant="outline"
          aria-label="Remover"
          color="critical"
          onClick={() => onDelete(profile.id)}
        >
          <Icon name="trash" size={18} />
        </Button>
      </div>
    </div>
  );
};
