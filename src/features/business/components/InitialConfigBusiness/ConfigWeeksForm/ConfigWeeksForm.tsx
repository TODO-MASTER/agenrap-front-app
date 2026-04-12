'use client'

import { useFieldArray, useForm } from "react-hook-form";
import { initialBusinessWeeksSchema, InitialBusinessWeeksSchema } from "../../../../../shared/types/InitialBusinessWeeksSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import GroupButtonWeeks from "./GroupButtonWeeks";
import { FieldGroup } from "@/src/shared/components/ui/field";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/AgenrapInput";
import { DeleteIcon, LoaderCircle } from "lucide-react";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import { useBusinessActions } from "../../../hooks/useBusinessActions";

export default function ConfigWeeksForm() {
    const {handleCreateWkPeriodAction, isPending}=useBusinessActions()
    const form = useForm<InitialBusinessWeeksSchema>({

        resolver: zodResolver(initialBusinessWeeksSchema),
        defaultValues: {
            business: {
                weeks: [
                    {
                        name: "Seg",
                        initial: "08:00",
                        end: "18:00"
                    },
                    {
                        name: "Ter",
                        initial: "08:00",
                        end: "18:00"
                    },
                    {
                        name: "Qua",
                        initial: "08:00",
                        end: "18:00"
                    },
                    {
                        name: "Qui",
                        initial: "08:00",
                        end: "18:00"
                    },
                    {
                        name: "Sex",
                        initial: "08:00",
                        end: "18:00"
                    },
                    {
                        name: "Sab",
                        initial: "08:00",
                        end: "18:00"
                    },
                    {
                        name: "Dom",
                        initial: "08:00",
                        end: "18:00"
                    },
                ],

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
                onSubmit={form.handleSubmit((values) => handleCreateWkPeriodAction(values) )}
                className="flex flex-col gap-y-6 mb-6    items-center  "
            >
                <div className="flex flex-col lg:w-[35%] md:w-[55%] w-[80%] my-2">
                    <div className="flex flex-col gap-2">
                        <h1 className=" lg:text-3xl md:text-2xl text-lg text-center   font-tree font-bold mt-4 mb-1">Definindo informações de expediente</h1>
                        <div className="flex flex-col">
                            <p className=" font-tree font-medium md:text-lg text-sm ">2. Fornecer dias da semana</p>
                            <div className="flex gap-1 mt-2  h-full w-full mb-4">
                                <span className="flex min-h-max w-1.5 bg-(--agenrap-blue-500)"></span>
                                <div className="flex flex-col ">
                                    <p className="font-tree md:text-sm text-xs">disponibilizamos um expediente padrão fique a vontade para mudar</p>
                                    <p className="font-tree md:text-sm text-xs">para adicionar uma nova semana clique nos botões</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="flex flex-col ">
                        <div className="bg-(--agenrap-brown-500)/15 flex justify-center md:py-2 py-1 my-2 items-center">
                            <GroupButtonWeeks fields={fields} append={append} form={form} />
                        </div>
                        <FieldGroup className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] place-items-center w-full  gap-2">
                            {fields.map((wk, index) => (
                                <div className="flex flex-col  w-fit h-full  " key={wk.id}>
                                    <div className="flex  justify-center " >
                                        <div className="flex gap-x-1 py-1  " >

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
                                            <FormField
                                                control={form.control}
                                                name={`business.weeks.${index}.initial`}

                                                render={({ field }) => (
                                                    <FormItem className="">
                                                        <FormControl>
                                                            <AgenrapInput
                                                                id={`${index}`}
                                                                type="time"

                                                                value={field.value}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    form.trigger(`business.weeks.${index}.end`);
                                                                }}
                                                                label="De"
                                                                variant="brownrap"
                                                                autoComplete="off"
                                                                placeholder="nome do seu negócio ex:salao-agenrap"
                                                                allErrors={"calyBlackInputError"}
                                                                className="[&::-webkit-calendar-picker-indicator]:hidden"

                                                                removeFormMessage={true}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`business.weeks.${index}.end`}

                                                render={({ field }) => (
                                                    <div className="flex items-center gap-x-1">
                                                        <FormItem >
                                                            <FormControl >

                                                                <AgenrapInput
                                                                    id={`${index}`}
                                                                    type="time"

                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        form.trigger(`business.weeks.${index}.initial`);
                                                                    }}
                                                                    label="Fim"
                                                                    variant="brownrap"
                                                                    autoComplete="off"
                                                                    placeholder="nome do seu negócio ex:salao-agenrap"
                                                                    allErrors={"calyBlackInputError"}
                                                                    className="[&::-webkit-calendar-picker-indicator]:hidden"

                                                                    removeFormMessage={true}
                                                                />



                                                            </FormControl>

                                                        </FormItem>
                                                        <button type="button" className=" border-0 hover:animate-pulse h-full  mt-[40%] cursor-pointer" onClick={() => remove(index)}><DeleteIcon color="red" /></button>
                                                    </div>

                                                )}
                                            />
                                        </div>

                                    </div>
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
                        </FieldGroup>

                    </section>
                </div>
                <div className="flex flex-col items-start lg:w-[35%] md:w-[55%] w-[80%] ">
                    <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid} className={`${!form.formState.isValid ? `cursor-not-allowed` : ""} flex justify-center w-full items-center`}>
                        {isPending ? <div className="flex relative" >
                            <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                        </div> : <p className="flex items-center gap-1">Salvar expediente</p>}
                    </AgenrapButton>
                </div>
            </form>
        </Form>
    )
}