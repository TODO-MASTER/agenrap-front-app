import { z } from "zod";
export const initialBusinessServiceSchema = z.object({
    business: z.object({
        occupations: z.array(z.object({
            name: z.string().max(50, "encurte o nome do serviço se possivel"),
            duration: z.string().max(4, "tamanho não suportado!"),
            price: z.string().min(2, "minimo 2 caracteres"),
        })).min(2,"pelo menos dois serviço"),
        staging: z.object({
            name: z.string().min(3, "Mínimo 3 caracteres").or(z.literal("")),
            price: z.string().min(2, "minimo 2 caracteres!").or(z.literal("")),
            duration: z.string()
        }).optional()
    })
})
export type InitialBusinessServiceSchema = z.infer<typeof initialBusinessServiceSchema>