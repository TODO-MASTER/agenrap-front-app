import { z } from "zod";

export const initialBusinessNameSchema = z.object({
    business: z.object({
        name: z.string()
            .min(3, "Mínimo dois caracteres após o @")
            .regex(/^@[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen.")
    })
})
export type InitialBusinessNameSchema = z.infer<typeof initialBusinessNameSchema>
