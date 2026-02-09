import { z } from 'zod';
import { parseHotmartCredentials } from './utils';

export const hotmartSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    type: z.literal('hotmart'),
    project: z.string().or(z.number()),
    status: z.string(),
    accessToken: z.string().optional(),
    hotmartCredentials: z.string().optional(),
    config: z
      .object({
        clientId: z.string().optional(),
        clientSecret: z.string().optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    // If not in edit mode (we can't easily check edit mode here in schema pure function accurately if we depend on 'id' being present elsewhere,
    // but typically we rely on whether fields are filled).
    // Actually the original schema checked:
    // if (!isHotmartValid && !data.hotmartCredentials)

    // We can check if accessToken/clientId/clientSecret are present.
    // If they are missing AND hotmartCredentials is missing, then it's an error.

    const hasConfiguredCredentials =
      !!data.accessToken &&
      !!data.config?.clientId &&
      !!data.config?.clientSecret;

    if (!hasConfiguredCredentials && !data.hotmartCredentials) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As credenciais da Hotmart são obrigatórias',
        path: ['hotmartCredentials'],
      });
    }

    if (data.hotmartCredentials) {
      const parsed = parseHotmartCredentials(data.hotmartCredentials);
      if (!parsed) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Formato de credenciais inválido. Certifique-se de copiar o bloco completo.',
          path: ['hotmartCredentials'],
        });
      }
    }
  });

export type HotmartFormData = z.infer<typeof hotmartSchema>;
