'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { CalendarPlus, LoaderCircle, LucideSkipBack, X, AlertTriangle, RotateCcw } from "lucide-react"
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
import { Professional } from "@/src/features/business/types/professional.types"
import { GetProfessionalsByService } from "@/src/features/business/services/professional.service"
import ProfessionalSelector from "@/src/features/customers/components/business-showcase/selector-professional"
import { WkCtx } from "@/src/shared/types"
import { GetProfessionalWorkingPeriodsForBooking } from "@/src/shared/services/working-period.service"

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
type AppointmentItem = AppointmentCancelRes['data'][number]

interface ScheduleCustomerDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  customer: BusinessCustomer | null
  lockedProfessionalId?: number | null
}

type Step = 'check' | 'hasActive' | 'schedule'

export default function ScheduleCustomerDialog({
  open,
  setOpen,
  customer,
  lockedProfessionalId = null,
}: ScheduleCustomerDialogProps) {
  const { isSaveAppointmentPending, handleMonthChange, handleCancelAppointmentAction, isStartCancelApptTransition } = useCustomerActions()
  const { handleManagerSaveAppointment } = useBusinessActions()
  const business = useBusinessStore(bsnCtx => bsnCtx.business)
  const services = useBusinessStore(bsnCtx => bsnCtx.business?.services)
  const router = useRouter()
  const useSearchParam = useSearchParams()

  const [step, setStep] = useState<Step>('check')
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [slotError, setSlotError] = useState<string | null>(null)
  const [activeAppointment, setActiveAppointment] = useState<AppointmentItem | null>(null)

  const [date, setDate] = useState<Date | undefined>()
  const [slots, setSlots] = useState<SlotRes | null>(null)
  const [slotLoading, setSlotLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [fullDays, setFullDays] = useState<string[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null)
  const [professionalWeeks, setProfessionalWeeks] = useState<WkCtx[] | null>(null)

  const needsProfessional = professionals.length > 0
  const hasValidProfessional =
    selectedProfessionalId != null && selectedProfessionalId > 0

  useEffect(() => {
    if (!open) {
      setStep('check')
      setDate(undefined)
      setSlots(null)
      setSlotError(null)
      setSelectedSlot(null)
      setSelectedServiceId(null)
      setActiveAppointment(null)
      setLoadingCheck(false)
      setProfessionals([])
      setSelectedProfessionalId(null)
      setProfessionalWeeks(null)
      setFullDays([])
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
    if (!selectedServiceId) {
      setProfessionals([])
      setSelectedProfessionalId(null)
      setProfessionalWeeks(null)
      return
    }
    GetProfessionalsByService(selectedServiceId).then((res) => {
      let list = res.data ?? []
      if (lockedProfessionalId != null) {
        list = list.filter((p) => p.id === lockedProfessionalId)
      }
      setProfessionals(list)
      setSelectedProfessionalId((prev) => {
        if (lockedProfessionalId != null && list.some((p) => p.id === lockedProfessionalId)) {
          return lockedProfessionalId
        }
        if (prev != null && list.some((p) => p.id === prev)) return prev
        if (list.length === 1) return list[0].id
        return null
      })
    })
  }, [selectedServiceId, lockedProfessionalId])

  useEffect(() => {
    setDate(undefined)
    setSlots(null)
    setSelectedSlot(null)
    setSlotError(null)
    setFullDays([])
    setProfessionalWeeks(null)

    if (!hasValidProfessional) return

    GetProfessionalWorkingPeriodsForBooking(selectedProfessionalId!).then((res) => {
      const weeks = (res.data ?? []).map((w) => ({
        id: w.id ?? 0,
        week: w.week,
        initial: w.initial,
        end: w.end,
      }))
      setProfessionalWeeks(weeks)
    })
  }, [selectedProfessionalId, hasValidProfessional])

  useEffect(() => {
    if (!date || !selectedServiceId) return
    if (needsProfessional && !hasValidProfessional) return
    if (needsProfessional && professionalWeeks == null) return

    let cancelled = false
    const run = async () => {
      if (!cancelled) {
        setSlotLoading(true)
        setSlotError(null)
        setSlots(null)
      }
      const res = await GenerateSlots(
        selectedServiceId,
        dateUtils.toDateString(date),
        dateUtils.getWeekDay(date),
        hasValidProfessional ? selectedProfessionalId! : undefined
      )
      if (cancelled) return
      if (res.data == null) {
        setSlotError(res.message || "Esse dia não está disponível para agendamento")
      } else {
        setSlots(res)
      }
      setSlotLoading(false)
    }
    run()
    setSelectedSlot(null)
    return () => {
      cancelled = true
    }
  }, [
    date,
    selectedServiceId,
    selectedProfessionalId,
    needsProfessional,
    hasValidProfessional,
    professionalWeeks,
  ])

  useEffect(() => {
    if (!hasValidProfessional || !selectedServiceId) {
      setFullDays([])
      return
    }
    handleMonthChange(new Date(), setFullDays, selectedServiceId, selectedProfessionalId!)
  }, [selectedProfessionalId, hasValidProfessional, selectedServiceId])

  const handleServiceSelect = (serviceId: number) => {
    setSelectedServiceId(serviceId)
    setSlots(null)
    setSelectedSlot(null)
    setDate(undefined)
    setProfessionals([])
    setSelectedProfessionalId(null)
    setProfessionalWeeks(null)
    setFullDays([])
    const params = new URLSearchParams(useSearchParam.toString())
    params.set("svs", String(serviceId))
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const handleCancelAndProceed = () => {
    if (!activeAppointment || !business) return
    handleCancelAppointmentAction(
      activeAppointment.appointmentId,
      activeAppointment.businessId,
      customer!.userId ?? null,
      customer!.customerId ?? null,
      () => {
        router.refresh()
        setActiveAppointment(null)
        setStep('schedule')
      }
    )
  }

  const serviceNotSelected = !selectedServiceId
  const saveDisabled =
    !date ||
    !selectedSlot ||
    serviceNotSelected ||
    (needsProfessional && !hasValidProfessional)

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
          const price = (activeAppointment.serviceValue / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
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
                  {isStartCancelApptTransition ? (
                    <>
                      <LoaderCircle size={15} className="animate-spin" color="#BB77EE" />
                      <span className="font-tree text-sm text-(--agenrap-purple-500)">Cancelando...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw size={15} color="#BB77EE" />
                      <span className="font-tree text-sm text-(--agenrap-purple-500)">Cancelar e reagendar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })()}

        {step === 'schedule' && (
          <>
            <div className="px-4 pt-4 shrink-0 flex flex-col gap-3">
              <AgenrapServiceSelect
                services={services ?? []}
                onSelect={handleServiceSelect}
                placeholder="Selecione o serviço para continuar"
              />
              {selectedServiceId != null && professionals.length > 0 && lockedProfessionalId == null && (
                <ProfessionalSelector
                  professionals={professionals}
                  selectedId={selectedProfessionalId}
                  onSelect={(id) => {
                    setSelectedProfessionalId(id)
                    setDate(undefined)
                    setSlots(null)
                    setSelectedSlot(null)
                    setSlotError(null)
                    setFullDays([])
                    setProfessionalWeeks(null)
                  }}
                />
              )}
              {selectedServiceId != null && professionals.length === 0 && (
                <p className="font-tree text-sm text-white/50 px-1">
                  Nenhum profissional atende este serviço (ou ainda sem expediente).
                </p>
              )}
            </div>

            <ScrollArea className="h-100 w-full">
              <ScrollBar className="[&>[data-slot=scroll-area-thumb]]:rounded-full [&>[data-slot=scroll-area-thumb]]:bg-(--agenrap-yellow-200)" />
              <div
                className={`flex flex-col h-full md:flex-row gap-4 p-4 overflow-y-auto flex-1 transition-opacity duration-200 ${
                  serviceNotSelected || (needsProfessional && !hasValidProfessional)
                    ? "opacity-40 pointer-events-none select-none"
                    : "opacity-100"
                }`}
              >
                <div className="md:w-[42%] w-full shrink-0">
                  <AgenrapCalendar
                    fullDays={fullDays}
                    setFullDays={setFullDays}
                    business={business!}
                    date={date}
                    setDate={setDate}
                    className="w-full"
                    professionalId={hasValidProfessional ? selectedProfessionalId : null}
                    professionalWeeks={professionalWeeks}
                  />
                </div>
                <div className="md:flex-1 w-full flex flex-col rounded-lg overflow-hidden min-h-45">
                  <div className="px-3 py-2 bg-white/15 rounded-t-md shrink-0">
                    <p className="font-tree font-medium text-base text-white">Horários disponíveis</p>
                  </div>
                  {needsProfessional && !hasValidProfessional ? (
                    <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                      <p className="font-tree text-white text-center text-base">
                        Escolha um profissional para ver os horários
                      </p>
                    </div>
                  ) : slotLoading ? (
                    <div className="flex relative justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1">
                      <Image src={macroLogo} alt="" className="w-16 h-16 opacity-15 animate-pulse" />
                      <LoaderCircle className="animate-spin absolute w-16 h-16" color="#F5E6CC" />
                    </div>
                  ) : slotError ? (
                    <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                      <p className="font-tree text-white text-center text-base">{slotError}</p>
                    </div>
                  ) : slots?.data?.slots?.length ? (
                    <div className="bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1">
                      <ScrollArea className="h-56 lg:h-full w-full">
                        <ScrollBar className="[&>[data-slot=scroll-area-thumb]]:rounded-full [&>[data-slot=scroll-area-thumb]]:bg-(--agenrap-yellow-200)" />
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1 p-2 pb-0">
                          {slots.data.slots.map((hrs, index) => (
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
                  ) : slots ? (
                    <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                      <p className="font-tree text-white text-center text-base">Ops, agenda lotada neste dia</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                      <p className="font-tree text-white text-center text-base font-semibold">
                        {serviceNotSelected
                          ? "Selecione um serviço acima"
                          : "Selecione um dia para ver os horários"}
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
                onClick={() =>
                  handleManagerSaveAppointment(
                    dateUtils.toDateString(date!),
                    selectedSlot!,
                    customer!.userId ?? null,
                    customer!.customerId ?? null,
                    customer!.fullName,
                    hasValidProfessional ? selectedProfessionalId : null,
                    () => {
                      setOpen(false)
                      router.refresh()
                    }
                  )
                }
                disabled={saveDisabled}
                className={`flex-1 py-3 transition-all duration-200 ${
                  saveDisabled
                    ? "bg-(--agenrap-gray-800) border border-(--agenrap-purple-500)/20 cursor-not-allowed"
                    : ""
                }`}
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