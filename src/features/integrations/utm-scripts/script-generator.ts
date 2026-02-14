import { GeneratedScript, UtmScriptConfig } from './types';

export const generateMetaAdsScript = (
  config: UtmScriptConfig,
): GeneratedScript => {
  const baseScript =
    'utm_source=meta_ads_{{site_source_name}}&utm_campaign={{campaign.id}}_{{campaign.name}}&utm_medium={{adset.id}}_{{adset.name}}&utm_content={{ad.id}}_{{ad.name}}&utm_term={{placement}}';

  let script = baseScript;
  if (config.includeHotmartXcod) {
    script +=
      '&xcod=utm_source=meta_ads_{{site_source_name}}--utm_campaign={{campaign.id}}--utm_medium={{adset.id}}--utm_content={{ad.id}}--utm_term={{placement}}';
  }

  const instructions = config.includeHotmartXcod
    ? 'Adicione estes parâmetros UTM no Meta Ads. O parâmetro xcod foi adicionado para rastreamento automático no Hotmart.'
    : 'Cole estes parâmetros no campo "Parâmetros de URL" do Meta Ads.';

  return {
    html: script,
    url: `https://seudominio.com?${script}`,
    instructions,
  };
};

export const generateGoogleAdsScript = (): GeneratedScript => {
  const script =
    'utm_source=google_ads&utm_campaign={campaignid}&utm_medium={adgroupid}&utm_content={creative}&utm_term={placement}::{keyword}&keyword={keyword}&device={device}&network={network}';

  const instructions =
    'Adicione estes parâmetros no campo "Modelo de acompanhamento" ou "Parâmetros personalizados" do Google Ads.';

  return {
    html: script,
    url: `https://seudominio.com?${script}`,
    instructions,
  };
};

export const generateTikTokAdsScript = (): GeneratedScript => {
  const script =
    'utm_source=tiktok_ads&utm_campaign=__CAMPAIGN_ID__&utm_medium=__AID__&utm_content=__CID__&utm_term=__PLACEMENT__';

  const instructions =
    'Cole estes parâmetros nas configurações de URL do TikTok Ads Manager.';

  return {
    html: script,
    url: `https://seudominio.com?${script}`,
    instructions,
  };
};

export const generateCaptureScriptSnippet = (
  projectId: string | number,
): GeneratedScript => {
  const script = `<script src="${process.env.NEXT_PUBLIC_BASE_URL}/scripts/tracker.js?id=${projectId}" async defer></script>`;

  const instructions =
    'Copie e cole este script dentro da tag <head> de todas as páginas do seu site para capturar UTMs e rastrear conversões.';

  return {
    html: script,
    url: '',
    instructions,
  };
};

export const generateCustomUtmUrl = (config: UtmScriptConfig): string => {
  const params = new URLSearchParams();

  if (config.utmSource) params.append('utm_source', config.utmSource);
  if (config.utmMedium) params.append('utm_medium', config.utmMedium);
  if (config.utmCampaign) params.append('utm_campaign', config.utmCampaign);
  if (config.utmContent) params.append('utm_content', config.utmContent);
  if (config.utmTerm) params.append('utm_term', config.utmTerm);

  return params.toString();
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
