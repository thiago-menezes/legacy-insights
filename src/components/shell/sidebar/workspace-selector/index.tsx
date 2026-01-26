import { View, Text, DropdownMenu } from 'reshaped';
import { Icon } from '@/components/icon';
import { useWorkspaces } from '@/features/workspaces/hooks';
import { getMediaUrl } from '@/libs/api/strapi';
import { DEFAULT_ORG_ICON } from './constants';
import { useWorkspaceSelector } from './hooks';
import styles from './styles.module.scss';

const PROVIDER_LOGOS: Record<string, string> = {
  google_ads: '/icon-google.png',
  meta_ads: '/icon-meta.png',
};

export const WorkspaceSelector = () => {
  const {
    selectedOrgId,
    selectedWorkspaceId,
    selectedOrg,
    selectedWorkspace,
    handleSelectWorkspace,
  } = useWorkspaceSelector();
  const { workspaces } = useWorkspaces();

  const currentOrgLogo = selectedOrg?.logo?.url
    ? getMediaUrl(selectedOrg.logo.url)
    : null;

  return (
    <div className={styles.container}>
      <DropdownMenu width="content" triggerType="hover" position="start-top">
        <DropdownMenu.Trigger>
          {(attributes) => (
            <DropdownMenu.Item className={styles.trigger} {...attributes}>
              <View direction="row" align="center" gap={3}>
                <View className={styles.orgIcon}>
                  {currentOrgLogo ? (
                    <img
                      src={currentOrgLogo}
                      alt={selectedOrg?.name}
                      className={styles.logoImage}
                    />
                  ) : (
                    <Icon name={DEFAULT_ORG_ICON} size={24} />
                  )}
                </View>
                <View direction="column" className={styles.info}>
                  <Text variant="body-2" weight="medium">
                    {selectedOrg?.name || 'Selecione um Workspace'}
                  </Text>
                  <Text variant="caption-1" color="neutral">
                    {selectedWorkspace?.name || 'Selecione um Projeto'}
                  </Text>
                </View>
                <View>
                  <Icon name="chevron-down" size={16} />
                </View>
              </View>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          {workspaces.map((org) => (
            <DropdownMenu.Section key={org.documentId}>
              <DropdownMenu.SubMenu>
                <DropdownMenu.SubTrigger
                  startSlot={
                    org.logo?.url ? (
                      <img
                        src={getMediaUrl(org.logo.url)!}
                        alt={org.name}
                        className={styles.menuLogoImage}
                      />
                    ) : (
                      <Icon name={DEFAULT_ORG_ICON} size={20} />
                    )
                  }
                >
                  {org.name}
                </DropdownMenu.SubTrigger>

                <DropdownMenu.Content>
                  {(org.integrations || []).map((ws) => {
                    const isSelected =
                      selectedOrgId === org.documentId &&
                      selectedWorkspaceId === String(ws.id);

                    console.log({ ws });
                    return (
                      <DropdownMenu.Item
                        key={ws.id}
                        onClick={() =>
                          handleSelectWorkspace(org.documentId, String(ws.id))
                        }
                        selected={isSelected}
                        startSlot={
                          PROVIDER_LOGOS[ws.type.toLowerCase()] && (
                            <img
                              src={PROVIDER_LOGOS[ws.type.toLowerCase()]}
                              alt={ws.type}
                              className={styles.providerLogo}
                            />
                          )
                        }
                      >
                        {ws.name}
                      </DropdownMenu.Item>
                    );
                  })}

                  <DropdownMenu.Item
                    startSlot={<Icon name="plus" size={16} />}
                    onClick={() => {
                      // TODO: Implement functionality
                    }}
                  >
                    Add novo Projeto
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.SubMenu>
            </DropdownMenu.Section>
          ))}

          <DropdownMenu.Section>
            <DropdownMenu.Item
              startSlot={<Icon name="plus" size={16} />}
              onClick={() => {
                // TODO: Implement functionality
              }}
            >
              Add novo Workspace
            </DropdownMenu.Item>
          </DropdownMenu.Section>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
