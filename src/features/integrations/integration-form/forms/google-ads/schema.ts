import { z } from 'zod';

export const googleAdsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.literal('google_ads'),
  project: z.string().or(z.number()),
  status: z.string(),
  refreshToken: z.string().optional(),
  config: z
    .object({
      clientId: z.string().optional(),
      clientSecret: z.string().optional(),
      developerToken: z.string().optional(),
      loginCustomerId: z.string().optional(),
      customerIds: z.array(z.string()).optional(),
    })
    .optional(),
});

export type GoogleAdsFormData = z.infer<typeof googleAdsSchema>;
