import { serverFetch } from "@/src/shared/lib/server-fetch.lib"
import { normalizePublicHandle } from "@/src/shared/utils/formatters.utils"
import { BusinessRes } from "@/src/features/business/types/business.types"
import { redirect } from "next/navigation"
import { HeaderSegmentInjector } from "@/src/shared/components/agenrap-ui/header/header-segment-injector"
import RangeTurnManager from "@/src/features/business/components/ambience/range-turn/range-turn-section"
import { BusinessCtx } from "@/src/shared/types"
import { BusinessInitializer } from "@/src/shared/components/agenrap-ui/initializers/business-initializer"

export default async function RangeTurnPage({
    searchParams
}: {
    searchParams: Promise<{ rap: string }>
}) {
    const { rap: rap } = await searchParams

    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(rap)}`)

    // Validação de segurança idêntica à sua tela de "Ver Todos"

    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }

    const targetBuinessWithServices = await serverFetch<BusinessCtx>(`business/per?atSign=${normalizePublicHandle(rap)}`)

    return (

        <div className="flex flex-col w-full">
            <BusinessInitializer data={targetBuinessWithServices} />
            {/* Menu de Abas Mobile */}
            <div className="flex md:hidden">
                <HeaderSegmentInjector segments={[
                    { label: 'Adicionar', href: `/dashboard/journey/new?rap=${rap}`, active: false },
                    { label: 'Ver Todos', href: `/dashboard/journey/list?rap=${rap}`, active: false },
                    { label: 'Bloqueios/Faixa', href: `/dashboard/journey/range-turn?rap=${rap}`, active: true },
                ]} />
            </div>

            {/* O gerenciador da tela injetando o contexto do negócio */}
            <RangeTurnManager tgrap={rap} />
        </div>
    )
}