import { z } from 'zod';

export const metaAdsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.literal('meta_ads'),
  project: z.string().or(z.number()),
  status: z.string(),
  accessToken: z.string().optional(),
  config: z
    .object({
      appId: z.string().optional(),
      appSecret: z.string().optional(),
      adAccountIds: z.array(z.string()).optional(),
    })
    .optional(),
});

export type MetaAdsFormData = z.infer<typeof metaAdsSchema>;
