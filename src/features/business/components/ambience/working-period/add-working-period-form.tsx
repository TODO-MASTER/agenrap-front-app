'use client'

import { useFieldArray, useForm } from "react-hook-form";
import { initialBusinessWeeksSchema, InitialBusinessWeeksSchema } from "../../../schemas/business-week.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/src/shared/components/ui/field";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { DeleteIcon, LoaderCircle, LucideGalleryVerticalEnd, Watch } from "lucide-react";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import { useBusinessActions } from "../../../hooks/use-business-actions";
import GroupButtonWeeks from "../../initial-config-business/config-weeks-form/group-button-weeks";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import CardDayWeek from "@/src/shared/components/agenrap-ui/card/card-day-week/card-day-week";

import { useEffect, useState } from "react";
import { NormalizedWeek } from "@/src/shared/utils/normalize-week.utils";

interface ICtnCreateWkpProps {
    tgBns: string,
    weeks: NormalizedWeek[]
}

export default function AddWorkingPeriodForm({ tgBns, weeks }: ICtnCreateWkpProps) {
    const { handleCreateWkPeriodAction, isPending } = useBusinessActions()
    const linkButtonResponsive = "md:w-fit  md:rounded-none md:h-21.25 md:px-3  md:gap-x-1 md:items-center md:self-auto  md:justify-center " +
        " items-center   justify-start  w-full  flex  w-fit self-end px-4 py-2 h-fit gap-x-2"
    const form = useForm<InitialBusinessWeeksSchema>({
        resolver: zodResolver(initialBusinessWeeksSchema),
        defaultValues: {
              business: {
        weeks: weeks
            .filter(w => !w.active)
            .map(({ week, initial, end }) => ({ name: week, initial, end })),
    },
        },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "business.weeks"
    })


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => handleCreateWkPeriodAction(values))}
                className="flex flex-col gap-y-8 md:gap-y-16 lg:py-6 lg:px-8 md:py-4 px-2 items-center "
            >
                <div className="flex w-full  items-center justify-between  gap-y-2 md:flex-nowrap flex-wrap">
                    <h1 className="lg:text-4xl md:text-3xl text-2xl font-tree font-medium">Adicionar Expediente</h1>
                    <div className="md:w-fit w-full  flex justify-end">

                        <AgenrapLinkButton variant={"minBrownRap"} hrefLink={`/dashboard/journey/list?bns=${tgBns}`} className={`${linkButtonResponsive} `}   >
                            <Watch color="#fff" size={25} />
                            <p className="font-tree md:text-2xl text-lg ">Ver Adicionados</p></AgenrapLinkButton>
                    </div>

                </div>

                <section className="flex flex-col lg:w-[55%] md:w-[75%]">
                    <div className="bg-(--agenrap-brown-500)/15 flex justify-center w-full flex-nowrap md:py-2 py-1 my-2 items-center ">

                        <GroupButtonWeeks
                        weeks={null}
                            normalizedWeeks={weeks}
                            fields={fields}
                            append={append}
                            form={form}
                        />
                    </div>

                    <div className="flex flex-col  w-full   ">
                        <div className=" flex ">

                            <p className="text-2xl font-tree my-2 text-start ">Dias não adicionados</p>

                        </div>
                        {weeks.filter(wk=>wk.active).length == 7 ? <p className="p-1 font-tree bg-(--agenrap-brown-500)/15 rounded-md px-2">todos os dias da semana já foram adicionados</p> :
                            <FieldGroup className="flex    gap-2">
                                <div className="flex flex-wrap  gap-2">
                                    {fields.map((wk, index) => (
                                        <div className="flex flex-col  " key={wk.id}>
                                            <div className="flex  justify-center " >
                                                <div className="flex gap-x-1 py-1  " >
                                                    <div className="hidden w-0">
                                                        <FormField
                                                            control={form.control}
                                                            name={`business.weeks.${index}.name`}

                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormControl>
                                                                        <AgenrapInput
                                                                            id={`${index}`}
                                                                            type="text"
                                                                            disabled
                                                                            value={field.value}
                                                                            onChange={field.onChange}
                                                                            label="Semana"
                                                                            variant="brownrap"

                                                                            allErrors={"calyBlackInputError"}
                                                                            autoComplete="off"

                                                                            placeholder="nome do seu negócio ex:salao-agenrap"
                                                                            removeFormMessage={true}



                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                </div>

                                            </div>
                                            <CardDayWeek form={form} remove={remove} index={index} />
                                            <div className="">
                                                {(form.formState.errors.business?.weeks?.[index]?.name?.message ||
                                                    form.formState.errors.business?.weeks?.[index]?.initial?.message ||
                                                    form.formState.errors.business?.weeks?.[index]?.end?.message) && (
                                                        <span className="text-xs text-red-300">
                                                            {form.formState.errors.business?.weeks?.[index]?.name?.message || form.formState.errors.business?.weeks?.[index]?.initial?.message ||
                                                                form.formState.errors.business?.weeks?.[index]?.end?.message}
                                                        </span>
                                                    )}
                                            </div>

                                        </div>

                                    ))}
                                </div>
                            </FieldGroup>
                        }
                        <div className="flex flex-col items-start w-full mt-4">
                            {weeks.filter(wk=>wk.active).length == 7 ?
                                <AgenrapLinkButton variant={"purplerap"} hrefLink={`/dashboard/journey/list?bns=${tgBns}`} className="w-full flex justify-center items-center" plusClassName="flex justify-center w-full items-center">
                                    <Watch color="#fff" size={25} />
                                    <p className="font-tree md:text-2xl text-lg ">Ver Adicionados</p></AgenrapLinkButton>
                                :
                                <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid} className={`${!form.formState.isValid ? `cursor-not-allowed` : ""} flex justify-center w-full items-center`}>
                                    {isPending ? <div className="flex relative" >
                                        <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                                        <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                                    </div> : <p className="flex items-center gap-1">Salvar expediente</p>}
                                </AgenrapButton>}
                        </div>
                    </div>

                </section>


            </form>
        </Form >
    )
}