import { z } from "zod"

export const dashboardBusinessServiceSchema = z.object({
    business: z.object({
        occupations: z.array(
            z.object({
                name: z.string().min(1),
                duration: z.string().min(1),
                price: z.string().min(1),
                assignToMe: z.boolean().default(false),
            })
        ).min(1, "Adicione pelo menos um serviço"),
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

export type DashboardBusinessServiceSchema = z.infer<typeof dashboardBusinessServiceSchema>