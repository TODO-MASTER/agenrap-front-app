import { AppointmentFull } from "@/src/features/business/services/appointment.service"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { formatDate, formatHour, formatPhone } from "@/src/shared/utils/formatters.utils"
import { ColumnDef } from "@tanstack/react-table"
import { Check } from "lucide-react"

type SelectionMeta = {
  selectedIds: Set<number>
  toggle: (id: number) => void
  toggleAll: () => void
  isCompleted?:boolean
  appointments: AppointmentFull[]
}

// ─── columns ─────────────────────────────────────────────────────────────────
export const columns: ColumnDef<AppointmentFull>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { selectedIds, appointments, toggleAll,isCompleted } = table.options.meta as SelectionMeta
      const allSelected = appointments.length > 0 && appointments.every(a => selectedIds.has(a.appointmentId))
       if (isCompleted) return null
      return (
        <div className="flex items-center" onClick={e => e.stopPropagation()}>
          <button
            onClick={toggleAll}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${allSelected ? 'bg-[#BB77EE] border-[#BB77EE]' : 'border-[#ffffff80]'
              }`}
          >
            {allSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
          </button>
        </div>
      )
    },
    cell: ({ row, table }) => {
      const { selectedIds, toggle,isCompleted } = table.options.meta as SelectionMeta
      const selected = selectedIds.has(row.original.appointmentId)
       if (isCompleted) return null
      return (
        <div className="flex items-center" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => toggle(row.original.appointmentId)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selected ? 'bg-[#BB77EE] border-[#BB77EE]' : 'border-[#33333350]'
              }`}
          >
            {selected && <Check size={12} color="#ffffff" strokeWidth={3} />}
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "fullName",
    header: "Cliente",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2.5 max-w-[80%]">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--agenrap-gray-800) text-(--agenrap-yellow-200) font-tree text-xs font-semibold shrink-0">
          {row.original.initials}
        </span>
        <span className="font-tree truncate" title={row.original.fullName}>
          {row.original.fullName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "telephone",
    header: "Telefone",
    cell: ({ row }) => (
      <span className={`font-tree text-sm ${!row.original.telephone?.trim() ? 'text-(--agenrap-brown-500)/40 italic' : ''}`}>
        {formatPhone(row.original.telephone)}
      </span>
    ),
  },
  {
    accessorKey: "serviceName",
    header: "Serviço",
    cell: ({ row }) => (
      <span className="block max-w-40 truncate font-tree" title={row.original.serviceName}>
        {row.original.serviceName}
      </span>
    ),
  },
  {
    accessorKey: "appointmentDate",
    header: "Data",
    cell: ({ row }) => (
      <span className="font-tree">{formatDate(row.original.appointmentDate)}</span>
    ),
  },
  {
    accessorKey: "appointmentHour",
    header: "Horário",
    cell: ({ row }) => (
      <span className="font-tree">{formatHour(row.original.appointmentHour)}</span>
    ),
  },
  {
    accessorKey: "serviceValue",
    header: "Valor",
    cell: ({ row }) => (
      <span className="font-tree">{currencyUtils.fromCents(row.original.serviceValue)}</span>
    ),
  },
]