'use client'
import CreateCustomerForm from "@/src/features/business/components/ambience/customer/create-customer-form"
import TableCustomerSection from "@/src/features/business/components/ambience/customer/table-customer-section"
import SubHeader from "@/src/shared/components/agenrap-ui/header/sub-header"
import { useSectionParams } from "@/src/shared/hooks/use-section-params"
import { useState } from "react"


type ViewMode = "new" | "list"

type Props = {
    tgrap: string
    initialMode: ViewMode
    customers: any        // seus tipos
    page: number
    hasNextPage: boolean
    hasPrevPage: boolean
    totalPages: number
    totalCount: number
}

export default function CustomersEditorOrchestre({ tgrap, initialMode, customers, page, hasNextPage, hasPrevPage, totalPages, totalCount }: Props) {
    const { setParam } = useSectionParams("/dashboard/customers")
    const [viewMode, setViewModeState] = useState<ViewMode>(initialMode)

    const modes = [
        { key: "new", label: "Adicionar" },
        { key: "list", label: `Ver Todos` },
    ]

    const setViewMode = (mode: ViewMode) => {
        setViewModeState(mode)
        setParam("mode", mode)
    }

    return (
        <main className="flex flex-col gap-y-8 mx-auto lg:w-[90%] w-[95%] mb-12 md:mb-6">
            <SubHeader
                title="Clientes"
                viewMode={viewMode}
                modes={modes}
                onModeChange={(key) => setViewMode(key as ViewMode)}
            />

            {viewMode === "list" ? (
                <TableCustomerSection
                    page={page}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    totalPages={totalPages}
                    customers={customers}
                />
            ) : (
                <div className="w-full flex justify-center">
                    <CreateCustomerForm rap={tgrap} onSuccess={() => setViewMode("list")} />
                </div>
            )}
        </main>
    )
}