import { logger } from '@/utils/logger';

export type HubspotLeadData = {
  name: string;
  email: string;
  phone: string;
  curso: string;
  modalidade: string;
  formaIngresso: string;
  valorOferta: string;
};

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;
const HUBSPOT_MARCA = process.env.HUBSPOT_MARCA || 'UNAMA';
const HUBSPOT_ORIGEM_LEAD =
  process.env.HUBSPOT_ORIGEM_LEAD || 'Novo PS - Unama';

export const submitHubspotLead = async (
  data: HubspotLeadData,
  pageUrl?: string,
): Promise<void> => {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
    logger.warn(
      '[HubSpot] ⚠️ Credentials not configured, skipping lead submission',
    );
    return;
  }

  const params = new URLSearchParams({
    email: data.email,
    nome_ser: data.name,
    phone: data.phone,
    marca: HUBSPOT_MARCA,
    curso: data.curso,
    modalidade: data.modalidade,
    forma_de_ingresso_de_interesse: data.formaIngresso,
    valoroferta: data.valorOferta,
    origem_do_lead: HUBSPOT_ORIGEM_LEAD,
    hs_context: JSON.stringify({
      pageUrl: pageUrl || '',
      pageName: 'Processo Seletivo',
    }),
  });

  const url = `https://forms.hubspot.com/uploads/form/v2/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (response.ok) {
      logger.info('[HubSpot] ✅ Lead submitted successfully!', {
        status: response.status,
        email: data.email,
      });
    } else {
      logger.error('[HubSpot] ❌ Submission failed:', {
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    logger.error('[HubSpot] ❌ Request error:', error);
  }
};
