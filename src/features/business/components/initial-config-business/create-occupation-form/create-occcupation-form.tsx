'use client'
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { timeUtils } from "@/src/shared/utils/time.utils";
import { Slider } from "@/src/shared/components/ui/slider";
import AgenrapCollapsable from "@/src/shared/components/agenrap-ui/collapsable/agenrap-collapsable";
import { currencyUtils } from "@/src/shared/utils/currency.utils";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import { LoaderCircle, PlusCircle } from "lucide-react";
import CollapsableServiceItem from "@/src/shared/components/agenrap-ui/collapsable/collapsable-item/collapsable-service-item";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import { useBusinessActions } from "../../../hooks/use-business-actions";
import { initialBusinessServiceSchema, InitialBusinessServiceSchema } from "@/src/features/business/schemas";

export default function CreateOccupationForm() {
    const { handleCreateANewServiceAction, isPending: serviceIsPending } = useBusinessActions()
    const [timeService, setTimeService] = useState([(3600 / 60) * 30])

    const form = useForm<InitialBusinessServiceSchema>({
        resolver: zodResolver(initialBusinessServiceSchema),
        defaultValues: {
            business: {
                staging: { name: "", price: "", duration: "" },
            },
        },
        mode: "onChange"
    })

    const { errors } = form.formState
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "business.occupations"
    })

    const stagingHasError = !!errors.business?.staging?.name || !!errors.business?.staging?.price
    const stagingEmpty = !form.watch("business.staging.name") || !form.watch("business.staging.price")
    const canAdd = timeService.length >= 1 && !stagingHasError && !stagingEmpty

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => handleCreateANewServiceAction(values))}
                className="flex flex-col gap-y-4 w-full"
            >
                <div className="flex flex-col">
                    <div className="bg-(--agenrap-brown-500) px-4 py-2.5">
                        <p className="font-tree font-bold text-sm text-white">Novo serviço</p>
                    </div>

                    <div className="border border-(--agenrap-brown-500)/20 border-t-0 p-4 flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="business.staging.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AgenrapInput variant="brownrap" placeholder="Ex. Corte Masculino" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-1">
                            <p className="font-tree text-[11px] font-semibold text-(--agenrap-brown-500)/50 uppercase tracking-widest">
                                Duração
                            </p>
                            <p className="font-tree font-semibold text-lg">
                                {timeUtils.toHourString(timeService[0])}
                            </p>
                            <Slider
                                value={timeService}
                                onValueChange={setTimeService}
                                className="bg-(--agenrap-purple-500)"
                                step={(3600 / 60) * 30}
                                min={(3600 / 60) * 30}
                                max={86400}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="business.staging.price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AgenrapInput
                                            variant="brownrap"
                                            placeholder="Ex. R$30,00"
                                            value={field.value}
                                            onChange={(e) => {
                                                const { display } = currencyUtils.onInputChange(e)
                                                field.onChange(display)
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <AgenrapButton
                    disabled={!canAdd}
                    variant="purplerap"
                    type="button"
                    onClick={async () => {
                        const valid = await form.trigger(["business.staging.name", "business.staging.price"])
                        if (!valid) return
                        const staging = form.getValues("business.staging")
                        append({ name: staging!.name, duration: timeService.toString(), price: staging!.price })
                        form.resetField("business.staging")
                        setTimeService([(3600 / 60) * 30])
                    }}
                    className={`flex gap-x-2 justify-center items-center p-2 ${!canAdd ? "cursor-not-allowed opacity-70" : ""}`}
                >
                    <PlusCircle width={28} height={28} />
                    <p className="font-tree text-lg">Adicionar</p>
                </AgenrapButton>

                <AgenrapCollapsable
                    variant="brownrap"
                    collapseName="Seus serviços"
                    spawnNotifier={{ haveNotifier: fields.length > 0, qtdNotifier: fields.length }}
                >
                    {fields.map((oc, indx) => (
                        <CollapsableServiceItem key={oc.id} name={oc.name} duration={oc.duration} price={oc.price} remove={remove} indx={indx} />
                    ))}
                </AgenrapCollapsable>

                <AgenrapButton
                    type="submit"
                    variant="purplerap"
                    disabled={!form.formState.isValid}
                    className={`${!form.formState.isValid ? "cursor-not-allowed" : ""} flex justify-center w-full items-center`}
                >
                    {serviceIsPending
                        ? <div className="flex relative">
                            <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                        </div>
                        : <p className="flex items-center gap-1">Salvar serviços</p>
                    }
                </AgenrapButton>
            </form>
        </Form>
    )
}