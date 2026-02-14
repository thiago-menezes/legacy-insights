export type UtmPlatform =
  | 'meta_ads'
  | 'google_ads'
  | 'tiktok_ads'
  | 'custom'
  | 'tracking_script';

export interface UtmScriptConfig {
  platform: UtmPlatform;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent?: string;
  utmTerm?: string;
  includeHotmartXcod?: boolean;
}

export interface GeneratedScript {
  html: string;
  url: string;
  instructions: string;
}

export interface UtmScriptsProps {
  projectId: string | number;
}
