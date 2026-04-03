import { z } from "zod";

export const initialBusinessNameSchema = z.object({
    business: z.object({
        name: z.string().min(1, "Campo necessário").refine((val) => !val.includes(" "), "O nome não pode conter espaços")
    })


})
export type InitialBusinessNameSchema = z.infer<typeof initialBusinessNameSchema>