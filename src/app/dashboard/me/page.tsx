import { redirect } from "next/navigation"
import { GetStaffContext } from "@/src/features/business/services/professional.service"
import ProfessionalScheduleSection from "@/src/features/business/components/ambience/professionals/professional-schedule-section"
import RangeTurnManager from "@/src/features/business/components/ambience/range-turn/range-turn-section"
import MyServicesSection from "@/src/features/business/components/ambience/professionals/my-services-section"
import { GetBusinessPerRap } from "@/src/shared/services/business.service"
import MyProfessionalPageClient from "@/src/features/business/components/ambience/professionals/me/my-professional-page-client"

export default async function MyProfessionalPage({
  searchParams,
}: {
  searchParams: Promise<{ rap?: string }>
}) {
  const { rap } = await searchParams
  if (!rap) redirect("/")

  const ctx = await GetStaffContext(rap)
  if (!ctx.data || ctx.data.isManager || !ctx.data.professionalId) {
    redirect(`/dashboard?rap=${rap}`)
  }

  const business = await GetBusinessPerRap(rap)
  const myServiceIds = ctx.data.serviceIds ?? []
  const canEditServices = (ctx.data.permissionCodes ?? []).includes("house.service.edit")

  return (
    <MyProfessionalPageClient
      tgrap={rap}
      professionalId={ctx.data.professionalId!}
      professionalName={ctx.data.professionalName ?? null}
      avatarColor={ctx.data.avatarColor}
      telephone={ctx.data.telephone}
      services={business.services ?? []}
      initialServiceIds={myServiceIds}
      canEdit={canEditServices}
    />
  )
}