import {
  CampaignAttributionResponse,
  DailyMetric,
  StrapiCampaignResponse,
} from '@/libs/api/services/campaigns/types';

const generateDailyMetrics = (): DailyMetric[] => {
  const metrics: DailyMetric[] = [];
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Base values with weekend dip and slight upward trend over time
    const trendFactor = 1 + (90 - i) * 0.003;
    const weekendFactor = isWeekend ? 0.6 : 1;
    const randomFactor = 0.8 + Math.random() * 0.4;

    const spend = +(
      (80 + Math.random() * 60) *
      weekendFactor *
      trendFactor *
      randomFactor
    ).toFixed(2);
    const impressions = Math.round(
      (3000 + Math.random() * 4000) *
        weekendFactor *
        trendFactor *
        randomFactor,
    );
    const reach = Math.round(impressions * (0.65 + Math.random() * 0.2));
    const clicks = Math.round(
      impressions * (0.02 + Math.random() * 0.03) * randomFactor,
    );
    const conversions = Math.round(
      clicks * (0.04 + Math.random() * 0.06) * randomFactor,
    );
    const leads = Math.round(
      clicks * (0.06 + Math.random() * 0.08) * randomFactor,
    );

    const ctr =
      impressions > 0 ? +((clicks / impressions) * 100).toFixed(2) : 0;
    const cpc = clicks > 0 ? +(spend / clicks).toFixed(2) : 0;
    const cpm =
      impressions > 0 ? +((spend / impressions) * 1000).toFixed(2) : 0;
    const frequency = reach > 0 ? +(impressions / reach).toFixed(2) : 0;
    const conversionRate =
      clicks > 0 ? +((conversions / clicks) * 100).toFixed(2) : 0;
    const costPerConversion =
      conversions > 0 ? +(spend / conversions).toFixed(2) : 0;
    const costPerLead = leads > 0 ? +(spend / leads).toFixed(2) : 0;

    metrics.push({
      id: 1000 + i,
      date: date.toISOString().split('T')[0],
      impressions,
      reach,
      clicks,
      spend,
      conversions,
      leads,
      cpm,
      cpc,
      ctr,
      frequency,
      conversionRate,
      costPerConversion,
      costPerLead,
    });
  }

  return metrics;
};

export const MOCK_CAMPAIGN_RESPONSE: StrapiCampaignResponse = {
  data: {
    id: 43,
    documentId: 'abc123def456',
    externalId: '120215890123456789',
    name: '[VENDAS] Curso Marketing Digital - Conversão - Lookalike 2%',
    status: 'active',
    objective: 'OUTCOME_SALES',
    platform: 'meta',
    dailyBudget: 150,
    startDate: '2025-11-01',
    endDate: undefined,
    dailyMetrics: generateDailyMetrics(),
  },
};

export const MOCK_ATTRIBUTION_RESPONSE: CampaignAttributionResponse = {
  data: {
    campaignId: 43,
    campaignName: '[VENDAS] Curso Marketing Digital - Conversão - Lookalike 2%',
    campaignDocumentId: 'abc123def456',
    totalSpend: 8450.75,
    totalRevenue: 29497.0,
    roas: 3.49,
    salesCount: 17,
    matchedEvents: [
      {
        id: 201,
        documentId: 'evt-001',
        source: 'hotmart',
        eventType: 'PURCHASE_COMPLETE',
        amount: 1997.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-10T14:32:00Z',
        product: { id: 1, name: 'Curso Marketing Digital Pro' },
      },
      {
        id: 202,
        documentId: 'evt-002',
        source: 'hotmart',
        eventType: 'PURCHASE_COMPLETE',
        amount: 1997.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-09T10:15:00Z',
        product: { id: 1, name: 'Curso Marketing Digital Pro' },
      },
      {
        id: 203,
        documentId: 'evt-003',
        source: 'hotmart',
        eventType: 'PURCHASE_COMPLETE',
        amount: 1997.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-08T18:45:00Z',
        product: { id: 1, name: 'Curso Marketing Digital Pro' },
      },
      {
        id: 204,
        documentId: 'evt-004',
        source: 'kiwify',
        eventType: 'order_paid',
        amount: 497.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-07T09:22:00Z',
        product: { id: 2, name: 'Ebook Tráfego Pago Avançado' },
      },
      {
        id: 205,
        documentId: 'evt-005',
        source: 'hotmart',
        eventType: 'PURCHASE_COMPLETE',
        amount: 1997.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-06T16:10:00Z',
        product: { id: 1, name: 'Curso Marketing Digital Pro' },
      },
      {
        id: 206,
        documentId: 'evt-006',
        source: 'kiwify',
        eventType: 'order_paid',
        amount: 497.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-05T11:30:00Z',
        product: { id: 2, name: 'Ebook Tráfego Pago Avançado' },
      },
      {
        id: 207,
        documentId: 'evt-007',
        source: 'hotmart',
        eventType: 'PURCHASE_COMPLETE',
        amount: 1997.0,
        utmSource: 'facebook',
        utmMedium: 'cpc',
        utmCampaign: 'vendas-curso-mktdigital',
        processedAt: '2026-02-03T20:55:00Z',
        product: { id: 1, name: 'Curso Marketing Digital Pro' },
      },
    ],
  },
};
