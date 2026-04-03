"use client"
import { macroLogo } from "@/src/assets/images";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import { Form } from "@/src/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Link, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import MountUrlBusinessName from "./MountUrlBusinessName";
import { InitialBusinessNameSchema, initialBusinessNameSchema } from "../../../../../shared/types/InitialBuinessNameSchema";
import { useState } from "react";
import { useBusinessActions } from "../../../hooks/useBusinessActions";
export default function InitialConfigBusinessForm() {
    const {handleCreateBusinessAction,isPending}=useBusinessActions()
    const [timeService, setTimeService] = useState([(3600 / 60) * 30])
    const form = useForm<InitialBusinessNameSchema>({

        resolver: zodResolver(initialBusinessNameSchema),
        defaultValues: {
            business: {
                name: ""
             },



        },
        mode: "onChange"
    });



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => handleCreateBusinessAction(values))}
                className="flex flex-col gap-y-2    items-center  "
            >
                <div className="w-full h-full flex flex-col items-center">
                    <MountUrlBusinessName control={form.control} watch={form.watch} form={form} />
                </div>
                {/* <div className="w-full h-full flex flex-col items-center ">
                    <div className="flex flex-col items-start lg:w-[35%] md:w-[55%] w-[80%]">
                        <div className="flex flex-col my-1">
                            <p className=" font-tree font-medium text-2xl">2. Definindo informações de expediente</p>
                            <div className="flex gap-1 mt-2  h-full w-full">
                                <span className="flex min-h-max w-1.5 bg-(--agenrap-blue-500)"></span>
                                <div className="flex flex-col ">
                                    <p className="font-tree text-sm">Oferecemos horários de expediente padrão</p>
                                    <p className="font-tree text-sm">Fique a vontade para modificar e adicionar clicando nos botões</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center ">
                        <section className="flex flex-col  ">
                            <GroupButtonWeeks fields={fields} append={append} form={form} />
                            <FieldGroup className="flex flex-col gap-2 items-center border-0  bg-blue ">
                                {fields.map((wk, index) => (
                                    <div className="flex flex-col   " key={wk.id}>
                                        <div className="flex  justify-center " >
                                            <div className="flex gap-x-1 py-1 w-full  " >

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
                </div>
                <section className="flex flex-col items-start lg:w-[35%] md:w-[55%] w-[80%] ">
                    <div className="">
                        <div className="flex flex-col my-1">
                            <p className=" font-tree font-medium text-2xl">3. Montando menu de serviços</p>
                            <div className="flex gap-1 mt-2  h-full w-full">
                                <span className="flex min-h-max w-1.5 bg-(--agenrap-blue-500)"></span>
                                <div className="flex flex-col ">
                                    <p className="font-tree text-sm">Oferecemos horários de expediente padrão</p>
                                    <p className="font-tree text-sm">Fique a vontade para modificar e adicionar clicando nos botões</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateOccupationSection fields={occupationFields} append={occupationAppend} form={form} timectx={{ timeService: timeService, setTimeService: setTimeService }} remove={occupationRemove} /> */}
                    <div className="flex flex-col items-start lg:w-[35%] md:w-[55%] w-[90%] ">
                        <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid} className={`${!form.formState.isValid ? `cursor-not-allowed` : ""} flex justify-center w-full items-center`}>
                            {isPending ? <div className="flex relative" >
                                <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                                <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                            </div> : <p className="flex items-center gap-1"><Link width={25} height={25}/> Salvar Link</p>}
                        </AgenrapButton>
                    </div>
                {/* </section> */}

            </form>
        </Form>



    )
}