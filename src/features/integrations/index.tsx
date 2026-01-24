'use client';

import Image from 'next/image';
import { View, Text, Tabs } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { INTEGRATIONS, STATUS_CONFIG, TABS } from './constants';
import styles from './styles.module.scss';
import { IntegrationPlatform, IntegrationProfile } from './types';

interface ProfileItemProps {
  profile: IntegrationProfile;
}

const ProfileItem = ({ profile }: ProfileItemProps) => {
  const statusConfig = STATUS_CONFIG[profile.status];

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
        {profile.status === 'disconnected' && (
          <button className={styles.actionButton} title="Reconectar">
            <Icon name="refresh" size={18} />
          </button>
        )}
        <button className={styles.actionButton} title="Configurações">
          <Icon name="settings" size={18} />
        </button>
        <button
          className={`${styles.actionButton} ${styles.actionButton_delete}`}
          title="Remover"
        >
          <Icon name="trash" size={18} />
        </button>
      </div>
    </div>
  );
};

interface PlatformCardProps {
  platform: IntegrationPlatform;
}

const PlatformCard = ({ platform }: PlatformCardProps) => {
  return (
    <div className={styles.platformCard}>
      <div className={styles.platformHeader}>
        <div className={styles.platformIcon}>
          <Image
            src={platform.icon}
            width={40}
            height={40}
            alt={platform.name}
            priority
            className={styles.iconIntegration}
          />
        </div>
        <div className={styles.platformInfo}>
          <Text variant="body-1" weight="bold">
            {platform.name}
          </Text>
          <Text variant="body-2" color="neutral-faded">
            {platform.description}
          </Text>
        </div>
      </div>

      <div className={styles.profilesList}>
        {platform.profiles.map((profile) => (
          <ProfileItem key={profile.id} profile={profile} />
        ))}

        <button className={styles.addProfileButton}>
          <Icon name="plus" size={18} />
          Adicionar novo perfil
        </button>
      </div>
    </div>
  );
};

export const Integrations = () => {
  return (
    <View gap={6} className={styles.integrations}>
      <PageTitle
        title="Integrações"
        description="Gerencie suas integrções com as plataformas de ADS e ferramentas"
      />

      <View>
        <Tabs variant="pills-elevated" defaultValue="all">
          <Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Item key={tab.id} value={tab.id}>
                <View direction="row" align="center" gap={2}>
                  {tab.icon && <Icon name={tab.icon} size={16} />}
                  {tab.label}
                </View>
              </Tabs.Item>
            ))}
          </Tabs.List>
        </Tabs>
      </View>

      <View gap={4}>
        <Text variant="featured-2" weight="medium">
          Anúncios
        </Text>

        <div className={styles.platformsGrid}>
          {INTEGRATIONS.filter((p) => p.category === 'ads').map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </View>
    </View>
  );
};
