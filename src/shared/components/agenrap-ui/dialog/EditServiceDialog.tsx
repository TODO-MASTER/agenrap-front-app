'use client'
import { Dispatch, SetStateAction, useEffect, useState, } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";

import AgenrapButton from "../button/AgenrapButton";
import { BadgePlus, CalendarClockIcon, LoaderCircle, X } from "lucide-react";
import AgenrapLinkButton from "../button/AgenrapLinkButton/AgenrapLinkButton";
import { useBusinessStore } from "@/src/shared/store/useBusinessStore";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBusinessServiceSchema, EditBusinessServiceSchema, initialBusinessServiceSchema, InitialBusinessServiceSchema } from "@/src/shared/types/Business/InitialBusinessServiceSchema";
import { useBusinessActions } from "@/src/features/business/hooks/useBusinessActions";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import AgenrapInput from "../input/AgenrapInput";
import { Slider } from "../../ui/slider";
import { timeUtils } from "@/src/shared/utils/timeUtils";
import { currencyUtils } from "@/src/shared/utils/currencyUtils";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
interface EditServiceDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}
export default function EditServiceDialog({ open, setOpen }: EditServiceDialogProps) {
    const selectedService = useBusinessStore(bs => bs.selectedService)
    const { handleEditServiceAction, isPending: serviceIsPending } = useBusinessActions()
    const [timeService, setTimeService] = useState([(3600 / 60) * 30])
    const linkButtonResponsive = "md:w-fit  md:rounded-none md:h-21.25 md:px-3  md:gap-x-1 md:items-center md:self-auto  md:justify-center " +
        " items-center rounded-md  justify-start  w-full  flex  w-fit self-end px-4 py-2 h-fit gap-x-2"
    const form = useForm<EditBusinessServiceSchema>({
        resolver: zodResolver(editBusinessServiceSchema),
           mode: "onChange",
        defaultValues: {
            
                    name: "",
                    price: "",
                    duration: ""
                
            },
        },
     
    );
    const { errors } = form.formState



    const stagingHasError = !!errors.name || !!errors.price
    const stagingEmpty = !form.watch("name") || !form.watch("price")

useEffect(() => {
    if (selectedService) {
        form.reset({
            name: selectedService.name,
            duration: selectedService.duration,
            price:currencyUtils.fromCents(selectedService!.value),
        })
        let cursedDurationNormalize = timeUtils.toMinutes(selectedService.duration)
        setTimeService([cursedDurationNormalize*60])
    }
}, [selectedService])

    return (


        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent
                className="flex flex-col w-full gap-y-6 bg-[#2e2e2e] border-0 p-0"
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <DialogHeader className="flex w-full justify-start px-8 py-4 border-b border-(--agenrap-purple-500)">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <CalendarClockIcon size={25} color="#fff" />
                            <p className="font-tree text-white text-2xl font-semibold">Editar um serviço</p>
                        </div>
                        <button type="button" onClick={() => setOpen(false)}>
                            <X size={25} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>
               
                <div className="flex flex-col w-full">



                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => handleEditServiceAction(values,setOpen))}
                            className="flex flex-col w-full "
                        >

                            <div className="flex flex-wrap md:flex-nowrap w-full pb-2 h-full  gap-y-2  ">
                                <div className="bg-(--agenrap-gray-800)  w-full p-8 pb-12 flex flex-col gap-y-4 min-h-full">
                                    <h4 className="font-tree font-bold break-all text-(--agenrap-yellow-200) text-3xl text-center">{selectedService?.name}</h4>
                                    <FormField
                                        control={form.control}
                                        name="name"
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
                                        name="price"
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
                                    <AgenrapButton disabled={timeService.length < 1 || stagingHasError || stagingEmpty} variant={"purplerap"} type="submit" onClick={async () => {
                                        const valid = await form.trigger(["name", "price"])
                                        form.setValue("duration",timeService.toString())
                                        if (!valid) return
                                    }} className={`flex gap-x-2 justify-center bg-(--agenrap-yellow-200) items-center  mb-2 ${timeService.length < 1 || stagingHasError || stagingEmpty ? "cursor-not-allowed opacity-70" : ""}`} >
                                     
                                        { serviceIsPending? <div className="flex relative" >
                                    <Image src={macroLogo} alt="" loading="eager" className="w-10 h-10 opacity-15 animate-pulse" />
                                    <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                                </div>:<div className="flex gap-x-2 justify-center items-center p-2 ">   <BadgePlus width={30} height={30} color="#000" />    <p className="font-tree text-lg text-black">Adicionar</p></div>}
                                    
                                    </AgenrapButton>
                                </div>
                            </div>
                        </form>
                    </Form>

                    {/* <div className="flex gap-x-3 w-full ">
                        <AgenrapLinkButton
                        hrefLink="/appointments?mode=list"
                            className="w-full"
                            onClick={() => setOpen(false)}
                    
                        >
                            Voltar
                        </AgenrapLinkButton>
                         
                        <AgenrapButton
                            className="w-full"
                          onClick={() => handleJoinScheduleByRap(business.name)}
                        >
                            Adicionar
                        </AgenrapButton>
                    </div> */}
                </div>
            </DialogContent>
        </Dialog>
    )
}