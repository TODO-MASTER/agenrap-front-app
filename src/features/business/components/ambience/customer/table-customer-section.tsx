'use client'
import { BusinessCustomer } from "@/src/features/business/types"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import ScheduleCustomerDialog from "@/src/shared/components/agenrap-ui/dialog/schedule-customer-dialog"
import ShowAppointmentsDialog from "@/src/shared/components/agenrap-ui/dialog/show-appointments-dialog"
import { AgenrapPagination } from "@/src/shared/components/agenrap-ui/pagination/agenrap-pagination"
import AgenrapPopover from "@/src/shared/components/agenrap-ui/popover/agenrap-popover"
import AgenrapTable from "@/src/shared/components/agenrap-ui/table/agenrap-table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/src/shared/components/ui/drawer"
import { GetNextAppointments } from "@/src/shared/services/appointment.service"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { BusinessCtx, PageableResponse } from "@/src/shared/types"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { ColumnDef } from "@tanstack/react-table"
import { CalendarPlus, CalendarSearch, Ellipsis, ScrollText } from "lucide-react"
import { startTransition, useState } from "react"

const columns: ColumnDef<BusinessCustomer>[] = [
{
  accessorKey: "fullName",
  header: "Cliente",
  cell: ({ row }) => {
    const initials = row.original.fullName
      .split(" ")
      .slice(0, 2)
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
    return (
      <div className="flex items-center gap-x-2.5">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--agenrap-gray-800) text-(--agenrap-yellow-200) font-tree text-xs font-semibold shrink-0">
          {initials}
        </span>
        <span className="font-tree">{row.original.fullName}</span>
      </div>
    )
  },
},
  {
    accessorKey: "telephone",
    header: "Telefone",
    cell: ({ row }) => row.original.telephone ?? "Sem Telefone",
  },
{
  accessorKey: "lastServiceName",
  header: "Últ. serviço",
  cell: ({ row }) => (
    <span className="block max-w-40 truncate" title={row.original.lastServiceName ?? "nenhum serviço completo"}>
      {row.original.lastServiceName ?? "sem serviço completo"}
    </span>
  ),
},
  {
    accessorKey: "lastAppointment",
    header: "Últ. Agendamento",
    cell: ({ row }) => row.original.lastAppointment ?? "—",
  },
  { accessorKey: "totalAppointments", header: "Agendamentos" },
  {
    accessorKey: "totalSpent",
    header: "Total gasto",
    cell: ({ row }) =>
      currencyUtils.fromCents(row.getValue<number>("totalSpent"), "BRL"),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row, table }) => {
      const { openDrawer, openScheduling, handleOpen, business } =
        table.options.meta as {
          openDrawer: (row: BusinessCustomer) => void
          openScheduling: (row: BusinessCustomer) => void
          handleOpen: (row: BusinessCtx, customer: BusinessCustomer) => void
          business: BusinessCtx
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
                  <p className="text-black font-tree text-center">{row.original.fullName}</p>
                  <p className="text-black/50 text-xs font-tree text-center">{row.original.telephone ?? "Sem telefone"}</p>
                </div>
                <span className="w-full h-0.5 rounded-full bg-(--agenrap-gray-800)/15" />
                <div className="flex items-center gap-x-2">
                  <AgenrapButton
                    className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1"
                    onClick={() => openScheduling(row.original)}
                  >
                    <CalendarPlus color="#BB77EE" />
                  </AgenrapButton>
                  <p className="text-black font-tree">Agendar</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={()=>handleOpen(business!,row.original)}>
                    <ScrollText color="#FFE082" />
                  </AgenrapButton>
                  <p className="text-black font-tree">Ver agendamentos</p>
                </div>
              </div>
            </AgenrapPopover>
          </div>

          <div className="lg:hidden">

            <AgenrapButton className="h-fit w-fit bg-transparent" onClick={(e) => {
              e.stopPropagation()
              openDrawer(row.original)
            }}>
               <Ellipsis color="#BB77EE" />
            </AgenrapButton>
          </div>
        </div>
      )
    },
  },
]

type TableCustomerPageable={
  customers:BusinessCustomer[]
  hasNextPage:boolean,
  hasPrevPage:boolean,
  totalPages:number,
  page:number
}

export default function TableCustomerSection({ customers,page,totalPages,hasNextPage,hasPrevPage }:TableCustomerPageable) {
  const [schedulingOpen, setSchedulingOpen] = useState(false)
  const [schedulingCustomer, setSchedulingCustomer] = useState<BusinessCustomer | null>(null)
  const business = useBusinessStore(tgBsn=>tgBsn.business)
  const openScheduling = (customer: BusinessCustomer) => {
    setSchedulingCustomer(customer)
    setSchedulingOpen(true)
  }
      const [openAppointments,setOpenAppointments] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<AppointmentCancelRes | null>(null)
  const handleOpen=(bs: BusinessCtx,customer: BusinessCustomer)=> {
    setOpenAppointments(true)
    startTransition(async () => {
      const res = await GetNextAppointments(bs.id,customer.id)
      setAppointments(res)
    })
  }

  return (
    <>
      <ScheduleCustomerDialog
        open={schedulingOpen}
        setOpen={setSchedulingOpen}
        customer={schedulingCustomer}
      />
            <ShowAppointmentsDialog appointments={appointments!}  open={openAppointments} onClose={()=>{
                setOpenAppointments(false)
            }} />
      <AgenrapTable
        columns={columns}
        data={customers}
         notHaveFallBack="Ainda não há clientes"
        meta={{ openScheduling,handleOpen,business }}
        renderDrawer={({ row, open, onClose }) => (
          <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
            <DrawerContent className="px-6 pb-10" aria-describedby={undefined}>
              <DrawerHeader className="px-0 pt-4 pb-0 flex flex-col items-center">
                <DrawerTitle className="text-black font-tree text-center text-base">
                  {row.fullName}
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
                  onClick={()=> {onClose()
                      handleOpen(business!,row)

                  }}
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
                  <AgenrapPagination 
                page={page}
                totalPages={totalPages}
                hasNext={hasNextPage}
                hasPrev={hasPrevPage}
            />
    </>
  )
}