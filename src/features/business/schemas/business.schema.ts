import { z } from "zod";
export const initialatSignSchema = z.object({
  business: z.object({
    name: z.string().min(2, "Mínimo 2 caracteres"),

atSign: z
  .string()
  .min(3, "Mínimo 3 caracteres")
  .max(30, "Máximo 30 caracteres")
  .regex(
    /^[a-z0-9]+(?:[._-]?[a-z0-9]+)*$/,
    "Continue digitando — o arroba não pode terminar com hífen, ponto ou underscore."
  )
  }),
});

export type InitialatSignSchema = z.infer<typeof initialatSignSchema>
