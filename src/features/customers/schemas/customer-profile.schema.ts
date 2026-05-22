import { z } from "zod"

export const contactSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail obrigatório')
    .email('E-mail inválido'),
  phone: z
    .string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(v => v === '' || v.length === 10 || v.length === 11, {
      message: 'Telefone inválido',
    })
    .optional(),
})
 
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Mínimo 6 caracteres'),
    newPassword: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      })
    }
  })
 
export type ContactSchema = z.infer<typeof contactSchema>
export type PasswordSchema = z.infer<typeof passwordSchema>