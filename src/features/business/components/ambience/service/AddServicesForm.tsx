'use client'
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import { initialBusinessServiceSchema, InitialBusinessServiceSchema } from "@/src/shared/types/Business/InitialBusinessServiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useBusinessActions } from "../../../hooks/useBusinessActions";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/AgenrapInput";
import { timeUtils } from "@/src/shared/utils/timeUtils";
import { Slider } from "@/src/shared/components/ui/slider";
import { currencyUtils } from "@/src/shared/utils/currencyUtils";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import { BadgePlus, LoaderCircle, LucideGalleryVerticalEnd, PlusCircle } from "lucide-react";
import AgenrapCollapsable from "@/src/shared/components/agenrap-ui/Collapsable/AgenrapCollapsable";
import CollapsableOccupationItem from "@/src/shared/components/agenrap-ui/Collapsable/CollapsableItem/CollapsableOccupationItem";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import { ScrollArea, ScrollBar } from "@/src/shared/components/ui/scroll-area";

export default function AddServicesForm({tgBns}:{tgBns:string}) {
    const { handleCreateANewServiceAction, isPending: serviceIsPending } = useBusinessActions()
    const [timeService, setTimeService] = useState([(3600 / 60) * 30])
    const linkButtonResponsive = "md:w-fit  md:rounded-none md:h-21.25 md:px-3  md:gap-x-1 md:items-center md:self-auto  md:justify-center " +
        " items-center   justify-start  w-full  flex  w-fit self-end px-4 py-2 h-fit gap-x-2"
    const form = useForm<InitialBusinessServiceSchema>({
        resolver: zodResolver(initialBusinessServiceSchema),
        defaultValues: {
            business: {
                staging: {
                    name: "",
                    price: "",
                    duration: ""
                },
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
                className="flex flex-col gap-y-2 md:gap-y-4  items-center px-6 "
            >
                <div className="flex w-full  items-center justify-between gap-y-2 mb-2 md:flex-nowrap flex-wrap">
                    <h1 className="lg:text-4xl md:text-2xl text-2xl font-tree font-medium">Adicionar Serviços</h1>
                    <div className="md:w-fit w-full  flex justify-end">

                    <AgenrapLinkButton variant={"minBrownRap"} hrefLink={`/dashboard/service/list?bns=${tgBns}`} className={`${linkButtonResponsive}`}   >
                        <LucideGalleryVerticalEnd color="#fff" size={25} />
                        <p className="font-tree md:text-2xl text-lg ">Ver Todos</p></AgenrapLinkButton>
                    </div>

                </div>

                <div className="flex flex-wrap md:flex-nowrap w-full h-full min-h-112  gap-y-2  ">
                    <div className="bg-(--agenrap-gray-800) lg:w-[35%] md:w-[50%] w-full p-8 pb-12 flex flex-col gap-y-4 min-h-full">
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
                        <div className="w-full flex-col ">
                            {timeService.map(t => (

                                <p key={t} className="font-tree font-medium text-lg text-white" >{timeUtils.toHourString(t)}</p>
                            ))}
                            <Slider value={timeService} onValueChange={setTimeService} className=" " step={(3600 / 60) * 30} min={(3600 / 60) * 30} max={86400} />

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
                        <AgenrapButton disabled={timeService.length < 1 || stagingHasError || stagingEmpty} variant={"purplerap"} type="button" onClick={async () => {
                            const valid = await form.trigger(["business.staging.name", "business.staging.price"])
                            if (!valid) return

                            const staging = form.getValues("business.staging")
                            append({ name: staging!.name, duration: timeService.toString(), price: staging!.price })
                            form.resetField("business.staging")
                            setTimeService([(3600 / 60) * 30])
                        }} className={`flex gap-x-2 justify-center bg-(--agenrap-yellow-200) items-center p-2 mb-2 ${timeService.length < 1 || stagingHasError || stagingEmpty ? "cursor-not-allowed opacity-70" : ""}`} >
                            <BadgePlus width={30} height={30} color="#000"/>
                            <p className="font-tree text-lg text-black">Adicionar</p>
                        </AgenrapButton>
                    </div>
                    <div className="flex flex-col  w-full min-h-full justify-between items-center bg-(--agenrap-brown-500)/75 relative  ">
                            <div className="w-full flex items-center  border-b bg-(--agenrap-brown-500)  pl-4 py-6 border-(--agenrap-gray-800)/50">
                            <p className="font-tree text-white font-meduim text-2xl">Lista de serviços</p>
                        </div>
                        <ScrollArea className="h-65 m-2 w-[90%] px-2 " color="000000"  >
                            <ScrollBar primitiveThumbVar="rounded-full bg-(--agenrap-yellow-200)"/>
                            <div className="flex flex-col gap-y-2 p-4 relative">
                            {
                                fields.map((oc, indx) => (
                                    <CollapsableOccupationItem key={oc.id} name={oc.name} duration={oc.duration} price={oc.price} remove={remove} indx={indx} />
                                ))
                            }
                            </div>
                        </ScrollArea>
                        <div className="w-full flex items-center justify-center border-t py-2 border-(--agenrap-gray-800)/50">
                            <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid} className={`${!form.formState.isValid ? `cursor-not-allowed` : ""} flex justify-center lg:w-[35%] w-[75%]  items-center`}>
                                {serviceIsPending ? <div className="flex relative" >
                                    <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                                    <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                                </div> : <p className="flex items-center gap-1">Salvar serviços</p>}
                            </AgenrapButton>
                        </div>
                    </div>

                    {/* </AgenrapCollapsable> */}



                </div>



            </form>
        </Form>
    )
}
