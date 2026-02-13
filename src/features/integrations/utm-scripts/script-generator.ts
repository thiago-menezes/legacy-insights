import { GeneratedScript, UtmScriptConfig } from './types';

export const generateMetaAdsScript = (
  config: UtmScriptConfig,
): GeneratedScript => {
  const script =
    'utm_source=meta_ads_{{site_source_name}}&utm_campaign={{campaign.id}}{{campaign.name}}&utm_medium={{adset.id}}{{adset.name}}&utm_content={{ad.id}}_{{ad.name}}&utm_term={{placement}}';

  const instructions = config.includeHotmartXcod
    ? 'Adicione estes parâmetros UTM no Meta Ads e configure o xcod no Hotmart para rastreamento completo de vendas.'
    : 'Cole estes parâmetros nas configurações de URL do Meta Ads.';

  const htmlScript = `<script>
${script}
</script>`;

  return {
    html: htmlScript,
    url: `https://seudominio.com?${script.replace(/\n/g, '&').replace(/{[^}]+}/g, 'valor')}`,
    instructions,
  };
};

export const generateGoogleAdsScript = (): GeneratedScript => {
  const script =
    'utm_source=google_ads&utm_campaign={campaignid}&utm_medium={adgroupid}&utm_content={creative}&utm_term={placement}::{keyword}&keyword={keyword}&device={device}&network={network}';

  const instructions =
    'Adicione estes parâmetros na configuração de rastreamento da campanha do Google Ads.';

  const htmlScript = `<script>
${script}
</script>`;

  return {
    html: htmlScript,
    url: `https://seudominio.com?${script.replace(/\n/g, '&').replace(/{[^}]+}/g, 'valor')}`,
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
