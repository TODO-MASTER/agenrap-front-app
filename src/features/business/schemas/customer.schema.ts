import { z } from 'zod'
export const createCustomerSchema = z.object({
    firstName: z.string().min(2, 'Mínimo 2 caracteres'),
    lastName: z.string().min(2, 'Mínimo 2 caracteres'),
    telephone: z.string()
        .transform(v => v.replace(/\D/g, ''))
        .refine(v => v === '' || v.length === 10 || v.length === 11, { message: 'Telefone inválido' })
        .optional(),
    email: z.union([
        z.string().email({ message: "*Email inválido" }),
        z.literal(''),
    ]).optional(),
})
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>