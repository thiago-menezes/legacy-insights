import { z } from 'zod';

export const webhookSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum([
    'kiwify',
    'kirvano',
    'hotmart_webhook',
    'kiwify_webhook',
    'kirvano_webhook',
    'custom_webhook',
  ]),
  project: z.string().or(z.number()),
  status: z.string(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export type WebhookFormData = z.infer<typeof webhookSchema>;
