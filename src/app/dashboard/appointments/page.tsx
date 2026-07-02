
import TableAppointmentSection from "@/src/features/business/components/ambience/appointments/table-appointments-section"
import { getDashAppointmentsByRap } from "@/src/features/business/services/appointment.service"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { BusinessCtx } from "@/src/shared/types"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { redirect } from "next/navigation"
import { Suspense } from "react"
export const dynamic = 'force-dynamic'
interface SearchParams { page?: string; rap?: string ;  filter?: "today" | "completed"}

export default async function DashAppointmentPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { page, rap,filter } = await searchParams
     if (!rap) redirect('/login') 
  const pageNumber = Number(page) || 1

  const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(rap)}`)
  if (!res || !res.alreadyInitial) {
    redirect(`/business/booking-link?flash=${Buffer.from('Primeiro selecione um negócio').toString('base64')}`)
  }

  const targetBuinessWithServices = await serverFetch<BusinessCtx>(`business/per?atSign=${normalizePublicHandle(rap)}`)
  if (!targetBuinessWithServices) return <div>Algo deu errado!</div>
const resAppointments = await getDashAppointmentsByRap(
    rap ?? "",
    (filter as 'today' | 'completed' | null) ?? null,
    pageNumber
)

  return (
    <>
      <BusinessInitializer data={targetBuinessWithServices} />
      <div className="flex flex-col mx-auto  mb-6 lg:w-[90%] w-[95%]">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="font-tree font-semibold lg:text-2xl text-xl">Agendamentos</h1>
          <p className="font-tree text-sm text-(--agenrap-brown-500)/60">
            {resAppointments.totalCount > 0
              ? `${resAppointments.totalCount} serviço${resAppointments.totalCount !== 1 ? "s" : ""} pendente${resAppointments.totalCount !== 1 ? "s" : ""}`
              : "Nenhum serviço pendente"}
          </p>
        </div>
        <Suspense fallback={
          <div className="py-12 text-center text-(--agenrap-brown-500)">
            Carregando filtros e agendamentos...
          </div>
        }>
        <TableAppointmentSection filter={filter} hasNextPage={resAppointments.hasNextPage} hasPrevPage={resAppointments.hasPreviousPage} totalPages={resAppointments.totalPages} page={resAppointments.page} businessId={targetBuinessWithServices.id} appointments={resAppointments.data} />
        </Suspense>
      </div>
    </>
  )
}