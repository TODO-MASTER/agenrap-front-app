
import CreateCustomerForm from '@/src/features/business/components/ambience/customer/create-customer-form'
import { BusinessRes } from '@/src/features/business/types/business.types'
import { AgenrapSegmentedControl } from '@/src/shared/components/agenrap-ui/button/agenrap-segment-button'
import { serverFetch } from '@/src/shared/lib/server-fetch.lib'
import { normalizePublicHandle } from '@/src/shared/utils/formatters.utils'
import { redirect } from 'next/navigation'

export default async function CreateCustomerPage({
    searchParams
}: {
    searchParams: Promise<{ rap?: string }>
}) {
    const { rap } = await searchParams
    const res = await serverFetch<BusinessRes>(`business/search-by-user?atSign=${normalizePublicHandle(rap)}`)
    if (!res || !res.alreadyInitial) {
        const msg = Buffer.from('Primeiro selecione um negócio').toString('base64')
        redirect(`/business/booking-link?flash=${msg}`)
    }

return (
        <div className="flex flex-col mx-auto mt-8 gap-6 mb-6 lg:w-[90%] w-[95%]">
            <div className="flex w-full justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="font-tree font-semibold lg:text-2xl text-xl">Clientes</h1>
                    <p className="font-tree text-sm text-(--agenrap-brown-500)/60">
                        Cadastre um cliente para este negócio
                    </p>
                </div>
                <AgenrapSegmentedControl segments={[
                    { label: 'Adicionar', href: `/dashboard/customers/new?rap=${rap}`, active: true },
                    { label: 'Ver Todos', href: `/dashboard/customers?rap=${rap}`, active: false },
                ]} />
            </div>
            <div className="w-full flex justify-center">
                <CreateCustomerForm rap={rap ?? ''} />
            </div>
        </div>
    )
}