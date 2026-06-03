'use client'

import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button"
import { AgenrapSegmentedControl } from "@/src/shared/components/agenrap-ui/button/agenrap-segment-button"
import CardServiceFit from "@/src/shared/components/agenrap-ui/card/card-service-fit"
import CardServiceMax from "@/src/shared/components/agenrap-ui/card/card-service-max"
import DeleteServiceDialog from "@/src/shared/components/agenrap-ui/dialog/delete-service-dialog"
import EditServiceDialog from "@/src/shared/components/agenrap-ui/dialog/edit-service-dialog"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { formatPublicHandle } from "@/src/shared/utils/formatters.utils"
import { BadgePlus, Pencil, Trash, X } from "lucide-react"
import { useState } from "react"

export default function ShowcaseDashServices() {
    const business = useBusinessStore(bsCtx => bsCtx.business)
    const setSelectService = useBusinessStore(bsCtx =>bsCtx.setSelectedService)
    const [editServiceOpen,setEditServiceOpen] = useState<boolean>(false)
    const [deleteServiceOpen,setDeleteServiceOpen] = useState<boolean>(false)
     const linkButtonResponsive = "md:w-fit  md:rounded-none md:h-21.25 md:px-3  md:gap-x-1 md:items-center md:self-auto  md:justify-center " +
        " items-center   justify-start  w-full  flex  w-fit self-end px-4 py-2 h-fit gap-x-2"
    return (
        <div className="flex flex-col gap-y-8 md:gap-y-16 px-6  items-center">
                    <div className="flex w-full  items-center justify-between gap-y-4 md:flex-nowrap flex-wrap">
                                <h1 className="lg:text-4xl md:text-2xl text-2xl font-tree font-medium">Serviços</h1>
<AgenrapSegmentedControl segments={[
    { label: 'Adicionar', href: `/dashboard/service/new?rap=${formatPublicHandle(business?.atSign)}`, active: false },
    { label: 'Ver Todos', href: `/dashboard/service/list?rap=${formatPublicHandle(business?.atSign)}`, active: true },
]} />
            
                            </div>
       
        <div className="grid w-full lg:grid-cols-4 md:grid-cols-2 relative grid-cols-1 gap-y-12 gap-x-10  z-0 ">
            <DeleteServiceDialog open={deleteServiceOpen} setOpen={setDeleteServiceOpen}/>
            <EditServiceDialog open={editServiceOpen} setOpen={setEditServiceOpen}/>
     
            {business?.services?.map(svs => (
                <div key={svs.id} className="flex flex-col relative">
                    <div className="flex  justify-end w-full -mt-6 -mr-2 absolute z-10">
                        <div className="border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) rounded-md px-2 py-1 flex justify-end gap-x-2">
                            <button type="button" className="cursor-pointer" onClick={()=>{
                                setEditServiceOpen(!editServiceOpen)
                                setDeleteServiceOpen(false)
                                setSelectService(svs)
                                }}><Pencil color="blue" size={22} /></button>
                            <button type="button" className="cursor-pointer"><X color="red" size={24} onClick={()=>{
                                setDeleteServiceOpen(!deleteServiceOpen)
                                setEditServiceOpen(false)
                                setSelectService(svs)
                                }}/></button>
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