import { z } from "zod";
export const initialBusinessWeeksSchema = z.object({
    business: z.object({
        weeks: z.array(
            z.object({
                name: z.string().max(3, "quantidade excedida de letras"),
                initial: z.string(),
                end: z.string()
            }).superRefine((data, ctx) => {
                if (data.initial && data.end && data.initial >= data.end) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário inicial inválido", path: ["initial"] });
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário final inválido", path: ["end"] });
                }
            })
        )
            .max(7)
            .superRefine((weeks, ctx) => {
                const names = weeks.map(w => w.name);
                weeks.forEach((wk, index) => {
                    if (names.indexOf(wk.name) !== index) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: `${wk.name} já foi adicionado`,
                            path: [index, "name"]
                        });
                    }
                });
            }),

    })
})
export const editBusinessWorkingPeriodSchema =
    z.object({
        name: z.string().max(3, "quantidade excedida de letras"),
        initial: z.string(),
        end: z.string()
    }).superRefine((data, ctx) => {
        if (data.initial && data.end && data.initial >= data.end) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário inicial inválido", path: ["initial"] });
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário final inválido", path: ["end"] });
        }
    })

export const timeBlockSchema = z.object({
    start: z.string().min(1, "Horário de início obrigatório"),
    end: z.string().min(1, "Horário de fim obrigatório"),
    reason: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.start && data.end && data.end <= data.start) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Horário de fim deve ser posterior ao início", path: ["end"] })
    }
})

export type TimeBlockSchema = z.infer<typeof timeBlockSchema>
export type InitialBusinessWeeksSchema = z.infer<typeof initialBusinessWeeksSchema>
export type EditBusinessWorkingPeriodSchema = z.infer<typeof editBusinessWorkingPeriodSchema>