'use client';

import { IntegrationFormProps } from './types';
import { MetaAdsForm } from './forms/meta-ads';
import { GoogleAdsForm } from './forms/google-ads';
import { HotmartForm } from './forms/hotmart';
import { WebhookForm } from './forms/webhook';
import { IntegrationType } from '@/libs/api/services/integrations';

export const IntegrationForm = (props: IntegrationFormProps) => {
  const { initialValues } = props;

  // Determine type from initialValues or default to meta_ads
  // In creation flow, the type might be passed in initialValues
  const type = (initialValues?.type || 'meta_ads') as IntegrationType;

  switch (type) {
    case 'meta_ads':
      return <MetaAdsForm {...props} />;
    case 'google_ads':
      return <GoogleAdsForm {...props} />;
    case 'hotmart':
    case 'hotmart_sales':
      if (props.category === 'webhooks') {
        return <WebhookForm {...props} />;
      }
      // If editing, check if it has accessToken (API) or not (Webhook)
      if (
        props.initialValues &&
        'accessToken' in props.initialValues &&
        !props.initialValues.accessToken
      ) {
        return <WebhookForm {...props} />;
      }
      return <HotmartForm {...props} />;
    case 'hotmart_webhook':
    case 'kiwify':
    case 'kiwify_webhook':
    case 'kirvano':
    case 'kirvano_webhook':
    case 'custom_webhook':
      return <WebhookForm {...props} />;
    default:
      // Fallback or error if unknown type
      return <WebhookForm {...props} />;
  }
};
