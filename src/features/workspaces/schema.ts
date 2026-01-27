import { z } from 'zod';

export const workspaceFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  slug: z
    .string()
    .min(2, 'Identificador deve ter pelo menos 2 caracteres')
    .regex(
      /^[a-z0-9-]+$/,
      'Identificador deve conter apenas letras minúsculas, números e hífens',
    ),

  logo: z
    .union([z.instanceof(File), z.string(), z.literal(''), z.null()])
    .optional()
    .nullable(),

  owner: z.union([z.number(), z.string()]).optional().nullable(),
  members: z.array(z.union([z.number(), z.string()])).optional(),
  integrations: z.array(z.union([z.number(), z.string()])).optional(),
});

export type WorkspaceFormSchema = z.infer<typeof workspaceFormSchema>;
