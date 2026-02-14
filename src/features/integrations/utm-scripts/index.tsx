'use client';

import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  Tabs,
  Text,
  TextField,
  View,
} from 'reshaped';
import { Icon } from '@/components/icon';
import { useUtmScripts } from './hooks';
import styles from './styles.module.scss';
import { UtmScriptsProps } from './types';

export const UtmScripts = (props: UtmScriptsProps) => {
  const {
    selectedPlatform,
    setSelectedPlatform,
    includeHotmartXcod,
    setIncludeHotmartXcod,
    customConfig,
    setCustomConfig,
    handleCopy,
    getMetaAdsScript,
    getGoogleAdsScript,
    getTikTokAdsScript,
    getCaptureScript,
    getCustomUtmUrl,
  } = useUtmScripts(props);

  const metaAdsScript = getMetaAdsScript();
  const googleAdsScript = getGoogleAdsScript();
  const tiktokAdsScript = getTikTokAdsScript();
  const captureScript = getCaptureScript();
  const customUtmUrl = getCustomUtmUrl();

  return (
    <View gap={4} paddingTop={6}>
      <Text variant="featured-2" weight="medium">
        Parâmetros e Scripts de Rastreamento
      </Text>
      <Text color="neutral-faded">
        Gere configurações de UTM para seus anúncios e instale o script de
        captura no seu site.
      </Text>

      <Tabs
        value={selectedPlatform}
        onChange={(tab) => setSelectedPlatform(tab.value as never)}
      >
        <Tabs.List>
          <Tabs.Item value="meta_ads">
            <View direction="row" align="center" gap={2}>
              <Icon name="brand-facebook" size={16} />
              Meta Ads
            </View>
          </Tabs.Item>
          <Tabs.Item value="google_ads">
            <View direction="row" align="center" gap={2}>
              <Icon name="brand-google" size={16} />
              Google Ads
            </View>
          </Tabs.Item>
          <Tabs.Item value="tiktok_ads">
            <View direction="row" align="center" gap={2}>
              <Icon name="brand-tiktok" size={16} />
              TikTok Ads
            </View>
          </Tabs.Item>
          <Tabs.Item value="tracking_script">
            <View direction="row" align="center" gap={2}>
              <Icon name="code" size={16} />
              Script de Site
            </View>
          </Tabs.Item>
          <Tabs.Item value="custom">
            <View direction="row" align="center" gap={2}>
              <Icon name="settings" size={16} />
              Personalizado
            </View>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>

      {selectedPlatform === 'meta_ads' && (
        <div className={styles.scriptSection}>
          <View gap={3}>
            <Text variant="body-2" weight="medium">
              Parâmetros de Tracking - Meta Ads
            </Text>
            <div className={styles.scriptBlock}>
              <pre className={styles.scriptContent}>{metaAdsScript.html}</pre>
              <Button
                variant="ghost"
                size="small"
                icon={<Icon name="copy" />}
                onClick={() => handleCopy(metaAdsScript.html)}
                className={styles.copyButton}
              >
                Copiar
              </Button>
            </div>

            <FormControl>
              <Checkbox
                name="includeHotmartXcod"
                checked={includeHotmartXcod}
                onChange={({ checked }) => setIncludeHotmartXcod(checked)}
              >
                Adicionar xcod (Hotmart)
              </Checkbox>
            </FormControl>

            <Alert
              title="Como usar"
              icon={<Icon name="info-circle" size={20} />}
            >
              {metaAdsScript.instructions}
            </Alert>

            {includeHotmartXcod && (
              <Alert
                title="Atenção Usuários Hotmart"
                color="warning"
                icon={<Icon name="activity" size={20} />}
              >
                Este modelo adiciona o parâmetro xcod, essencial para rastrear
                vendas no Hotmart com todos os identificadores concatenados.
              </Alert>
            )}
          </View>
        </div>
      )}

      {selectedPlatform === 'google_ads' && (
        <div className={styles.scriptSection}>
          <View gap={3}>
            <Text variant="body-2" weight="medium">
              Parâmetros de Tracking - Google Ads
            </Text>

            <div className={styles.scriptBlock}>
              <pre className={styles.scriptContent}>{googleAdsScript.html}</pre>
              <Button
                variant="ghost"
                size="small"
                icon={<Icon name="copy" />}
                onClick={() => handleCopy(googleAdsScript.html)}
                className={styles.copyButton}
              >
                Copiar
              </Button>
            </div>

            <Alert
              title="Como usar"
              icon={<Icon name="info-circle" size={20} />}
            >
              {googleAdsScript.instructions}
            </Alert>
          </View>
        </div>
      )}

      {selectedPlatform === 'tiktok_ads' && (
        <div className={styles.scriptSection}>
          <View gap={3}>
            <Text variant="body-2" weight="medium">
              Parâmetros de Tracking - TikTok Ads
            </Text>

            <div className={styles.scriptBlock}>
              <pre className={styles.scriptContent}>{tiktokAdsScript.html}</pre>
              <Button
                variant="ghost"
                size="small"
                icon={<Icon name="copy" />}
                onClick={() => handleCopy(tiktokAdsScript.html)}
                className={styles.copyButton}
              >
                Copiar
              </Button>
            </div>

            <Alert
              title="Como usar"
              icon={<Icon name="info-circle" size={20} />}
            >
              {tiktokAdsScript.instructions}
            </Alert>
          </View>
        </div>
      )}

      {selectedPlatform === 'tracking_script' && (
        <div className={styles.scriptSection}>
          <View gap={3}>
            <Text variant="body-2" weight="medium">
              Script de Captura de UTMs
            </Text>
            <Text variant="body-3" color="neutral-faded">
              Adicione o script abaixo na tag &lt;head&gt; das suas páginas para
              capturar automaticamente os parâmetros UTM de qualquer campanha.
            </Text>

            <div className={styles.scriptBlock}>
              <pre className={styles.scriptContent}>{captureScript.html}</pre>
              <Button
                variant="ghost"
                size="small"
                icon={<Icon name="copy" />}
                onClick={() => handleCopy(captureScript.html)}
                className={styles.copyButton}
              >
                Copiar Script
              </Button>
            </div>

            <Alert
              title="Vantagens"
              icon={<Icon name="circle-check" size={20} />}
            >
              Rastreamento contínuo entre páginas, preenchimento automático de
              formulários e compatibilidade com Hotmart, Google e Meta.
            </Alert>
          </View>
        </div>
      )}

      {selectedPlatform === 'custom' && (
        <div className={styles.scriptSection}>
          <View gap={3}>
            <Text variant="body-2" weight="medium">
              Construtor de UTM Personalizado
            </Text>

            <div className={styles.customFormGrid}>
              <FormControl>
                <FormControl.Label>UTM Source</FormControl.Label>
                <TextField
                  name="utmSource"
                  placeholder="Ex: facebook, google"
                  value={customConfig.utmSource}
                  onChange={(e) =>
                    setCustomConfig({ ...customConfig, utmSource: e.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>UTM Medium</FormControl.Label>
                <TextField
                  name="utmMedium"
                  placeholder="Ex: cpc, social"
                  value={customConfig.utmMedium}
                  onChange={(e) =>
                    setCustomConfig({ ...customConfig, utmMedium: e.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>UTM Campaign</FormControl.Label>
                <TextField
                  name="utmCampaign"
                  placeholder="Ex: summer_sale"
                  value={customConfig.utmCampaign}
                  onChange={(e) =>
                    setCustomConfig({
                      ...customConfig,
                      utmCampaign: e.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>UTM Content (Opcional)</FormControl.Label>
                <TextField
                  name="utmContent"
                  placeholder="Ex: banner_azul"
                  value={customConfig.utmContent || ''}
                  onChange={(e) =>
                    setCustomConfig({ ...customConfig, utmContent: e.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>UTM Term (Opcional)</FormControl.Label>
                <TextField
                  name="utmTerm"
                  placeholder="Ex: running shoes"
                  value={customConfig.utmTerm || ''}
                  onChange={(e) =>
                    setCustomConfig({ ...customConfig, utmTerm: e.value })
                  }
                />
              </FormControl>
            </div>

            {customUtmUrl && (
              <View gap={2}>
                <Text variant="body-2" weight="medium">
                  URL Gerada
                </Text>
                <div className={styles.previewUrl}>
                  <Text variant="caption-1">
                    https://seudominio.com?{customUtmUrl}
                  </Text>
                </div>
                <Button
                  variant="outline"
                  icon={<Icon name="copy" />}
                  onClick={() =>
                    handleCopy(`https://seudominio.com?${customUtmUrl}`)
                  }
                >
                  Copiar URL
                </Button>
              </View>
            )}
          </View>
        </div>
      )}
    </View>
  );
};
