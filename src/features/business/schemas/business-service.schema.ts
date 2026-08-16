import { z } from "zod";
export const initialBusinessServiceSchema = z.object({
    business: z.object({
occupations: z.array(
  z.object({
    name: z.string().min(1),
    duration: z.string().min(1),
    price: z.string().min(1),
    assignToMe: z.boolean().default(true), // default true = UX amigável
  })
).min(1, "Adicione pelo menos um serviço")
.superRefine((occupations, ctx) => {
  if (!occupations.some(o => o.assignToMe)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Selecione pelo menos um serviço que você atende",
      path: [], // erro no array
    })
  }
}),
        staging: z.object({
            name: z.string().min(3, "Mínimo 3 caracteres").max(40,"Máximo de 40 caracteres").or(z.literal("")),
            price: z.string().min(2, "minimo 2 caracteres!").or(z.literal("")),
            duration: z.string()
        }).optional()
    }).superRefine((business, ctx) => {
        const occupationNames = business.occupations.map(o => o.name);
        const hasDuplicateInOccupations = occupationNames.length !== new Set(occupationNames).size;
        if (hasDuplicateInOccupations) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Serviços com nomes repetidos!",
                path: ["occupations"]
            });
        }
        const stagingName = business.staging?.name;
        if (stagingName && occupationNames.includes(stagingName)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Já existe um serviço com esse nome!",
                path: ["staging", "name"]
            });
        }
    })
})

export const editBusinessServiceSchema = z.object({
    name: z.string().min(3, "Mínimo 3 caracteres").max(40, "Máximo de 40 caracteres"),
    duration: z.string().max(5, "tamanho não suportado!"),
    price: z.string().min(2, "minimo 2 caracteres"),
})

export type EditBusinessServiceSchema = z.infer<typeof editBusinessServiceSchema>
export type InitialBusinessServiceSchema = z.infer<typeof initialBusinessServiceSchema>
