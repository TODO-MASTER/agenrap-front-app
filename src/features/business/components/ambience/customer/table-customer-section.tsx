'use client'
import { BusinessCustomer } from "@/src/features/business/types"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import ScheduleCustomerDialog from "@/src/shared/components/agenrap-ui/dialog/schedule-customer-dialog"
import AgenrapPopover from "@/src/shared/components/agenrap-ui/popover/agenrap-popover"
import AgenrapTable from "@/src/shared/components/agenrap-ui/table/agenrap-table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/src/shared/components/ui/drawer"
import { ColumnDef } from "@tanstack/react-table"
import { CalendarPlus, CalendarSearch, Ellipsis } from "lucide-react"
import { useState } from "react"

const columns: ColumnDef<BusinessCustomer>[] = [
  { accessorKey: "name", header: "Cliente" },
  { accessorKey: "telephone", header: "Telefone" },
  { accessorKey: "qtdAppointments", header: "Agendamentos" },
  { accessorKey: "lastAppointment", header: "Último agendamento" },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row, table }) => {
      const { openDrawer, openScheduling } = table.options.meta as {
        openDrawer: (row: BusinessCustomer) => void
        openScheduling: (row: BusinessCustomer) => void
      }

      return (
        <div className="flex justify-end">
          <div className="hidden lg:block">
            <AgenrapPopover gun={
              <AgenrapButton className="h-fit w-fit rotate-90 bg-transparent" onClick={(e) => e.stopPropagation()}>
                <Ellipsis color="#BB77EE" />
              </AgenrapButton>
            }>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-0.5">
                  <p className="text-black font-tree text-center">{row.original.name}</p>
                  <p className="text-black/50 text-xs font-tree text-center">{row.original.telephone ?? "Sem telefone"}</p>
                </div>
                <span className="w-full h-0.5 rounded-full bg-(--agenrap-gray-800)/15" />
                <div className="flex items-center gap-x-2">
                  <AgenrapButton
                    className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1"
                    onClick={() => openScheduling(row.original)}
                  >
                    <CalendarPlus color="#FFE082" />
                  </AgenrapButton>
                  <p className="text-black font-tree">Agendar</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1">
                    <CalendarSearch color="#BB77EE" />
                  </AgenrapButton>
                  <p className="text-black font-tree">Ver agendamentos</p>
                </div>
              </div>
            </AgenrapPopover>
          </div>

          <div className="lg:hidden">
            <AgenrapButton onClick={(e) => {
              e.stopPropagation()
              openDrawer(row.original)
            }}>
              ...
            </AgenrapButton>
          </div>
        </div>
      )
    },
  },
]

export default function TableCustomerSection({ customers }: { customers: BusinessCustomer[] }) {
  const [schedulingOpen, setSchedulingOpen] = useState(false)
  const [schedulingCustomer, setSchedulingCustomer] = useState<BusinessCustomer | null>(null)

  const openScheduling = (customer: BusinessCustomer) => {
    setSchedulingCustomer(customer)
    setSchedulingOpen(true)
  }

  return (
    <>
      <ScheduleCustomerDialog
        open={schedulingOpen}
        setOpen={setSchedulingOpen}
        customer={schedulingCustomer}
      />
      <AgenrapTable
        columns={columns}
        data={customers}
        meta={{ openScheduling }}
        renderDrawer={({ row, open, onClose }) => (
          <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
            <DrawerContent className="px-6 pb-10" aria-describedby={undefined}>
              <DrawerHeader className="px-0 pt-4 pb-0 flex flex-col items-center">
                <DrawerTitle className="text-black font-tree text-center text-base">
                  {row.name}
                </DrawerTitle>
                <p className="text-black/50 text-xs font-tree text-center">
                  {row.telephone ?? "Sem telefone"}
                </p>
              </DrawerHeader>
              <span className="w-full h-0.5 rounded-full bg-(--agenrap-gray-800)/15 my-4 block" />
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose()
                    openScheduling(row)
                  }}
                  className="flex flex-col items-center gap-y-2 py-4 rounded-xl bg-(--agenrap-gray-800)/5 active:bg-(--agenrap-gray-800)/10 transition-colors"
                >
                  <span className="rounded-md bg-(--agenrap-gray-800) p-1.5">
                    <CalendarPlus color="#FFE082" size={18} />
                  </span>
                  <p className="text-black font-tree text-sm">Agendar</p>
                </button>
                <button
                  onClick={onClose}
                  className="flex flex-col items-center gap-y-2 py-4 rounded-xl bg-(--agenrap-gray-800)/5 active:bg-(--agenrap-gray-800)/10 transition-colors"
                >
                  <span className="rounded-md bg-(--agenrap-gray-800) p-1.5">
                    <CalendarSearch color="#BB77EE" size={18} />
                  </span>
                  <p className="text-black font-tree text-sm">Ver agendamentos</p>
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      />
    </>
  )
}