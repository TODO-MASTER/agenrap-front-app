import { z } from "zod"

export const professionalSchema = z.object({
    name: z.string().min(2, "Mínimo 2 caracteres").max(60, "Máximo 60 caracteres"),
    telephone: z.string().optional(),
    avatarColor: z.string().min(1),
    serviceIds: z.array(z.number()).min(1, "Selecione ao menos um serviço"),
})

export type ProfessionalSchema = z.infer<typeof professionalSchema>