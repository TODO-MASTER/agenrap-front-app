'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { CalendarPlus, LoaderCircle, LucideSkipBack, X, AlertTriangle, RotateCcw, CalendarX2 } from "lucide-react"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { useRouter, useSearchParams } from "next/navigation"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/agenrap-calendar"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { ScrollArea, ScrollBar } from "@/src/shared/components/ui/scroll-area"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { BusinessCustomer } from "@/src/features/business/types"
import { SlotRes } from "@/src/shared/types/slots.types"
import { GenerateSlots } from "@/src/shared/services/slot.service"
import { dateUtils } from "@/src/shared/utils/date.utils"
import AgenrapServiceSelect from "@/src/shared/components/agenrap-ui/select/AgenrapServiceSelect"
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions"
import { GetNextAppointments } from "@/src/shared/services/appointment.service"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import SlotButton from "@/src/shared/components/agenrap-ui/button/slot-button"

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
type AppointmentItem = AppointmentCancelRes['data'][number]

interface ScheduleCustomerDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  customer: BusinessCustomer | null
}

type Step = 'check' | 'hasActive' | 'schedule'

export default function ScheduleCustomerDialog({ open, setOpen, customer }: ScheduleCustomerDialogProps) {
  const { isSaveAppointmentPending, handleMonthChange, handleCancelAppointmentAction, isStartCancelApptTransition } = useCustomerActions()
  const { handleManagerSaveAppointment } = useBusinessActions()
  const business = useBusinessStore(bsnCtx => bsnCtx.business)
  const services = useBusinessStore(bsnCtx => bsnCtx.business?.services)
  const router = useRouter()
  const useSearchParam = useSearchParams()

  const [step, setStep] = useState<Step>('check')
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [activeAppointment, setActiveAppointment] = useState<AppointmentItem | null>(null)

  const [date, setDate] = useState<Date | undefined>()
  const [slots, setSlots] = useState<SlotRes | null>(null)
  const [slotLoading, setSlotLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [fullDays, setFullDays] = useState<string[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)

  // Reset completo ao fechar
  useEffect(() => {
    if (!open) {
      setStep('check')
      setDate(undefined)
      setSlots(null)
      setSelectedSlot(null)
      setSelectedServiceId(null)
      setActiveAppointment(null)
      setLoadingCheck(false)
    }
  }, [open])

  useEffect(() => {
    if (!open || !customer || !business) return
    const check = async () => {
      setLoadingCheck(true)
      try {
        const res = await GetNextAppointments(business.id, customer.userId, customer.customerId)
        const active = res?.data?.[0] ?? null
        setActiveAppointment(active)
        setStep(active ? 'hasActive' : 'schedule')
      } finally {
        setLoadingCheck(false)
      }
    }
    check()
  }, [open, customer, business])


  useEffect(() => {
    if (!date || !selectedServiceId) return
    const handleGenerateSlots = async () => {
      setSlotLoading(true)
      try {
        const targetSlots = await GenerateSlots(
          selectedServiceId,
          dateUtils.toDateString(date),
          dateUtils.getWeekDay(date)
        )
        setSlots(targetSlots)
      } finally {
        setSlotLoading(false)
      }
    }
    handleGenerateSlots()
    setSelectedSlot(null)
  }, [date, selectedServiceId])

const handleServiceSelect = (serviceId: number) => {
    setSelectedServiceId(serviceId)
    setSlots(null)
    setSelectedSlot(null)
    const params = new URLSearchParams(useSearchParam.toString())
    params.set("svs", String(serviceId))
    router.replace(`?${params.toString()}`, { scroll: false })
    handleMonthChange(new Date(), setFullDays, serviceId)
}

  const handleCancelAndProceed = () => {
    if (!activeAppointment || !business) return
    handleCancelAppointmentAction(
      activeAppointment.appointmentId,
      activeAppointment.businessId,
      customer!.userId??null,customer!.customerId??null,
      () => {
        router.refresh()
        setActiveAppointment(null)
        setStep('schedule')
      }
    )
  }

  const serviceNotSelected = !selectedServiceId
  const saveDisabled = !date || !selectedSlot || serviceNotSelected

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        style={{ width: 'clamp(320px, 80vw, 900px)', maxWidth: 'none' }}
        className="flex flex-col gap-y-0 bg-[#2e2e2e] border-0 p-0 overflow-hidden"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <DialogHeader className="flex w-full justify-start px-6 py-4 border-b border-(--agenrap-purple-500)/10 shrink-0">
          <DialogTitle className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <CalendarPlus className="w-6 h-6 shrink-0" color="#FFE082" />
              <div className="flex flex-col">
                <p className="font-tree text-white text-lg font-semibold leading-tight">Agendar</p>
                {customer && (
                  <p className="font-tree text-(--agenrap-purple-500) text-sm font-normal leading-tight">
                    {customer.firstName}
                    {customer.telephone && (
                      <span className="text-white/30 ml-1">· {customer.telephone}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)}>
              <X size={22} color="red" />
            </button>
          </DialogTitle>
        </DialogHeader>
        {step === 'check' && (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-12">
            <div className="flex relative justify-center items-center">
              <Image src={macroLogo} alt="" className="w-12 h-12 opacity-15 animate-pulse" />
              <LoaderCircle className="animate-spin absolute w-12 h-12" color="#FFE082" />
            </div>
            <p className="font-tree text-white/50 text-sm">Verificando agendamentos ativos...</p>
          </div>
        )}
        {step === 'hasActive' && activeAppointment && (() => {
          const apptDate = dateUtils.fromDateString(activeAppointment.appointmentDate)
          const day = apptDate.getDate()
          const month = MONTHS[apptDate.getMonth()]
          const hour = activeAppointment.appointmentHour.slice(0, 5)
          const price = (activeAppointment.serviceValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

          return (
            <div className="flex flex-col gap-4 px-5 py-5">
              <div className="flex items-start gap-3 bg-(--agenrap-yellow-200)/10 border border-(--agenrap-yellow-200)/20 rounded-xl px-4 py-3">
                <AlertTriangle size={18} className="text-(--agenrap-yellow-200) shrink-0 mt-0.5" />
                <p className="font-tree text-sm text-(--agenrap-yellow-200)/80 leading-snug">
                  Este cliente já possui um agendamento ativo. Para criar um novo, é necessário cancelar o atual primeiro.
                </p>
              </div>

              <div className="flex items-stretch rounded-xl overflow-hidden bg-(--agenrap-gray-800) border border-white/5">
                <div className="w-1.5 shrink-0" style={{ background: 'linear-gradient(to bottom, #FFE082, #C46210)' }} />
                <div className="flex flex-col items-center justify-center px-5 py-4 border-r border-white/5 min-w-20">
                  <span className="text-[9px] font-black tracking-[0.35em] text-(--agenrap-yellow-200) uppercase">{month}</span>
                  <span className="text-[2.5rem] font-black leading-none text-white mt-0.5">{day}</span>
                  <span className="text-[9px] tracking-widest font-bold mt-1 text-gray-500 uppercase">{activeAppointment.workingPeriodWeek}</span>
                </div>
                <div className="flex flex-col justify-center gap-1.5 px-4 py-4 flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{activeAppointment.serviceName}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-(--agenrap-yellow-200)">{hour}</span>
                    <span className="text-gray-600 text-[10px]">·</span>
                    <span className="text-xs text-gray-400">{activeAppointment.serviceDuration}</span>
                  </div>
                </div>
                <div className="flex items-center px-4 shrink-0">
                  <span className="text-sm font-bold text-(--agenrap-green-300)">{price}</span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-x-2 px-4 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors text-sm font-tree"
                >
                  <LucideSkipBack size={14} />
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleCancelAndProceed}
                  disabled={isStartCancelApptTransition}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-(--agenrap-purple-500)/15 border border-(--agenrap-purple-500)/30 hover:bg-(--agenrap-purple-500)/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStartCancelApptTransition
                    ? <>
                      <LoaderCircle size={15} className="animate-spin" color="#BB77EE" />
                      <span className="font-tree text-sm text-(--agenrap-purple-500)">Cancelando...</span>
                    </>
                    : <>
                      <RotateCcw size={15} color="#BB77EE" />
                      <span className="font-tree text-sm text-(--agenrap-purple-500)">Cancelar e reagendar</span>
                    </>
                  }
                </button>
              </div>
            </div>
          )
        })()}

        {step === 'schedule' && (
          <>
            <div className="px-4 pt-4 shrink-0">
              <AgenrapServiceSelect
                services={services ?? []}
                onSelect={handleServiceSelect}
                placeholder="Selecione o serviço para continuar"
              />
            </div>

            <ScrollArea className="h-100 w-full">
<ScrollBar className={`[&>[data-slot=scroll-area-thumb]]:rounded-full [&>[data-slot=scroll-area-thumb]]:bg-(--agenrap-yellow-200) ${serviceNotSelected ? "[&>[data-slot=scroll-area-thumb]]:opacity-40 [&>[data-slot=scroll-area-thumb]]:pointer-events-none" : ""}`} />
              <div className={`flex flex-col h-full md:flex-row gap-4 p-4 overflow-y-auto flex-1 transition-opacity duration-200 ${serviceNotSelected ? "opacity-40 pointer-events-none select-none" : "opacity-100"}`}>
                <div className="md:w-[42%] w-full shrink-0">
                  <AgenrapCalendar
                    fullDays={fullDays}
                    setFullDays={setFullDays}
                    business={business!}
                    date={date}
                    setDate={setDate}
                    className="w-full"
                  />
                </div>

                <div className="md:flex-1 w-full flex flex-col rounded-lg overflow-hidden min-h-45">
                  <div className="px-3 py-2 bg-white/15 rounded-t-md shrink-0">
                    <p className="font-tree font-medium text-base text-white">Horários disponíveis</p>
                  </div>

                  {slotLoading ? (
                    <div className="flex relative justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1">
                      <Image src={macroLogo} alt="" className="w-16 h-16 opacity-15 animate-pulse" />
                      <LoaderCircle className="animate-spin absolute w-16 h-16" color="#F5E6CC" />
                    </div>
                  ) : slots ? (
                    slots.data.slots.length === 0 ? (
                      <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                        <p className="font-tree text-white text-center text-base">Ops, agenda lotada neste dia</p>
                      </div>
                    ) : (
                      <div className="bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1">
                        <ScrollArea className="h-56 lg:h-full w-full">
                                                   <ScrollBar className="[&>[data-slot=scroll-area-thumb]]:rounded-full [&>[data-slot=scroll-area-thumb]]:bg-(--agenrap-yellow-200)" />
                          <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1 p-2 pb-0">
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
                        </ScrollArea>
                      </div>
                    )
                  ) : (
                    <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                      <p className="font-tree text-white text-center text-base font-semibold">
                        {serviceNotSelected ? "Selecione um serviço acima" : "Selecione um dia para ver os horários"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            <div className="flex gap-x-3 px-4 pb-5 pt-2 border-t border-(--agenrap-purple-500)/20 shrink-0">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center gap-x-2 px-4 py-2 rounded-md border border-(--agenrap-purple-500)/30 text-white/60 hover:text-white hover:border-(--agenrap-purple-500)/60 transition-colors"
              >
                <LucideSkipBack size={16} />
                <p className="font-tree text-sm">Voltar</p>
              </button>

              <AgenrapButton
               onClick={() => handleManagerSaveAppointment(
    dateUtils.toDateString(date!),
    selectedSlot!,
    customer!.userId ?? null,
    customer!.customerId ?? null,
    customer!.fullName,
    () => {
        setOpen(false)
        router.refresh()
    }
)}
                disabled={saveDisabled}
                className={`flex-1 py-3 transition-all duration-200 ${saveDisabled ? "bg-(--agenrap-gray-800) border border-(--agenrap-purple-500)/20 cursor-not-allowed" : ""}`}
              >
                {isSaveAppointmentPending ? (
                  <div className="flex relative justify-center items-center">
                    <Image src={macroLogo} alt="" className="w-8 h-8 opacity-15 animate-pulse" />
                    <LoaderCircle className="animate-spin absolute w-8 h-8" color="#F5E6CC" />
                  </div>
                ) : (
                  <p className={`font-tree transition-colors ${saveDisabled ? "text-white/30" : ""}`}>
                    Salvar agendamento
                  </p>
                )}
              </AgenrapButton>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}