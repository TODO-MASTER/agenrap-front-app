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
import { CalendarDays, CheckCircle2, Clock, LoaderCircle, Scissors, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Suspense, useState } from "react"
 
type ShowAppointmentsProps = {
  businessId: number
  appointments: AppointmentFull[]
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
  page: number
  filter?: 'today' | 'completed' | null
}
 
export default function TableAppointmentSection({ businessId, appointments, hasNextPage, hasPrevPage, totalPages, page, filter }: ShowAppointmentsProps) {
  const { handleCompleteAllppointmentsAction, isPending } = useBusinessActions()
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const isCompleted = filter === 'completed'
 
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
 
  const allSelected = appointments.length > 0 && appointments.every(a => selectedIds.has(a.appointmentId))
 
  const handleComplete = async () => {
    handleCompleteAllppointmentsAction(businessId, selectedIds, () => {
      router.refresh()
      setSelectedIds(new Set())
    })
  }
 
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFull | null>(null)
 
  const handleOpenDetailDrawer = (appointment: AppointmentFull) => {
    setSelectedAppointment(appointment)
    setDrawerOpen(true)
  }
 
  return (
    <div className={`flex flex-col gap-y-3 ${totalPages > 1 ? "pb-24" : "pb-6"} md:pb-0 lg:pb-0`}>
      <div className={`transition-all duration-200 overflow-hidden ${selectedIds.size > 0 ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex items-center justify-between bg-(--agenrap-gray-800) rounded-xl px-5 py-3">
          <p className="font-tree text-white text-sm">
            <span className="font-semibold text-[#FFE082]">{selectedIds.size}</span>
            {' '}serviço{selectedIds.size !== 1 ? 's' : ''} selecionado{selectedIds.size !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleComplete}
              className="flex items-center gap-x-1.5 font-tree text-sm font-semibold bg-[#BB77EE20] text-[#BB77EE] rounded-lg px-3 py-1.5 active:bg-[#BB77EE35] transition-colors"
            >
              {isPending ? (
                <div className="flex relative">
                  <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                  <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-x-1.5">
                  <CheckCircle2 size={14} color="#BB77EE" />
                  Completar serviços
                </div>
              )}
            </button>
            <button onClick={() => setSelectedIds(new Set())}>
              <X size={14} color="#ffffff60" />
            </button>
          </div>
        </div>
      </div>
 <Suspense fallback={null}>


      <AppointmentFilters page={page} hasNext={hasNextPage} hasPrev={hasPrevPage} totalPages={totalPages} />
  </Suspense>
      <div className="hidden lg:block">
        <AgenrapTable
          columns={visibleColumns}
          data={appointments}
          notHaveFallBack="Ainda não existe agendamentos"
          meta={{ selectedIds, toggle, toggleAll, appointments, isCompleted }}
          renderDrawer={({ row, open, onClose }) => (
            <div className={`${isCompleted ? "hidden w-0 h-0" : ""}`}>
              <Drawer open={isCompleted ? false : open} onOpenChange={v => !v && onClose()}>
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
 
      <div className="lg:hidden flex flex-col gap-y-3">
        {!isCompleted && appointments.length > 0 && (
          <button
            onClick={toggleAll}
            className={`flex items-center gap-x-2 px-4 py-2.5 rounded-xl border font-tree text-sm font-medium transition-colors w-full
              ${allSelected
                ? 'bg-(--agenrap-gray-800) text-[#FFE082] border-(--agenrap-gray-800)'
                : 'bg-(--agenrap-gray-800)/5 text-(--agenrap-gray-800) border-(--agenrap-gray-800)/15 active:bg-(--agenrap-gray-800)/10'
              }`}
          >
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors
              ${allSelected ? 'bg-[#BB77EE] border-[#BB77EE]' : 'border-(--agenrap-gray-800)/30 bg-white'}`}
            >
              {allSelected && <CheckCircle2 size={12} color="white" strokeWidth={3} />}
            </span>
            {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
          </button>
        )}
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {appointments.length === 0 ? (
            <p className="text-center col-span-full py-10 text-sm text-(--agenrap-brown-500)/60 font-tree">
              Ainda não existe agendamentos
            </p>
          ) : (
            appointments.map((appointment) => {
              const isSelected = selectedIds.has(appointment.appointmentId)
              return (
                <div
                  key={appointment.appointmentId}
                  onClick={() => !isCompleted && handleOpenDetailDrawer(appointment)}
                  className={`bg-white dark:bg-(--agenrap-gray-900) rounded-xl border transition-all flex flex-col overflow-hidden cursor-pointer active:scale-[0.99]
                    ${isSelected
                      ? 'border-[#BB77EE]/50 shadow-[0_0_0_3px_#BB77EE18]'
                      : 'border-(--agenrap-gray-800)/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                    }
                    ${isCompleted ? 'cursor-default' : ''}
                  `}
                >
                  <div className="flex items-center gap-x-0 min-w-0">
                    {!isCompleted && (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggle(appointment.appointmentId) }}
                        className="flex items-center justify-center w-14 self-stretch shrink-0 border-r border-(--agenrap-gray-800)/8 active:bg-(--agenrap-gray-800)/5 transition-colors"
                      >
                        <span className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                          ${isSelected ? 'bg-[#BB77EE] border-[#BB77EE]' : 'border-(--agenrap-gray-800)/25 bg-white'}`}
                        >
                          {isSelected && <CheckCircle2 size={12} color="white" strokeWidth={3} />}
                        </span>
                      </button>
                    )}
 
                    <div className="flex items-center gap-x-3 min-w-0 px-4 py-3.5 flex-1">
                      <div className="relative shrink-0">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-(--agenrap-gray-800) text-(--agenrap-yellow-200) font-tree text-xs font-semibold shadow-inner">
                          {appointment.initials}
                        </span>
                        {isCompleted && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow">
                            <CheckCircle2 size={9} color="white" strokeWidth={2.5} />
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-tree font-bold text-sm text-(--agenrap-gray-800) dark:text-white truncate max-w-[180px]">
                          {appointment.fullName}
                        </span>
                        <span className={`text-[10px] font-tree ${appointment.telephone?.trim() ? 'text-(--agenrap-brown-500)/50' : 'text-(--agenrap-brown-500)/30 italic'}`}>
                          {formatPhone(appointment.telephone)}
                        </span>
                      </div>
                    </div>
                  </div>
 
                  <span className="w-full h-px bg-(--agenrap-gray-800)/5" />
 
                  <div className={`grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-tree px-4 py-3
                    ${!isCompleted ? 'pl-14' : 'pl-4'}
                  `}>
                    <div className="flex flex-col min-w-0">
                      <span className="text-(--agenrap-brown-500)/50 text-[10px] uppercase font-semibold tracking-wider">Serviço</span>
                      <span className="text-(--agenrap-gray-800) dark:text-white/90 font-medium truncate mt-0.5 flex items-center gap-x-1" title={appointment.serviceName}>
                        <Scissors size={10} className="text-(--agenrap-brown-500)/40 shrink-0" />
                        {appointment.serviceName}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-(--agenrap-brown-500)/50 text-[10px] uppercase font-semibold tracking-wider">Data</span>
                      <span className="text-(--agenrap-gray-800) dark:text-white/90 font-medium mt-0.5 flex items-center gap-x-1">
                        <CalendarDays size={10} className="text-(--agenrap-brown-500)/40 shrink-0" />
                        {formatDate(appointment.appointmentDate)}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-(--agenrap-brown-500)/50 text-[10px] uppercase font-semibold tracking-wider">Horário</span>
                      <span className="text-(--agenrap-gray-800) dark:text-white/90 font-medium mt-0.5 flex items-center gap-x-1">
                        <Clock size={10} className="text-(--agenrap-brown-500)/40 shrink-0" />
                        {formatHour(appointment.appointmentHour)}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-(--agenrap-brown-500)/50 text-[10px] uppercase font-semibold tracking-wider">Valor</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                        {currencyUtils.fromCents(appointment.serviceValue)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
 
      {totalPages > 1 && (
        <div className="md:hidden fixed bottom-10 h-20 left-0 right-0 z-20 px-4 py-1 pt-0 pb-3 bg-(--agenrap-brown-200) border-t border-(--agenrap-gray-800)/20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <AgenrapPagination page={page} totalPages={totalPages} hasNext={hasNextPage} hasPrev={hasPrevPage} />
        </div>
      )}
 
      <Drawer open={drawerOpen} onOpenChange={(v) => !v && setDrawerOpen(false)}>
        {selectedAppointment && (
          <DrawerContent className="px-6 pb-10 max-w-full" aria-describedby={undefined}>
            <DrawerHeader className="px-0 pt-4 pb-0 flex flex-col items-center gap-y-1">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-(--agenrap-gray-800) text-[#FFE082] font-tree text-base font-semibold mb-1">
                {selectedAppointment.initials}
              </span>
              <DrawerTitle className="text-black font-tree text-center text-base leading-tight">
                {selectedAppointment.fullName}
              </DrawerTitle>
              <p className={`text-xs font-tree ${selectedAppointment.telephone?.trim() ? 'text-[#33333380]' : 'text-[#33333350] italic'}`}>
                {formatPhone(selectedAppointment.telephone)}
              </p>
            </DrawerHeader>
 
            <span className="w-full h-0.5 rounded-full bg-[#33333318] my-4 block" />
 
            <div className="flex flex-col gap-y-3 mb-5">
              {([
                ['Serviço', selectedAppointment.serviceName],
                ['Data', formatDate(selectedAppointment.appointmentDate)],
                ['Horário', formatHour(selectedAppointment.appointmentHour)],
                ['Valor', currencyUtils.fromCents(selectedAppointment.serviceValue)],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <p className="font-tree text-sm text-[#33333375]">{label}</p>
                  <p className="font-tree text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
 
            <button
              onClick={() => { toggle(selectedAppointment.appointmentId); setDrawerOpen(false) }}
              className={`w-full py-3.5 rounded-xl font-tree text-sm font-semibold flex items-center justify-center gap-x-2 transition-colors ${selectedIds.has(selectedAppointment.appointmentId)
                ? 'bg-[#33333310] text-[#33333380]'
                : 'bg-(--agenrap-gray-800) text-[#FFE082]'
                }`}
            >
              <CheckCircle2 size={16} color={selectedIds.has(selectedAppointment.appointmentId) ? '#33333380' : '#FFE082'} />
              {selectedIds.has(selectedAppointment.appointmentId) ? 'Desmarcar' : 'Selecionar para completar'}
            </button>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  )
}