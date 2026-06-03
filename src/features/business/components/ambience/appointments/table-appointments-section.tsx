'use client'
import { macroLogo } from "@/src/assets/images"
import { AppointmentFilters } from "@/src/features/business/components/ambience/appointments/appointment-filters"
import { columns } from "@/src/features/business/components/ambience/appointments/table-appointment.types"
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions"
import { AppointmentFull } from "@/src/features/business/services/appointment.service"
import { AgenrapPagination } from "@/src/shared/components/agenrap-ui/pagination/agenrap-pagination"
import AgenrapTable from "@/src/shared/components/agenrap-ui/table/agenrap-table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/src/shared/components/ui/drawer"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { formatDate, formatHour, formatPhone } from "@/src/shared/utils/formatters.utils"
import { CheckCircle2, LoaderCircle, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
type ShowAppointmentsProps = {
  businessId: number,
  appointments: AppointmentFull[]
  hasNextPage: boolean,
  hasPrevPage: boolean,
  totalPages: number,
  page: number,
  filter?:'today'|'completed'|null

}

export default function TableAppointmentSection({ businessId, appointments,hasNextPage,hasPrevPage,totalPages,page,filter }: ShowAppointmentsProps) {
  const { handleCompleteAllppointmentsAction, isPending } = useBusinessActions()
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const isCompleted = filter==='completed'
  const toggle = (id: number) =>
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

const visibleColumns = isCompleted
    ? columns.filter(col => col.id !== 'select')
    : columns

  const toggleAll = () => {
    const allSelected = appointments.every(a => selectedIds.has(a.appointmentId))
    setSelectedIds(allSelected ? new Set() : new Set(appointments.map(a => a.appointmentId)))
  }

  const handleComplete = async () => {
    const ids = Array.from(selectedIds)
    handleCompleteAllppointmentsAction(businessId, selectedIds, () => {
      router.refresh()
      setSelectedIds(new Set())
    })
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className={`transition-all duration-200 overflow-hidden ${selectedIds.size > 0 ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex items-center justify-between bg-(--agenrap-gray-800) rounded-xl px-5 py-3">
          <p className="font-tree text-white text-sm">
            <span className="font-semibold text-[#FFE082]">{selectedIds.size}</span>
            {' '}selecionado{selectedIds.size !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleComplete}
              className="flex items-center gap-x-1.5 font-tree text-sm font-semibold bg-[#BB77EE20] text-[#BB77EE] rounded-lg px-3 py-1.5 active:bg-[#BB77EE35] transition-colors"
            >
              {isPending ? <div className="flex relative" >
                <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

              </div> : <div className="flex items-center justify-center gap-x-1.5">              <CheckCircle2 size={14} color="#BB77EE" />
                Completar</div>}

            </button>
            <button onClick={() => setSelectedIds(new Set())}>
              <X size={14} color="#ffffff60" />
            </button>
          </div>
        </div>
      </div>
      <AppointmentFilters page={page} hasNext={hasNextPage} hasPrev={hasPrevPage} totalPages={totalPages}/>
      <AgenrapTable
        columns={visibleColumns}
        data={appointments}
        notHaveFallBack="Ainda não existe agendamentos"
        meta={{ selectedIds, toggle, toggleAll, appointments,isCompleted }}
        renderDrawer={({ row, open, onClose }) => (
          <div className={`${isCompleted?"hidden w-0 h-0":""}`}>
          <Drawer  open={isCompleted?false:open} onOpenChange={v => !v && onClose()}>
            <DrawerContent className="px-6 pb-10" aria-describedby={undefined}>

              <DrawerHeader className="px-0 pt-4 pb-0 flex flex-col items-center gap-y-1">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-(--agenrap-gray-800) text-[#FFE082] font-tree text-base font-semibold mb-1">
                  {row.initials}
                </span>
                <DrawerTitle className="text-black font-tree text-center text-base">{row.fullName}</DrawerTitle>
                <p className={`text-xs font-tree ${row.telephone?.trim() ? 'text-[#33333380]' : 'text-[#33333350] italic'}`}>
                  {formatPhone(row.telephone)}
                </p>
              </DrawerHeader>

              <span className="w-full h-0.5 rounded-full bg-[#33333318] my-4 block" />

              <div className="flex flex-col gap-y-3 mb-5">
                {([
                  ['Serviço', row.serviceName],
                  ['Data', formatDate(row.appointmentDate)],
                  ['Horário', formatHour(row.appointmentHour)],
                  ['Valor', currencyUtils.fromCents(row.serviceValue)],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center">
                    <p className="font-tree text-sm text-[#33333375]">{label}</p>
                    <p className="font-tree text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { toggle(row.appointmentId); onClose() }}
                className={`w-full py-3.5 rounded-xl font-tree text-sm font-semibold flex items-center justify-center gap-x-2 transition-colors ${selectedIds.has(row.appointmentId)
                  ? 'bg-[#33333310] text-[#33333380]'
                  : 'bg-(--agenrap-gray-800) text-[#FFE082]'
                  }`}
              >
                <CheckCircle2 size={16} color={selectedIds.has(row.appointmentId) ? '#33333380' : '#FFE082'} />
                {selectedIds.has(row.appointmentId) ? 'Desmarcar' : 'Selecionar para completar'}
              </button>

            </DrawerContent>
          </Drawer>
          </div>
        )}
      />
    </div>
  )
}