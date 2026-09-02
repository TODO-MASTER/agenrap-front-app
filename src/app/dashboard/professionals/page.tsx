import { Service } from "@/src/features/business/types"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { GetProfessionalsByBusiness } from "@/src/features/business/services/professional.service"
import { GetBusinessPerRap } from "@/src/shared/services/business.service"
import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { redirect } from "next/navigation"
import ProfessionalsPageClient from "@/src/features/business/components/ambience/professionals/professional-page-client"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"
import { GetWorkingPeriodPerRap } from "@/src/features/business/services"
import { normalizeWeek } from "@/src/shared/utils/normalize-week.utils"
import { WeeksInitializer } from "@/src/shared/components/agenrap-ui/initializers/weeks-initializer"

export default async function ProfessionalsPage({
  searchParams,
}: {
  searchParams: Promise<{ rap: string; pro?: string; tab?: string }>
}) {
  const { rap: bsnEncoded } = await searchParams

  const res = await serverFetch<BusinessRes>(
    `business/search-by-user?atSign=${normalizePublicHandle(bsnEncoded)}`
  )
  if (!res || !res.alreadyInitial) {
    const msg = Buffer.from("Primeiro selecione um negócio").toString("base64")
    redirect(`/business/booking-link?flash=${msg}`)
  }

  const business = await GetBusinessPerRap(bsnEncoded)
  const professionalsRes = await GetProfessionalsByBusiness(bsnEncoded)
  const weeks = await GetWorkingPeriodPerRap(bsnEncoded)
  const allWeeks = normalizeWeek(weeks)

  return (
    <>

      <WeeksInitializer data={allWeeks} />
      <BusinessInitializer data={business} />
      <ProfessionalsPageClient
        services={business.services}
        professionals={professionalsRes.data ?? []}
        tgrap={bsnEncoded}
      />
    </>
  )
}