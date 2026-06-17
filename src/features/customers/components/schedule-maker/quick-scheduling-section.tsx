'use client'
import { macroLogo } from "@/src/assets/images";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/agenrap-calendar";
import { GenerateSlots } from "@/src/shared/services/slot.service";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { dateUtils } from "@/src/shared/utils/date.utils";
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types";
import { CalendarClockIcon, CalendarX2, LoaderCircle, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCustomerActions } from "../../hooks/use-customer-actions";
import { SlotRes } from "@/src/shared/types/slots.types";
import SlotButton from "@/src/shared/components/agenrap-ui/button/slot-button";

type AppointmentItem = AppointmentCancelRes['data'][number]

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]

type Props = {
    existingAppointment: AppointmentItem | null
}

export default function QuickSchedulingSection({ existingAppointment }: Props) {
    const { handleSaveAppointment, isSaveAppointmentPending, handleMonthChange, handleCancelAppointmentAction, isStartCancelApptTransition } = useCustomerActions()
    const business = useBusinessStore(bsnCtx => bsnCtx.business)
    const [date, setDate] = useState<Date | undefined>()
    const [slots, setSlots] = useState<SlotRes | null>(null)
    const [slotLoading, setSlotLoading] = useState<boolean>(false)
    const [selectedSlot, setSelectedSlot] = useState<string | null>()
    const [fullDays, setFullDays] = useState<string[]>([])
    const [showBooking, setShowBooking] = useState(!existingAppointment)
    const useSearchParam = useSearchParams()
    const router = useRouter()


    useEffect(() => {
        setShowBooking(!existingAppointment)
    }, [existingAppointment])

    useEffect(() => {
        const handleGenerateSlots = async () => {
            setSlotLoading(true)
            try {
                const targetSlots = await GenerateSlots(Number(useSearchParam.get("svs")), dateUtils.toDateString(date!), dateUtils.getWeekDay(date!))
                setSlots(targetSlots)
            } finally {
                setSlotLoading(false)
            }
        }
        if (date != null) handleGenerateSlots()
        setSelectedSlot(null)
    }, [date])

      useEffect(() => {
        handleMonthChange(new Date(), setFullDays)
      }, [date])

    if (!showBooking && !business?.isOwner && existingAppointment) {
        const apptDate = dateUtils.fromDateString(existingAppointment.appointmentDate)
        const day = apptDate.getDate()
        const month = MONTHS[apptDate.getMonth()]
        const hour = existingAppointment.appointmentHour.slice(0, 5)
        const price = (existingAppointment.serviceValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        return (
            <section className="flex flex-col gap-y-3 mt-2">
                <div className="flex gap-x-2 items-center px-1 py-2 border-b border-(--agenrap-brown-500)/15 mb-1">
                    <CalendarX2 size={28} className="text-(--agenrap-brown-500)" />
                    <p className="font-tree font-bold text-3xl text-black">Reagendamento</p>
                </div>

                <div className="flex flex-col rounded-xl overflow-hidden shadow-lg shadow-black/10 border border-(--agenrap-brown-500)/15">
                    <div className="bg-(--agenrap-brown-500) px-5 py-3 flex items-center gap-2.5">
                        <span className="w-[3px] h-4 rounded-full bg-(--agenrap-yellow-200) shrink-0" />
                        <p className="font-tree font-semibold text-white text-xs tracking-widest uppercase">Agendamento ativo</p>
                    </div>

                    <div className="bg-white p-4 flex flex-col gap-3">
                        <div className="flex items-stretch rounded-xl overflow-hidden bg-(--agenrap-gray-800) border border-white/5">
                            <div className="w-1.5 shrink-0" style={{ background: 'linear-gradient(to bottom, #FFE082, #C46210)' }} />

                            <div className="flex flex-col items-center justify-center px-5 py-4 border-r border-white/5 min-w-[5rem]">
                                <span className="text-[9px] font-black tracking-[0.35em] text-(--agenrap-yellow-200) uppercase">{month}</span>
                                <span className="text-[2.5rem] font-black leading-none text-white mt-0.5">{day}</span>
                                <span className="text-[9px] tracking-widest font-bold mt-1 text-gray-500 uppercase">{existingAppointment.workingPeriodWeek}</span>
                            </div>

                            <div className="flex flex-col justify-center gap-1.5 px-4 py-4 flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{existingAppointment.serviceName}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-(--agenrap-yellow-200)">{hour}</span>
                                    <span className="text-gray-600 text-[10px]">·</span>
                                    <span className="text-xs text-gray-400">{existingAppointment.serviceDuration}</span>
                                </div>
                            </div>

                            <div className="flex items-center px-4 shrink-0">
                                <span className="text-sm font-bold text-(--agenrap-green-300)">{price}</span>
                            </div>
                        </div>

                        <p className="text-[11px] text-(--agenrap-brown-500)/60 font-tree leading-relaxed px-0.5">
                            Você já possui um agendamento ativo para este serviço. Cancele o atual para escolher um novo horário.
                        </p>

                        <AgenrapButton
                            className="w-full py-3.5 bg-(--agenrap-purple-500) hover:bg-(--agenrap-purple-500)/85 flex items-center justify-center gap-2"
                            onClick={() => handleCancelAppointmentAction(
                                existingAppointment.appointmentId,
                                existingAppointment.businessId,
                                null,null,
                                () =>{      handleMonthChange(new Date(), setFullDays) 
                                     router.refresh()}
                            )}
                        >
                            {isStartCancelApptTransition
                                ? <div className="flex relative">
                                    <Image src={macroLogo} alt="" className="w-7 h-7 opacity-15 animate-pulse" />
                                    <LoaderCircle className="animate-spin absolute w-7 h-7" color="#F5E6CC" />
                                </div>
                                : <div className="flex items-center gap-2">
                                    <RotateCcw size={15} color="#F5E6CC" />
                                    <span className="font-tree font-bold text-(--agenrap-yellow-200)/90 text-sm">Cancelar e Reagendar</span>
                                </div>
                            }
                        </AgenrapButton>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="flex flex-col gap-y-2">
            <div className="flex gap-x-1 items-center px-4 py-2">
                <CalendarClockIcon size={35} />
                <p className="font-tree font-bold text-4xl text-black">Dias Livres</p>
            </div>
            <div className="flex md:flex-nowrap p-2 flex-wrap gap-x-5 bg-(--agenrap-yellow-200)/50 gap-y-4 justify-center">
                <AgenrapCalendar isOwner={business?.isOwner} fullDays={fullDays} setFullDays={setFullDays} business={business!} date={date} setDate={setDate} className="lg:w-[50%] w-full" />

                <div className="lg:w-[50%] w-full flex flex-col rounded-lg">
                    <div className="p-2 flex w-full rounded-t-md bg-(--agenrap-gray-800)">
                        <p className="font-tree font-medium text-2xl text-(--agenrap-yellow-200)">Horários disponiveis</p>
                    </div>
                    {slotLoading
                        ? <div className="flex relative justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full h-full">
                            <Image src={macroLogo} alt="" className="md:w-[80%] md:h-[80%] w-[50%] h-[50%] opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute md:w-[80%] md:h-[80%] w-[50%] h-[50%]" color="#F5E6CC" />
                        </div>
                        : slots
                            ? slots.data.slots.length == 0
                                ? <div className="p-4 px-2 py-1 pb-2 pt-2 bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 justify-center items-center flex border-(--agenrap-purple-500)/20 w-full h-full">
                                    <p className="font-tree text-white text-center md:text-2xl text-lg">Ops, Agenda lotada, neste dia</p>
                                </div>
                                : <div className="bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full h-full">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] items-start gap-1 p-4 px-2 py-1 pb-2 pt-2 w-full">
                                        {slots?.data?.slots?.map((hrs, index) => (
                                            <SlotButton
            key={index}
            time={hrs.time}

            available={hrs.available !== false} 
            blockReason={hrs.blockReason}
            selected={selectedSlot === hrs.time}
            onClick={() => setSelectedSlot(hrs.time)}
        />
                                        ))}
                                    </div>
                                </div>
                            : <div className="p-4 px-2 py-1 pb-2 pt-2 bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 justify-center items-center flex border-(--agenrap-purple-500)/20 w-full h-full">
                                <p className="font-tree text-white text-2xl font-semibold text-center">Selecione um dia para ver os horários</p>
                            </div>
                    }
                </div>
            </div>

            <AgenrapButton onClick={() => handleSaveAppointment(dateUtils.toDateString(date!), selectedSlot!)} disabled={!date || !selectedSlot} className={`${!date || !selectedSlot ? "cursor-not-allowed opacity-50 hover:opacity-50" : ""} mt-5 py-4`}>
                {isSaveAppointmentPending
                    ? <div className="flex relative justify-center items-center">
                        <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                        <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                    </div>
                    : "Salvar agendamento"
                }
            </AgenrapButton>
        </section>
    )
}