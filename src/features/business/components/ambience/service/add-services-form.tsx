'use client'
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import { initialBusinessServiceSchema, InitialBusinessServiceSchema } from "@/src/features/business/schemas/business-service.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useBusinessActions } from "../../../hooks/use-business-actions";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { timeUtils } from "@/src/shared/utils/time.utils";
import { Slider } from "@/src/shared/components/ui/slider";
import { currencyUtils } from "@/src/shared/utils/currency.utils";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import { BadgePlus, LayoutList, LoaderCircle } from "lucide-react";
import CollapsableServiceItem from "@/src/shared/components/agenrap-ui/collapsable/collapsable-item/collapsable-service-item";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import { ScrollArea, ScrollBar } from "@/src/shared/components/ui/scroll-area";
import Link from "next/link";
import { AgenrapSegmentedControl } from "@/src/shared/components/agenrap-ui/button/agenrap-segment-button";

export default function AddServicesForm({ tgrap }: { tgrap: string }) {
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
    });

    const { errors } = form.formState
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "business.occupations"
    })

    const stagingHasError = !!errors.business?.staging?.name || !!errors.business?.staging?.price
    const stagingEmpty = !form.watch("business.staging.name") || !form.watch("business.staging.price")

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => handleCreateANewServiceAction(values))}
                className="flex flex-col gap-y-2 md:gap-y-4 items-center px-4 md:px-6"
            >
<div className="flex w-full items-center justify-between mb-2">
    <h1 className="lg:text-4xl md:text-2xl text-xl font-tree font-medium">Serviços</h1>
<AgenrapSegmentedControl segments={[
    { label: 'Adicionar', href: `/dashboard/service/new?rap=${tgrap}`, active: true },
    { label: 'Ver Todos', href: `/dashboard/service/list?rap=${tgrap}`, active: false },
]} />
</div>

                <div className="flex flex-col md:flex-row w-full h-full min-h-112 gap-y-2">
                    <div className="bg-(--agenrap-gray-800) lg:w-[35%] md:w-[50%] w-full p-8 pb-12 flex flex-col gap-y-4">
                        <h4 className="font-cinzel font-bold text-(--agenrap-yellow-200) text-3xl text-center">Agenrap</h4>
                        <FormField
                            control={form.control}
                            name="business.staging.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AgenrapInput variant="cyberYellowRap" placeholder="Ex. Corte Masculino" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex-col">
                            {timeService.map(t => (
                                <p key={t} className="font-tree font-medium text-lg text-white">{timeUtils.toHourString(t)}</p>
                            ))}
                            <Slider value={timeService} onValueChange={setTimeService} step={(3600 / 60) * 30} min={(3600 / 60) * 30} max={86400} />
                        </div>
                        <FormField
                            control={form.control}
                            name="business.staging.price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AgenrapInput variant="cyberYellowRap" placeholder="Ex. R$30,00"
                                            value={field.value}
                                            onChange={(e) => {
                                                const { display } = currencyUtils.onInputChange(e)
                                                field.onChange(display)
                                            }} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <AgenrapButton
                            disabled={timeService.length < 1 || stagingHasError || stagingEmpty}
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
                            className={`flex gap-x-2 justify-center bg-(--agenrap-yellow-200) items-center p-2 mb-2 ${timeService.length < 1 || stagingHasError || stagingEmpty ? "cursor-not-allowed opacity-70" : ""}`}
                        >
                            <BadgePlus width={30} height={30} color="#000" />
                            <p className="font-tree text-lg text-black">Adicionar</p>
                        </AgenrapButton>
                    </div>

                    <div className="flex flex-col w-full md:min-h-full justify-between items-center bg-(--agenrap-brown-500)/75 relative pb-20 md:pb-0">
                        <div className="w-full flex items-center gap-3 border-b bg-(--agenrap-brown-500) pl-4 py-6 border-(--agenrap-gray-800)/50">
                            <p className="font-tree text-white font-medium text-2xl">Lista de serviços</p>
                            {fields.length > 0 && (
                                <span className="bg-(--agenrap-yellow-200) text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {fields.length}
                                </span>
                            )}
                        </div>
                        <ScrollArea className="h-65 m-2 w-[90%] px-2">
                            <ScrollBar className="[&>[data-slot=scroll-area-thumb]]:rounded-full [&>[data-slot=scroll-area-thumb]]:bg-(--agenrap-yellow-200)" />
                            <div className="flex flex-col gap-y-2 p-4 relative">
                                {fields.map((oc, indx) => (
                                    <CollapsableServiceItem key={oc.id} name={oc.name} duration={oc.duration} price={oc.price} remove={remove} indx={indx} />
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="hidden md:flex w-full items-center justify-center border-t py-2 border-(--agenrap-gray-800)/50">
                            <AgenrapButton
                                type="submit"
                                variant="purplerap"
                                disabled={!form.formState.isValid}
                                className={`${!form.formState.isValid ? "cursor-not-allowed" : ""} flex justify-center w-[75%] items-center`}
                            >
                                {serviceIsPending ? (
                                    <div className="flex relative">
                                        <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                                        <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                                    </div>
                                ) : <p className="flex items-center gap-1">Salvar serviços</p>}
                            </AgenrapButton>
                        </div>
                    </div>
                </div>

                <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 px-4 py-3 bg-(--agenrap-brown-200) border-t border-(--agenrap-gray-800)/30">
                    <AgenrapButton
                        type="submit"
                        variant="purplerap"
                        disabled={!form.formState.isValid}
                        className={`${!form.formState.isValid ? "cursor-not-allowed opacity-50" : ""} flex justify-center w-full items-center`}
                    >
                        {serviceIsPending ? (
                            <div className="flex relative">
                                <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                                <LoaderCircle className="animate-spin absolute w-6 h-6" color="#F5E6CC" />
                            </div>
                        ) : 'Salvar serviços'}
                    </AgenrapButton>
                </div>
            </form>
        </Form>
    )
}