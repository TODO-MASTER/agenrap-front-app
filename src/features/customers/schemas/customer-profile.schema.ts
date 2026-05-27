import { z } from "zod"

export const contactSchema = z.object({
  firstName: z.string().min(2, '* Mínimo 2 letras'),
  lastName: z.string().min(2, '* Mínimo 2 letras'),
  telephone: z
    .string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(v => v === '' || v.length === 10 || v.length === 11, {
      message: '* Telefone inválido',
    })
    .optional(),
})

 
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1,"* necessário pelo menos um caractér"),
    newPassword: z.string().min(1,"* necessário pelo menos um caractér"),
    confirmPassword: z.string().min(1,"* necessário pelo menos um caractér"),
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