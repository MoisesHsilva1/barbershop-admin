import { z } from 'zod';

export const serviceFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .trim()
    .min(1, 'A descrição é obrigatória')
    .max(200, 'A descrição deve ter no máximo 200 caracteres'),
  price: z
    .number({
      error: 'O preço é obrigatório',
    })
    .positive('O preço deve ser maior que zero'),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
