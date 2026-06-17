'use client'

import CardServiceFit from "@/src/shared/components/agenrap-ui/card/card-service-fit"

import DeleteServiceDialog from "@/src/shared/components/agenrap-ui/dialog/delete-service-dialog"
import EditServiceDialog from "@/src/shared/components/agenrap-ui/dialog/edit-service-dialog"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { currencyUtils } from "@/src/shared/utils/currency.utils"

import { Pencil, X } from "lucide-react"
import { useState } from "react"

export default function ShowcaseDashServices() {
    const business = useBusinessStore(bsCtx => bsCtx.business)
    const setSelectService = useBusinessStore(bsCtx => bsCtx.setSelectedService)
    const [editServiceOpen, setEditServiceOpen] = useState<boolean>(false)
    const [deleteServiceOpen, setDeleteServiceOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col gap-y-8 md:gap-y-16   items-center">
            <div className="grid w-full lg:grid-cols-4 md:grid-cols-2 relative grid-cols-1 gap-y-12 gap-x-10  z-0 ">
                <DeleteServiceDialog open={deleteServiceOpen} setOpen={setDeleteServiceOpen} />
                <EditServiceDialog open={editServiceOpen} setOpen={setEditServiceOpen} />

                {business?.services?.map(svs => (
                    <div key={svs.id} className="flex flex-col relative">
                        <div className="flex  justify-end w-full -mt-6 -mr-2 absolute z-10">
                            <div className="border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) rounded-md px-2 py-1 flex justify-end gap-x-2">
                                <button type="button" className="cursor-pointer" onClick={() => {
                                    setEditServiceOpen(!editServiceOpen)
                                    setDeleteServiceOpen(false)
                                    setSelectService(svs)
                                }}><Pencil color="blue" size={22} /></button>
                                <button type="button" className="cursor-pointer"><X color="red" size={24} onClick={() => {
                                    setDeleteServiceOpen(!deleteServiceOpen)
                                    setEditServiceOpen(false)
                                    setSelectService(svs)
                                }} /></button>
                            </div>
                        </div>
                        <div>
                            <CardServiceFit name={svs.name} duration={svs.duration} value={currencyUtils.fromCents(svs.value, "BRL")} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}