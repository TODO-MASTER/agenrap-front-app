'use client'
import { macroLogo } from "@/src/assets/images";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/AgenrapCalendar";
import { ISlotRes } from "@/src/shared/interfaces/responses/ISlotsRes";
import { GenerateSlots } from "@/src/shared/services/Slots/SlotsService";
import { useBusinessStore } from "@/src/shared/store/useBusinessStore";
import { dateUtils } from "@/src/shared/utils/dateUtils";
import { CalendarClockIcon, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useCustomerActions } from "../hooks/useCustomerActions";

export default function QuickSchedulingSection() {
    const { handleSaveAppointment, isSaveAppointmentPending, handleMonthChange } = useCustomerActions()
    const business = useBusinessStore(bsnCtx => bsnCtx.business)
    const [date, setDate] = useState<Date | undefined>()
    const [slots, setSlots] = useState<ISlotRes | null>(null)
    const [slotLoading, setSlotLoading] = useState<boolean>(false)
    const [selectedSlot, setSelectedSlot] = useState<string | null>()
    const [fullDays, setFullDays] = useState<string[]>([])
    const useSearchParam = useSearchParams()


    useEffect(() => {
        const handleGenerateSlots = async () => {
            setSlotLoading(true)
            try {
                const targetSlots = await GenerateSlots(Number(useSearchParam.get("svs")), dateUtils.toDateString(date!), dateUtils.getWeekDay(date!))
                setSlots(targetSlots)
            }
            finally {
                setSlotLoading(false)
            }
        }
        if (date != null) {
            handleGenerateSlots()
        }
        setSelectedSlot(null)

    }, [date])

    useEffect(() => {
        handleMonthChange(new Date(), setFullDays)
    }, [])

    return (
        <section className="flex flex-col gap-y-2 ">
            <div className="flex gap-x-1 items-center px-4 py-2 ">
                <CalendarClockIcon size={35} />
                <p className="font-tree font-bold text-4xl  text-black  ">Dias Livres</p>
            </div>
            <div className="flex md:flex-nowrap   p-2 flex-wrap gap-x-5 bg-(--agenrap-yellow-200)/50 gap-y-4 justify-center ">
                <AgenrapCalendar fullDays={fullDays} setFullDays={setFullDays} business={business!} date={date} setDate={setDate} className="lg:w-[50%]  w-full" />


                <div className="lg:w-[50%] w-full flex flex-col    rounded-lg       ">
                    <div className="p-2 flex w-full  rounded-t-md bg-(--agenrap-gray-800)">
                        <p className="font-tree font-medium text-2xl text-(--agenrap-yellow-200)  ">Horários disponiveis </p>
                    </div>
                    {slotLoading ? <div className="flex relative justify-center items-center  bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full h-full">
                        <Image src={macroLogo} alt="" className="md:w-[80%] md:h-[80%] w-[50%] h-[50%] opacity-15 animate-pulse" />
                        <LoaderCircle className="animate-spin absolute md:w-[80%] md:h-[80%] w-[50%] h-[50%]" color="#F5E6CC" />

                    </div>
                        : slots ?
                            slots.data.slots.length == 0 ?
                                <div className=" p-4 px-2 py-1 pb-2 pt-2 bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 justify-center items-center flex border-(--agenrap-purple-500)/20 w-full h-full">
                                    <p className="font-tree text-white text-center md:text-2xl text-lg ">Ops, Agenda lotada, neste dia</p></div> :
                                <div className="   bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full h-full ">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] items-start gap-1 p-4 px-2 py-1 pb-2 pt-2   w-full ">

                                        {slots?.data?.slots?.map((hrs, index) => (
                                            <button type="button" key={index} className={`px-6 py-4  group  bg-(--agenrap-brown-200) flex justify-center items-center cursor-pointer  ${selectedSlot == hrs ? "bg-(--agenrap-purple-500) rounded-xs " : "hover:bg-(--agenrap-purple-500) "} `} onClick={() => setSelectedSlot(hrs)}>
                                                <p className={`text-center text-lg text-black ${selectedSlot == hrs ? " text-white" : "group-hover:text-white"}`}>{hrs}</p>
                                            </button>
                                        ))}
                                    </div> </div> : <div className=" p-4 px-2 py-1 pb-2 pt-2 bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 justify-center items-center flex border-(--agenrap-purple-500)/20 w-full h-full"><p className="font-tree text-white text-2xl font-semibold text-center">Selecione um dia para ver os horários</p></div>
                    }

                </div>

            </div>
            <AgenrapButton onClick={() => handleSaveAppointment(dateUtils.toDateString(date!), selectedSlot!)} disabled={!date || !selectedSlot} className={`${!date || !selectedSlot ? "cursor-not-allowed opacity-50 hover:opacity-50" : ""} mt-5 py-4`}>
                {isSaveAppointmentPending ? <div className="flex relative justify-center items-center" >
                    <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                    <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                </div> :
                    "Salvar agendamento"}</AgenrapButton>
        </section>
    )
}

