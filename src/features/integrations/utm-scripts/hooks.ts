import { useState } from 'react';
import { useToast } from 'reshaped';
import {
  copyToClipboard,
  generateCustomUtmUrl,
  generateGoogleAdsScript,
  generateMetaAdsScript,
  generateTikTokAdsScript,
  generateCaptureScriptSnippet,
} from './script-generator';
import { UtmPlatform, UtmScriptConfig, UtmScriptsProps } from './types';

export const useUtmScripts = (props: UtmScriptsProps) => {
  const [selectedPlatform, setSelectedPlatform] =
    useState<UtmPlatform>('meta_ads');
  const [includeHotmartXcod, setIncludeHotmartXcod] = useState(false);
  const [customConfig, setCustomConfig] = useState<UtmScriptConfig>({
    platform: 'custom',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmContent: '',
    utmTerm: '',
  });

  const { show } = useToast();

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      show({
        title: 'Copiado!',
        text: 'Copiado para a área de transferência',
        color: 'positive',
      });
    } else {
      show({
        title: 'Erro',
        text: 'Falha ao copiar',
        color: 'critical',
      });
    }
  };

  const getMetaAdsScript = () => {
    return generateMetaAdsScript({
      platform: 'meta_ads',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      includeHotmartXcod,
    });
  };

  const getGoogleAdsScript = () => {
    return generateGoogleAdsScript();
  };

  const getTikTokAdsScript = () => {
    return generateTikTokAdsScript();
  };

  const getCaptureScript = () => {
    return generateCaptureScriptSnippet(props.projectId);
  };

  const getCustomUtmUrl = () => {
    return generateCustomUtmUrl(customConfig);
  };

  return {
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
  };
};
