'use client'

import { macroLogo } from "@/src/assets/images"
import AppointmentDisplay from "@/src/features/customers/components/business-showcase/appointment-display"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { Button } from "@/src/shared/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/src/shared/components/ui/dialog"
import { handleCancelAppointment } from "@/src/shared/services/appointment.service"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import { AlertTriangle, CalendarDays, LoaderCircle, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { VisuallyHidden } from "radix-ui"
import { useState } from "react"

type AppointmentItem = AppointmentCancelRes['data'][number]

type ShowAppointmentsDialogProps = {
    open: boolean
    onClose: () => void
    appointments: AppointmentCancelRes
}

type Step = 'list' | 'confirm'

export default function ShowAppointmentsDialog({ open, onClose, appointments }: ShowAppointmentsDialogProps) {
    const {handleCancelAppointmentAction,isStartCancelApptTransition}=useCustomerActions()
    const [step, setStep] = useState<Step>('list')
    const [selected, setSelected] = useState<AppointmentItem | null>(null)
    const usePathName = usePathname()

    function handleSelect(appt: AppointmentItem) {
        setSelected(appt)
        setStep('confirm')
    }

    function handleBack() {
        setStep('list')
        setSelected(null)
    }

    function handleClose() {
        handleBack()
        onClose()
    }

    return (
  <Dialog open={open} onOpenChange={handleClose}>
    <DialogContent className="p-0 overflow-hidden gap-0 w-[calc(100%-2rem)] max-w-md rounded-2xl border-0 shadow-2xl shadow-black/30"               showCloseButton={false}
                aria-describedby={undefined}>

      <VisuallyHidden.Root>
        <DialogTitle>Meus agendamentos</DialogTitle>
      </VisuallyHidden.Root>
        <div className="bg-(--agenrap-brown-500) px-5 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 ">
        <CalendarDays size={18} color="#FFE082" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm leading-tight">Meus agendamentos</p>
          <p className="text-[11px] text-(--agenrap-yellow-200)/65 mt-0.5 truncate">
            {step === 'list' ? 'Selecione um agendamento para cancelar' : 'Confirme o cancelamento'}
          </p>
        </div>
      </div>
                              <button type="button" onClick={onClose}>
                            <X size={25} color="darkred" />
                        </button>
      </div>

      <div className="px-4 py-4 bg-[#f7f2eb]">

        {step === 'list' && (
          <div key="list" className="animate-in fade-in slide-in-from-left-4 duration-200">
            <AppointmentDisplay appointments={appointments} onSelect={handleSelect} />
          </div>
        )}

        {step === 'confirm' && selected && (
          <div key="confirm" className="animate-in fade-in slide-in-from-right-4 duration-200 flex flex-col gap-4">

            {/* Resumo do agendamento selecionado */}
            <div className="flex items-stretch rounded-xl overflow-hidden bg-(--agenrap-gray-800) border border-white/5">
              <div className="w-1.5 shrink-0" style={{ background: 'linear-gradient(to bottom, #FFE082, #C46210)' }} />
              <div className="flex flex-col justify-center gap-1 px-4 py-4 flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{selected.serviceName}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-(--agenrap-yellow-200) font-semibold">{selected.appointmentHour.slice(0, 5)}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400">{selected.workingPeriodWeek}, {selected.appointmentDate}</span>
                </div>
              </div>
              <div className="flex items-center px-4 shrink-0">
                <span className="text-sm font-bold text-(--agenrap-green-300)">
                  {(selected.serviceValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            {/* Aviso */}
            <div className="flex items-start gap-2 bg-(--agenrap-brown-500)/10 border border-(--agenrap-brown-500)/20 rounded-lg px-3 py-3">
              <AlertTriangle size={15} className="text-(--agenrap-brown-500) mt-0.5 shrink-0" />
              <p className="text-xs text-(--agenrap-brown-500) leading-relaxed">
                Esta ação não pode ser desfeita. O horário será liberado e o agendamento cancelado permanentemente.
              </p>
            </div>

          </div>
        )}

      </div>

      <div className="flex items-center justify-end gap-2 px-4 py-3 bg-[#f7f2eb] border-t border-black/5">
        {step === 'confirm' && (
          <Button variant="ghost" onClick={handleBack}
            className="text-(--agenrap-brown-500) hover:bg-(--agenrap-brown-500)/10 text-sm h-9">
            Voltar
          </Button>
        )}

        <DialogClose asChild>
          <Button variant="outline"
            className="border-(--agenrap-brown-500)/30 text-(--agenrap-brown-500) text-sm h-9">
            Fechar
          </Button>
        </DialogClose>

        {step === 'confirm' && (
          <AgenrapButton
            className="bg-(--agenrap-purple-500) hover:bg-(--agenrap-purple-500)/85 text-white h-9 w-fit rounded-lg text-sm px-4"
            onClick={() => handleCancelAppointmentAction(selected!.appointmentId,selected!.businessId,usePathName==='/dashboard/customers'?selected?.userId: null, () => {
              setStep('list')
              onClose()
            })}>
            {isStartCancelApptTransition
              ? <div className="flex relative">
                  <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                  <LoaderCircle className="animate-spin absolute w-6 h-6" color="#fff" />
                </div>
              : <p className="font-tree text-white">Confirmar</p>
            }
          </AgenrapButton>
        )}
      </div>

    </DialogContent>
  </Dialog>
    )
}