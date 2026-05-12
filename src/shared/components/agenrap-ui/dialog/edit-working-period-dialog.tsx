'use client'
import { Dispatch, SetStateAction, useEffect, } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";

import AgenrapButton from "../button/agenrap-button";
import { AlarmClock, AlarmClockOff, LoaderCircle, LucideSkipBack, Pencil, TimerReset, WandSparklesIcon, X } from "lucide-react";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import AgenrapInput from "../input/agenrap-input";

import { translateDayName } from "@/src/shared/utils/time.utils";

import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import { editBusinessWorkingPeriodSchema, EditBusinessWorkingPeriodSchema } from "@/src/features/business/schemas/business-week.schema";
interface EditServiceDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}
export default function EditWorkingPeriodDialog({ open, setOpen }: EditServiceDialogProps) {
    const selectedWorkingPeriod = useBusinessStore(bs => bs.selectedWorkingPeriod)
    const { handleEditWorkingPeriodAction, isPending: wkpEditIsPending } = useBusinessActions()
    const form = useForm<EditBusinessWorkingPeriodSchema>({
        resolver: zodResolver(editBusinessWorkingPeriodSchema),
        mode: "onChange",
        defaultValues: {

            name: "",
            initial: "",
            end: ""

        },
    },

    );
    const { errors } = form.formState



    const stagingHasError = !!errors.end || !!errors.initial
    const stagingEmpty = !form.watch("initial") || !form.watch("end")

    useEffect(() => {
        if (selectedWorkingPeriod) {
            form.reset({
                name: selectedWorkingPeriod.week,
                initial: selectedWorkingPeriod.initial.slice(0, 5),
                end: selectedWorkingPeriod.end.slice(0, 5)
            })
        }
    }, [selectedWorkingPeriod])

    return (


        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent
                className="flex flex-col w-full gap-y-6 bg-[#2e2e2e] border-0 p-0"
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <DialogHeader className="flex w-full justify-start px-8 py-4 border-b border-(--agenrap-purple-500)/10">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <TimerReset color="#fff" className="md:w-12 md:h-12 w-8 h-8" />
                            <div>
                                <p className="font-tree text-white md:text-2xl text-lg font-semibold">Alterar Expediente </p>
                                <div className="bg-(--agenrap-purple-500)/10 border w-fit border-(--agenrap-purple-500)/15 p-1 rounded-lg">
                                    <p className="font-tree font-normal break-all  text-(--agenrap-purple-500) text-lg ">{selectedWorkingPeriod?.week ? translateDayName(selectedWorkingPeriod.week) : ""}</p>
                                </div>

                            </div>
                        </div>
                        <button type="button" onClick={() => setOpen(false)}>
                            <X size={25} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col w-full">



                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => handleEditWorkingPeriodAction(values,setOpen))}
                            className="flex flex-col w-full "
                        >


                            <div className="bg-(--agenrap-gray-800) rounded-b-md w-full  py-2 px-4  flex flex-col  gap-4 h-full">

                                <div className="flex gap-2 items-center justify-end w-full">
                                    <FormField
                                        control={form.control}

                                        name="initial"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <AgenrapInput type="time" variant="cyberYellowRap" label="De" removeFormMessage left icon={<AlarmClock />} placeholder="Ex. Corte Masculino" value={field.value}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                                form.trigger(['initial', 'end'])
                                                        }} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="end"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <AgenrapInput type="time" variant="cyberYellowRap" label="Até" left icon={<AlarmClockOff />} placeholder="Ex. Corte Masculino" removeFormMessage value={field.value}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                                form.trigger(['initial', 'end'])
                                                        }} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    {(errors.name || errors.initial || errors.end) && (
                                        <span className="text-xs text-red-300">
                                            {errors.name?.message || errors.initial?.message || errors.end?.message}
                                        </span>
                                    )}
                                </div>
                                <div className="bg-(--agenrap-purple-500)/10 border w-full items-center flex gap-x-1 border-(--agenrap-purple-500)/15 px-2 py-3 rounded-lg">
                                    <WandSparklesIcon color="#fff" size={24} />
                                    <div className="">
                                        <p className="font-tree font-normal break-all  text-white md:text-sm text-xs">Informe o horário de início e fim para <span className="text-(--agenrap-yellow-200)">{selectedWorkingPeriod?.week ? translateDayName(selectedWorkingPeriod.week) : ""}</span></p>
                                    </div></div>
                                <div className="flex gap-2 items-center justify-end w-full">
                                    <AgenrapButton  variant={"purplerap"} type="button" onClick={() => setOpen(!open)} className={`flex gap-x-2 justify-center h-fit w-fit  items-center  mb-2 `} >
                                         <div className="flex gap-x-2 justify-center items-center p-2 ">   <LucideSkipBack width={24} height={24} color="#fff" />    <p className="font-tree text-lg font-medium ">voltar</p></div>


                                    </AgenrapButton>

                                    <AgenrapButton disabled={stagingHasError || stagingEmpty} variant={"purplerap"} type="submit" onClick={async () => {
                                        const valid = await form.trigger(["initial", "end"])
                                        if (!valid) return
                                    }} className={`flex gap-x-2 justify-center h-fit w-fit bg-(--agenrap-yellow-200) items-center  mb-2 ${stagingHasError || stagingEmpty ? "cursor-not-allowed opacity-70" : ""}`} >

                                        { wkpEditIsPending? <div className="flex relative" >
                                            <Image src={macroLogo} alt="" loading="eager" className="w-10 h-10 opacity-15 animate-pulse" />
                                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                                        </div> : <div className="flex gap-x-2 justify-center items-center p-2 ">   <Pencil width={24} height={24} color="#000" />    <p className="font-tree text-lg font-medium text-black">Salvar</p></div>}

                                    </AgenrapButton>
                                </div>
                            </div>


                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}