'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/src/shared/components/ui/form";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { LoaderCircle, Plus, X } from "lucide-react";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import { useBusinessActions } from "../../../hooks/use-business-actions";
import { initialBusinessWeeksSchema, InitialBusinessWeeksSchema } from "@/src/features/business/schemas";
import { useCallback, useEffect, useState } from "react";
import { TimeBlock } from "@/src/shared/components/agenrap-ui/blocks/time-block/time-block";
import { AddDayButton } from "@/src/features/business/components/initial-config-business/config-weeks-form/add-day-button";


export const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex"] as const
export type Weekday = typeof WEEKDAYS[number]
export type DayConfig = { initial: string; end: string }

export const DEFAULT_BASE_TIME: DayConfig = { initial: "08:00", end: "18:00" }
export const DEFAULT_SAT_TIME: DayConfig = { initial: "09:00", end: "14:00" }
export const DEFAULT_SUN_TIME: DayConfig = { initial: "09:00", end: "13:00" }

export default function ConfigWeeksForm() {
    const { handleCreateWkPeriodAction, isPending } = useBusinessActions()

    const [activeDays, setActiveDays] = useState<Set<Weekday>>(new Set(WEEKDAYS))
    const [baseTime, setBaseTime] = useState<DayConfig>(DEFAULT_BASE_TIME)
    const [satConfig, setSatConfig] = useState<DayConfig | null>(null)
    const [sunConfig, setSunConfig] = useState<DayConfig | null>(null)

    const form = useForm<InitialBusinessWeeksSchema>({
        resolver: zodResolver(initialBusinessWeeksSchema),
        defaultValues: {
            business: {
                weeks: WEEKDAYS.map(name => ({ name, ...DEFAULT_BASE_TIME })),
            },
        },
        mode: "onChange",
    })
    const syncToForm = useCallback(() => {
        const weeks = [
            ...[...activeDays].map(name => ({ name, initial: baseTime.initial, end: baseTime.end })),
            ...(satConfig ? [{ name: "Sab", ...satConfig }] : []),
            ...(sunConfig ? [{ name: "Dom", ...sunConfig }] : []),
        ]
        form.setValue("business.weeks", weeks as any, { shouldValidate: true })
    }, [activeDays, baseTime, satConfig, sunConfig, form])

    useEffect(() => { syncToForm() }, [syncToForm])

    const toggleDay = (day: Weekday) => {
        setActiveDays(prev => {
            const next = new Set(prev)
            next.has(day) ? next.delete(day) : next.add(day)
            return next
        })
    }
    const activeDaysList = WEEKDAYS.filter(d => activeDays.has(d))
    const satIndex = activeDaysList.length
    const sunIndex = satIndex + (satConfig ? 1 : 0)

    const weekErrors = form.formState.errors.business?.weeks

    const hasAnyDay = activeDays.size > 0 || satConfig !== null || sunConfig !== null
    const canSubmit = form.formState.isValid && hasAnyDay

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(values => handleCreateWkPeriodAction(values))}
                className="flex flex-col gap-y-6 mb-6 items-center"
            >
                <div className="flex flex-col lg:w-[35%] md:w-[55%] w-[80%] my-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="lg:text-3xl md:text-2xl text-lg text-center font-tree font-bold mt-4 mb-1">
                            Definindo informações de expediente
                        </h1>
                        <div className="flex flex-col">
                            <p className="font-tree font-medium md:text-lg text-sm">2. Fornecer dias da semana</p>
                            <div className="flex gap-1 mt-2 h-full w-full mb-2">
                                <span className="flex min-h-max w-1.5 bg-(--agenrap-blue-500)" />
                                <div className="flex flex-col">
                                    <p className="font-tree md:text-sm text-xs">Definimos Seg–Sex como padrão. Ajuste os horários e</p>
                                    <p className="font-tree md:text-sm text-xs">remova os dias que não atender. Adicione fim de semana se precisar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="flex flex-col gap-4">
                        <TimeBlock
                            prefix="base"
                            title="Horário padrão"
                            value={baseTime}
                            onChange={setBaseTime}
                            errors={weekErrors?.[0] as any}
                            headerRight={
                                activeDaysList.length > 0
                                    ? activeDaysList.join(" · ")
                                    : "nenhum dia ativo"
                            }
                        />

                        <div className="flex flex-col gap-2 px-4 pt-2 border border-(--agenrap-brown-500)/20 border-t-0 -mt-4 pb-4">
                            <p className="font-tree text-[11px] font-semibold text-(--agenrap-brown-500)/50 uppercase tracking-widest">
                                Dias ativos — clique para remover
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {WEEKDAYS.map(day => (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleDay(day)}
                                        className={`px-4 py-1.5 text-sm font-tree font-semibold transition-colors duration-100 cursor-pointer select-none
                      ${activeDays.has(day)
                                                ? "bg-(--agenrap-purple-500) text-white"
                                                : "bg-(--agenrap-brown-500)/10 text-(--agenrap-brown-500)/35 line-through"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {satConfig ? (
                            <TimeBlock
                                prefix="sat"
                                title="Sábado"
                                value={satConfig}
                                onChange={setSatConfig}
                                errors={weekErrors?.[satIndex] as any}
                                headerRight={
                                    <button
                                        type="button"
                                        onClick={() => setSatConfig(null)}
                                        className="cursor-pointer hover:opacity-70 transition-opacity"
                                    >
                                        <X size={15} color="#FFE082" />
                                    </button>
                                }
                            />
                        ) : (
                            <AddDayButton label="Adicionar Sábado" onClick={() => setSatConfig(DEFAULT_SAT_TIME)} />
                        )}

                        {sunConfig ? (
                            <TimeBlock
                                prefix="sun"
                                title="Domingo"
                                value={sunConfig}
                                onChange={setSunConfig}
                                errors={weekErrors?.[sunIndex] as any}
                                headerRight={
                                    <button
                                        type="button"
                                        onClick={() => setSunConfig(null)}
                                        className="cursor-pointer hover:opacity-70 transition-opacity"
                                    >
                                        <X size={15} color="#FFE082" />
                                    </button>
                                }
                            />
                        ) : (
                            <AddDayButton label="Adicionar Domingo" onClick={() => setSunConfig(DEFAULT_SUN_TIME)} />
                        )}

                        {!hasAnyDay && (
                            <p className="text-xs text-red-400 font-tree font-semibold">
                                Selecione ao menos um dia de atendimento para continuar.
                            </p>
                        )}
                    </section>

                    <AgenrapButton
                        type="submit"
                        variant="purplerap"
                        disabled={!canSubmit}
                        className={`${!canSubmit ? "cursor-not-allowed" : ""} flex justify-center w-full items-center`}
                    >
                        {isPending ? (
                            <div className="flex relative">
                                <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                                <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                            </div>
                        ) : (
                            <p className="flex items-center gap-1">Salvar expediente</p>
                        )}
                    </AgenrapButton>

                </div>
            </form>
        </Form>
    )
}