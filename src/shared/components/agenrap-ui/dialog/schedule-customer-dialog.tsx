'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { CalendarPlus, LoaderCircle, LucideSkipBack, X } from "lucide-react"
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

interface ScheduleCustomerDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  customer: BusinessCustomer | null
}

export default function ScheduleCustomerDialog({ open, setOpen, customer }: ScheduleCustomerDialogProps) {
  const { isSaveAppointmentPending, handleMonthChange } = useCustomerActions()
  const {handleManagerSaveAppointment} = useBusinessActions()
  const business = useBusinessStore(bsnCtx => bsnCtx.business)
  const services = useBusinessStore(bsnCtx => bsnCtx.business?.services)
  const router = useRouter()
  const useSearchParam = useSearchParams()

  const [date, setDate] = useState<Date | undefined>()
  const [slots, setSlots] = useState<SlotRes | null>(null)
  const [slotLoading, setSlotLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [fullDays, setFullDays] = useState<string[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)

  useEffect(() => {
    if (!open) {
      setDate(undefined)
      setSlots(null)
      setSelectedSlot(null)
      setSelectedServiceId(null)
    }
  }, [open])

  useEffect(() => {
    if (!selectedServiceId) return
    handleMonthChange(new Date(), setFullDays)
  }, [])

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
  }

  const serviceNotSelected = !selectedServiceId
  const saveDisabled = !date || !selectedSlot || serviceNotSelected

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        style={{ width: 'clamp(320px, 80vw, 900px)', maxWidth: 'none' }}
        className="flex flex-col gap-y-0 bg-[#2e2e2e] border-0 p-0 h-fit overflow-hidden"
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
                    {customer.name}
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

        <div className="px-4 pt-4 shrink-0">
          <AgenrapServiceSelect
            services={services ?? []}
            onSelect={handleServiceSelect}
            placeholder="Selecione o serviço para continuar"
          />
        </div>
        <ScrollArea className=" h-100 w-full">
          <ScrollBar primitiveThumbVar={` rounded-full bg-(--agenrap-yellow-200) ${serviceNotSelected ? "opacity-40 pointer-events-none select-none" : "opacity-100"}`} />
          <div className={`flex flex-col h-full  md:flex-row gap-4 p-4 overflow-y-auto flex-1 transition-opacity duration-200 ${serviceNotSelected ? "opacity-40 pointer-events-none select-none" : "opacity-100"}`}>

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
                <p className="font-tree font-medium text-base text-white">
                  Horários disponíveis
                </p>
              </div>

              {slotLoading ? (
                <div className="flex relative justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1">
                  <Image src={macroLogo} alt="" className="w-16 h-16 opacity-15 animate-pulse" />
                  <LoaderCircle className="animate-spin absolute w-16 h-16" color="#F5E6CC" />
                </div>
              ) : slots ? (
                slots.data.slots.length === 0 ? (
                  <div className="flex justify-center items-center bg-(--agenrap-purple-500)/50 rounded-b-lg border-4 border-(--agenrap-purple-500)/20 w-full flex-1 p-4">
                    <p className="font-tree text-white text-center text-base">
                      Ops, agenda lotada neste dia
                    </p>
                  </div>
                ) : (
                  <div className="bg-(--agenrap-purple-500)/50 rounded-b-lg border-4  border-(--agenrap-purple-500)/20 w-full flex-1">
                    <ScrollArea className=" h-56 lg:h-full w-full">
                      <ScrollBar primitiveThumbVar="rounded-full bg-(--agenrap-yellow-200)" />
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))]   gap-1 p-2 pb-0">
                        {slots.data.slots.map((hrs, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedSlot(hrs)}
                            className={`px-2 py-3 group bg-(--agenrap-brown-200) flex justify-center items-center cursor-pointer transition-colors
                            ${selectedSlot === hrs
                                ? "bg-(--agenrap-purple-500) rounded-xs"
                                : "hover:bg-(--agenrap-purple-500)"
                              }`}
                          >
                            <p className={`text-center text-sm text-black transition-colors
                            ${selectedSlot === hrs ? "text-white" : "group-hover:text-white"}`}>
                              {hrs}
                            </p>
                          </button>
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

          <div className="flex gap-x-3 px-4 pb-5 pt-2 border-t border-(--agenrap-purple-500) shrink-0">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center gap-x-2 px-4 py-2 rounded-md border border-(--agenrap-purple-500)/30 text-white/60 hover:text-white hover:border-(--agenrap-purple-500)/60 transition-colors"
            >
              <LucideSkipBack size={16} color="currentColor" />
              <p className="font-tree text-sm">Voltar</p>
            </button>

            <AgenrapButton
              onClick={() => handleManagerSaveAppointment(dateUtils.toDateString(date!), selectedSlot!,customer!.id,customer!.name,()=>{
                setOpen(false)
                router.refresh()
              })}
              disabled={saveDisabled}
              className={`flex-1 py-3 transition-all duration-200  ${saveDisabled
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
      </DialogContent>
    </Dialog>
  )
}