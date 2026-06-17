'use client'
import { CustomerFilters } from "@/src/features/business/components/ambience/customer/customer-filters"
import MergeCustomerDialog from "@/src/shared/components/agenrap-ui/dialog/merge-customer-dialog"
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
import { BusinessCtx } from "@/src/shared/types"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { ColumnDef } from "@tanstack/react-table"
import { CalendarPlus, CalendarSearch, Ellipsis, GitMerge, RotateCcw, ScrollText, CalendarDays, Pencil, PencilLine, X, Trash } from "lucide-react"
import { startTransition, useState } from "react"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import RevertMergeDialog from "@/src/shared/components/agenrap-ui/dialog/revert-merge-dialog"
import EditProfileDialog from "@/src/shared/components/agenrap-ui/dialog/edit-profile-dialog"
import DeleteCustomerDialog from "@/src/shared/components/agenrap-ui/dialog/delete-customer-dialog"

const getInitials = (name: string) => {
  return name.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
}

const columns: ColumnDef<BusinessCustomer>[] = [
  {
    accessorKey: "fullName",
    header: "Cliente",
    cell: ({ row }) => {
      const initials = getInitials(row.original.fullName)
      return (
        <div className="flex items-center gap-x-2.5 min-w-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--agenrap-gray-800) text-(--agenrap-yellow-200) font-tree text-xs font-semibold shrink-0">
            {initials}
          </span>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-x-1.5 flex-wrap">
              <span className="font-tree truncate max-w-[120px] sm:max-w-[200px]">{row.original.fullName}</span>
              {row.original.possibleDuplicate && (
                <span className="flex items-center gap-x-1 px-1.5 py-0.5 rounded-full bg-[#BB77EE20] text-[#BB77EE] text-[10px] font-tree font-semibold shrink-0">
                  <GitMerge size={10} />
                  Mesclar
                </span>
              )}
            </div>
            {!row.original.isRegistered && (
              <span className="text-[10px] font-tree text-(--agenrap-brown-500)/50">sem conta</span>
            )}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "telephone",
    header: "Telefone",
    cell: ({ row }) => (
      <span className={`font-tree text-sm ${!row.original.telephone?.trim() ? 'text-(--agenrap-brown-500)/40 italic' : ''}`}>
        {row.original.telephone?.trim() ? maskPhone(row.original.telephone) : 'Sem telefone'}
      </span>
    ),
  },
  {
    accessorKey: "lastServiceName",
    header: "Últ. serviço",
    cell: ({ row }) => (
      <span className="block max-w-[120px] truncate font-tree" title={row.original.lastServiceName ?? "sem serviço completo"}>
        {row.original.lastServiceName ?? "sem serviço completo"}
      </span>
    ),
  },
  {
    accessorKey: "lastAppointment",
    header: "Últ. Agendamento",
    cell: ({ row }) => (
      <span className="font-tree text-sm">{row.original.lastAppointment ?? "—"}</span>
    ),
  },
  {
    accessorKey: "totalAppointments",
    header: "Agendamentos",
    cell: ({ row }) => (
      <span className="font-tree text-sm">{row.original.totalAppointments}</span>
    ),
  },
  {
    accessorKey: "totalSpent",
    header: "Total gasto",
    cell: ({ row }) => (
      <span className="font-tree text-sm">{currencyUtils.fromCents(row.getValue<number>("totalSpent"), "BRL")}</span>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row, table }) => {
      const { openScheduling, handleOpen, openEditCustomer,openDeleteCustomer, openMerge, openRevert, business } =
        table.options.meta as {
          openScheduling: (row: BusinessCustomer) => void
          openEditCustomer: (row: BusinessCustomer) => void
          openDeleteCustomer: (row: BusinessCustomer) => void
          handleOpen: (row: BusinessCtx, customer: BusinessCustomer) => void
          openMerge: (row: BusinessCustomer) => void
          openRevert: (row: BusinessCustomer) => void
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
                  <p className="text-black font-tree text-center truncate max-w-[160px]">{row.original.fullName}</p>
                  <p className="text-black/50 text-xs font-tree text-center">{row.original.telephone?.trim() ? maskPhone(row.original.telephone) : 'Sem telefone'}</p>
                </div>
                <span className="w-full h-0.5 rounded-full bg-(--agenrap-gray-800)/15" />
                <div className="flex items-center gap-x-2">
                  <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={() => openScheduling(row.original)}>
                    <CalendarPlus color="#BB77EE" />
                  </AgenrapButton>
                  <p className="text-black font-tree">Agendar</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={() => handleOpen(business!, row.original)}>
                    <ScrollText color="#FFE082" />
                  </AgenrapButton>
                  <p className="text-black font-tree">Ver agendamentos</p>
                </div>
                {row.original.possibleDuplicate && (
                  <div className="flex items-center gap-x-2">
                    <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={() => openMerge(row.original)}>
                      <GitMerge color="#BB77EE" />
                    </AgenrapButton>
                    <p className="text-black font-tree">Mesclar</p>
                  </div>
                )}
                {row.original.isRegistered && (
                  <div className="flex items-center gap-x-2">
                    <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={() => openRevert(row.original)}>
                      <RotateCcw color="#f87171" />
                    </AgenrapButton>
                    <p className="text-black font-tree">Mesclagens</p>
                  </div>
                )}
                {!row.original.isRegistered && (
                  <div className="flex items-center gap-x-2">
                    <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={() => openEditCustomer(row.original)}>
                      <PencilLine color="#3B82F6" />
                    </AgenrapButton>
                    <p className="text-black font-tree">Editar</p>
                  </div>
                )}
                {!row.original.isRegistered && (
                  <div className="flex items-center gap-x-2">
                    <AgenrapButton className="w-fit h-fit rounded-md bg-(--agenrap-gray-800) px-0 py-0 p-1" onClick={() => openDeleteCustomer(row.original)}>
                          <Trash color="#FF0000"  />
                    </AgenrapButton>
                    <p className="text-black font-tree">Deletar</p>
                  </div>
                )}
              </div>
            </AgenrapPopover>
          </div>
        </div>
      )
    },
  },
]

type TableCustomerPageable = {
  customers: BusinessCustomer[]
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
  page: number
  filter?: 'merged' | null
}

export default function TableCustomerSection({ customers, page, totalPages, hasNextPage, hasPrevPage, filter }: TableCustomerPageable) {
  const [schedulingOpen, setSchedulingOpen] = useState(false)
  const [schedulingCustomer, setSchedulingCustomer] = useState<BusinessCustomer | null>(null)
  const [mergeOpen, setMergeOpen] = useState(false)
  const [mergeCustomer, setMergeCustomer] = useState<BusinessCustomer | null>(null)
  const [revertOpen, setRevertOpen] = useState(false)
  const [revertCustomer, setRevertCustomer] = useState<BusinessCustomer | null>(null)
  const [editCustomer, setEditCustomer] = useState<BusinessCustomer | null>(null)
  const [openEditGuest, setOpenEditGuest] = useState(false)
  const [deleteGuest, setDeleteGuest] = useState<BusinessCustomer | null>(null)
  const [openDeleteGuest, setOpenDeleteGuest] = useState(false)
  const business = useBusinessStore(tgBsn => tgBsn.business)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCustomerForDrawer, setSelectedCustomerForDrawer] = useState<BusinessCustomer | null>(null)

  const openScheduling = (customer: BusinessCustomer) => {
    setSchedulingCustomer(customer)
    setSchedulingOpen(true)
    
  }

  const openMerge = (customer: BusinessCustomer) => {
    setMergeCustomer(customer)
    setMergeOpen(true)
  }

  const openRevert = (customer: BusinessCustomer) => {
    setRevertCustomer(customer)
    setRevertOpen(true)
  }

  const openEditCustomer = (customer: BusinessCustomer) => {
    setEditCustomer(customer)
    setOpenEditGuest(true)
  }
  const openDeleteCustomer = (customer: BusinessCustomer) => {
    setDeleteGuest(customer)
    setOpenDeleteGuest(true)
  }

  const [openAppointments, setOpenAppointments] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<AppointmentCancelRes | null>(null)
  const handleOpen = (bs: BusinessCtx, customer: BusinessCustomer) => {
    setOpenAppointments(true)
    startTransition(async () => {
      const res = await GetNextAppointments(bs.id, customer.userId ?? null, customer.customerId ?? null)
      setAppointments(res)
    })
  }

  const handleOpenMobileDrawer = (customer: BusinessCustomer) => {
    setSelectedCustomerForDrawer(customer)
    setDrawerOpen(true)
  }

  return (
    <>
      <ScheduleCustomerDialog open={schedulingOpen} setOpen={setSchedulingOpen} customer={schedulingCustomer} />
      <ShowAppointmentsDialog appointments={appointments!} open={openAppointments} onClose={() => setOpenAppointments(false)} />
      <MergeCustomerDialog open={mergeOpen} setOpen={setMergeOpen} customer={mergeCustomer} />
      <RevertMergeDialog open={revertOpen} setOpen={setRevertOpen} customer={revertCustomer} />
      <EditProfileDialog open={openEditGuest} setOpen={setOpenEditGuest} userGuest={editCustomer!} />
      <DeleteCustomerDialog open={openDeleteGuest} setOpen={setOpenDeleteGuest} customerGuest={deleteGuest!} setDrawerOpen={setDrawerOpen} />
      <div className={`flex flex-col gap-y-3 ${totalPages > 1 ? "pb-24" : "pb-6"} md:pb-0 lg:pb-0`}>

        <CustomerFilters page={page} totalPages={totalPages} hasNext={hasNextPage} hasPrev={hasPrevPage} />

        <div className="hidden lg:block">
          <AgenrapTable
            columns={columns}
            data={customers}
            notHaveFallBack="Ainda não há clientes"
            meta={{ openScheduling, handleOpen, openMerge, openRevert, openEditCustomer,openDeleteCustomer, business }}
          />
        </div>

        {/* Estrutura Mobile Renovada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3 ">
          {customers.length === 0 ? (
            <p className="text-center col-span-full py-10 text-sm text-(--agenrap-brown-500)/60 font-tree">
              Ainda não há clientes
            </p>
          ) : (
            customers.map((customer) => (
              <div
                key={customer.customerId || customer.userId}
                onClick={() => handleOpenMobileDrawer(customer)}
                className="bg-white dark:bg-(--agenrap-gray-900) rounded-xl p-4 border border-(--agenrap-gray-800)/10 active:scale-[0.99] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-y-3.5 cursor-pointer h-full"
              >
                {/* Topo: Perfil e Status Semântico */}
                <div className="flex items-start justify-between gap-x-3">
                  <div className="flex items-center gap-x-3 min-w-0">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--agenrap-gray-800) text-(--agenrap-yellow-200) font-tree text-xs font-semibold shrink-0 shadow-inner">
                      {getInitials(customer.fullName)}
                    </span>

                    <div className="flex flex-col min-w-0 gap-y-0.5">
                      <span className="font-tree font-bold text-sm text-(--agenrap-gray-800) dark:text-white truncate max-w-[160px]">
                        {customer.fullName}
                      </span>
                      {!customer.isRegistered && (
                        <span className="text-[10px] font-tree text-amber-700 dark:text-amber-400 bg-amber-500/10 w-fit px-1.5 py-0.5 rounded-md font-medium border border-amber-500/20">
                          sem conta
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lado Direito: Tags Semânticas de Ação */}
                  <div className="flex items-center gap-x-1.5 shrink-0 pt-0.5">
                    {customer.possibleDuplicate && (
                      <span className="flex items-center gap-x-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-tree font-bold animate-pulse">
                        <GitMerge size={10} />
                        Mesclar
                      </span>
                    )}
                    <div className="p-1 rounded-lg bg-(--agenrap-gray-800)/5">
                      <Ellipsis color="#BB77EE" size={16} />
                    </div>
                  </div>
                </div>

                {/* Divisor Minimalista */}
                <span className="w-full h-px bg-(--agenrap-gray-800)/5 dark:bg-white/5" />

                {/* Grid de Dados Balanceado */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-tree">
                  <div className="flex flex-col min-w-0">
                    <span className="text-(--agenrap-brown-500)/50 dark:text-white/40 text-[10px] uppercase font-semibold tracking-wider">Telefone</span>
                    <span className={`mt-1 font-medium truncate ${!customer.telephone?.trim() ? 'text-(--agenrap-brown-500)/40 italic' : 'text-(--agenrap-gray-800) dark:text-white/90'}`}>
                      {customer.telephone?.trim() ? maskPhone(customer.telephone) : 'Sem telefone'}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-(--agenrap-brown-500)/50 dark:text-white/40 text-[10px] uppercase font-semibold tracking-wider">Últ. Serviço</span>
                    <span className="text-(--agenrap-gray-800) dark:text-white/90 font-medium truncate mt-1" title={customer.lastServiceName ?? "Nenhum"}>
                      {customer.lastServiceName ?? "sem serviço"}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-(--agenrap-brown-500)/50 dark:text-white/40 text-[10px] uppercase font-semibold tracking-wider">Últ. Agendamento</span>
                    <span className="text-(--agenrap-gray-800) dark:text-white/90 font-medium mt-1 flex items-center gap-x-1">
                      <CalendarDays size={12} className="text-(--agenrap-brown-500)/40" />
                      {customer.lastAppointment ?? "—"}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-(--agenrap-brown-500)/50 dark:text-white/40 text-[10px] uppercase font-semibold tracking-wider">Qtd. Agendamentos</span>
                    <span className="text-(--agenrap-gray-800) dark:text-white/90 font-bold mt-1 bg-(--agenrap-gray-800)/5 w-fit px-2 py-0.5 rounded">
                      {customer.totalAppointments}
                    </span>
                  </div>
                </div>

                {/* Rodapé do Card: Destaque de Valor Gasto Semântico */}
                <div className="flex justify-between items-center bg-(--agenrap-brown-200)/40 dark:bg-white/5 px-3 py-2.5 rounded-xl border border-(--agenrap-brown-500)/10 mt-1">
                  <span className="text-(--agenrap-brown-500)/70 dark:text-white/60 text-[10px] uppercase font-bold tracking-wider font-tree">Total Acumulado</span>
                  <span className={`font-tree font-bold text-sm ${customer.totalSpent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-(--agenrap-gray-800)/40'}`}>
                    {currencyUtils.fromCents(customer.totalSpent, "BRL")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="md:hidden fixed bottom-10 h-20 left-0 right-0 z-20 px-4 py-1 pt-0 pb-3 bg-(--agenrap-brown-200) border-t border-(--agenrap-gray-800)/20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
            <AgenrapPagination page={page} totalPages={totalPages} hasNext={hasNextPage} hasPrev={hasPrevPage} />
          </div>
        )}
      </div>

      <Drawer open={drawerOpen} onOpenChange={(v) => !v && setDrawerOpen(false)}>
        {selectedCustomerForDrawer && (
          <DrawerContent className="px-5 pb-10 max-w-full" aria-describedby={undefined}>
            <DrawerHeader className="px-0 pt-4 pb-0 flex flex-col items-center gap-y-0.5">
              <DrawerTitle className="text-black font-tree text-center text-base leading-tight">
                {selectedCustomerForDrawer.fullName}
              </DrawerTitle>
              <p className="text-black/50 text-xs font-tree text-center">
                {selectedCustomerForDrawer.telephone?.trim() ? maskPhone(selectedCustomerForDrawer.telephone) : 'Sem telefone'}
              </p>
              {selectedCustomerForDrawer.email?.trim() && (
  <p className="text-black/30 text-[10px] font-tree text-center truncate max-w-[220px]">
    {selectedCustomerForDrawer.email}
  </p>
)}
              {selectedCustomerForDrawer.possibleDuplicate && (
                <span className="flex items-center gap-x-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#BB77EE20] text-[#BB77EE] text-xs font-tree font-semibold">
                  <GitMerge size={11} />
                  Mesclagem pendente
                </span>
              )}
            </DrawerHeader>

            <span className="w-full h-0.5 rounded-full bg-(--agenrap-gray-800)/15 my-4 block" />

            <div className={`grid gap-2 ${selectedCustomerForDrawer.isRegistered ? 'grid-cols-2' : 'grid-cols-2'}`}>
              <button
                onClick={() => { setDrawerOpen(false); openScheduling(selectedCustomerForDrawer) }}
                className="flex flex-col items-center gap-y-1.5 py-3 rounded-xl bg-(--agenrap-gray-800)/5 active:bg-(--agenrap-gray-800)/10 transition-colors"
              >
                <span className="rounded-md bg-(--agenrap-gray-800) p-1.5">
                  <CalendarPlus color="#FFE082" size={18} />
                </span>
                <p className="text-black font-tree text-xs text-center">Agendar</p>
              </button>

              <button
                onClick={() => { setDrawerOpen(false); handleOpen(business!, selectedCustomerForDrawer) }}
                className="flex flex-col items-center gap-y-1.5 py-3 rounded-xl bg-(--agenrap-gray-800)/5 active:bg-(--agenrap-gray-800)/10 transition-colors"
              >
                <span className="rounded-md bg-(--agenrap-gray-800) p-1.5">
                  <CalendarSearch color="#BB77EE" size={18} />
                </span>
                <p className="text-black font-tree text-xs text-center leading-tight">Ver agend.</p>
              </button>

              {selectedCustomerForDrawer.possibleDuplicate && (
                <button
                  onClick={() => { setDrawerOpen(false); openMerge(selectedCustomerForDrawer) }}
                  className="flex flex-col items-center gap-y-1.5 py-3 rounded-xl bg-[#BB77EE10] active:bg-[#BB77EE20] transition-colors"
                >
                  <span className="rounded-md bg-(--agenrap-gray-800) p-1.5">
                    <GitMerge color="#BB77EE" size={18} />
                  </span>
                  <p className="text-black font-tree text-xs text-center">Mesclar</p>
                </button>
              )}

              {!selectedCustomerForDrawer.isRegistered && (
                <AgenrapButton
                  onClick={() => openEditCustomer(selectedCustomerForDrawer)}
                  // Sobrescrevendo os estilos padrões do componente para virar o card completo
                  className="flex flex-col items-center gap-y-1.5  rounded-xl bg-(--agenrap-gray-800)/5 active:bg-(--agenrap-gray-800)/10 transition-colors w-full h-auto px-0 py-3 shadow-none border-0"
                >
                  {/* Mantendo a mesma estrutura do ícone envolvido por um quadrado cinza */}
                  <span className="rounded-md bg-(--agenrap-gray-800) p-1.5 shrink-0 flex items-center justify-center">
                    <PencilLine color="#3B82F6" size={18} />
                  </span>
                  <p className="text-black font-tree text-xs text-center font-normal">Editar</p>
                </AgenrapButton>
              )}
              {!selectedCustomerForDrawer.isRegistered && (
                <AgenrapButton
                  onClick={() => openDeleteCustomer(selectedCustomerForDrawer)}
                  // Sobrescrevendo os estilos padrões do componente para virar o card completo
                  className="flex flex-col items-center gap-y-1.5  rounded-xl bg-(--agenrap-gray-800)/5 active:bg-(--agenrap-gray-800)/10 transition-colors w-full h-auto px-0 py-3 shadow-none border-0"
                >
                  {/* Mantendo a mesma estrutura do ícone envolvido por um quadrado cinza */}
                  <span className="rounded-md bg-(--agenrap-gray-800) p-1.5 shrink-0 flex items-center justify-center">
                    <Trash color="#FF0000" size={18} />
                  </span>
                  <p className="text-black font-tree text-xs text-center font-normal">Deletar</p>
                </AgenrapButton>
              )}

              {selectedCustomerForDrawer.isRegistered && (
                <button
                  onClick={() => { setDrawerOpen(false); openRevert(selectedCustomerForDrawer) }}
                  className="flex flex-col items-center gap-y-1.5 py-3 rounded-xl bg-red-500/5 active:bg-red-500/10 transition-colors"
                >
                  <span className="rounded-md bg-(--agenrap-gray-800) p-1.5">
                    <RotateCcw color="#f87171" size={18} />
                  </span>
                  <p className="text-black font-tree text-xs text-center">Mesclagens</p>
                </button>
              )}
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </>
  )
}