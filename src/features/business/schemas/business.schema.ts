import { z } from "zod";
export const initialatSignSchema = z.object({
  business: z.object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    atSign: z.string().optional(),
  }),
});

export type InitialatSignSchema = z.infer<typeof initialatSignSchema>

export const editBusinessNameSchema = z.object({
    name: z.string().min(2, "Mínimo 2 caracteres").max(60, "Máximo 60 caracteres"),
})

export type EditBusinessNameSchema = z.infer<typeof editBusinessNameSchema>
