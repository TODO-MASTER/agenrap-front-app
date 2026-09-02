import { z } from "zod"
import { PROFESSIONAL_AVATAR_COLORS } from "@/src/shared/utils/professional-colors.utils"

const avatarKeys = PROFESSIONAL_AVATAR_COLORS.map((c) => c.key) as [string, ...string[]]

const professionalWeekSchema = z.object({
  week: z.string(),
  initial: z.string(),
  end: z.string(),
}).superRefine((data, ctx) => {
  if (data.initial && data.end && data.initial >= data.end) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário inicial inválido", path: ["initial"] })
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário final inválido", path: ["end"] })
  }
})

export const professionalSchema = z.object({
  firstName: z.string().min(2, { message: "Mínimo 2 letras" }),
  lastName: z.string().min(1, { message: "Informe o sobrenome" }),
  telephone: z.string().optional().nullable(),
  email: z
    .string()
    .min(1, { message: "Informe o e-mail de convite" })
    .email({ message: "E-mail inválido" }),
  avatarColor: z.enum(avatarKeys).default(avatarKeys[0]),
  serviceIds: z.array(z.number()).min(1, { message: "Selecione ao menos um serviço" }),
  permissionCodes: z.array(z.string()).default([]),
  weeks: z.array(professionalWeekSchema).max(7).default([]),
})

export const selfEditProfessionalSchema = z.object({
  firstName: z.string().min(2, { message: "Mínimo 2 letras" }),
  lastName: z.string().min(1, { message: "Informe o sobrenome" }),
  telephone: z.string().optional().nullable(),
  avatarColor: z.enum(avatarKeys).default(avatarKeys[0]),
})

export type SelfEditProfessionalSchema = z.infer<typeof selfEditProfessionalSchema>
export type ProfessionalSchema = z.infer<typeof professionalSchema>