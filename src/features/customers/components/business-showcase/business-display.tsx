'use client'
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import CardBusiness from "@/src/shared/components/agenrap-ui/card/card-business";
import ShowAppointmentsDialog from "@/src/shared/components/agenrap-ui/dialog/show-appointments-dialog";
import { GetNextAppointments } from "@/src/shared/services/appointment.service";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { BusinessCtx } from "@/src/shared/types";
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types";
import { DoorOpen, ScrollText, X } from "lucide-react";
import { startTransition, useState } from "react";



export default function BusinessDisplay({ business }: { business: BusinessCtx[] }) {

    const [openAppointments,setOpenAppointments] = useState<boolean>(false)
const [appointments, setAppointments] = useState<AppointmentCancelRes | null>(null)
function handleOpen(bs: BusinessCtx) {
  setOpenAppointments(true)
  startTransition(async () => {
    const res = await GetNextAppointments(bs.id)
    setAppointments(res)
  })
}
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-8 ">
            <ShowAppointmentsDialog appointments={appointments!} open={openAppointments} onClose={()=>{
                setOpenAppointments(false)
            }} />
            {business!.map(bs => (
                <div key={bs.id} className="flex flex-col relative">
                    <div className="flex  justify-end w-full -mt-6 -mr-2 absolute z-10">
                        <div className="border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) rounded-md px-2 py-1 flex justify-end gap-x-2">
                            <button type="button" className="cursor-pointer" onClick={() => {
                              handleOpen(bs)
                            }}><ScrollText color="#FFE082" size={24} /></button>
                            <button type="button" className="cursor-pointer"><DoorOpen color="red" size={24} onClick={() => {

                            }} /></button>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col" >
                            <CardBusiness name={bs.mnrName!} init={bs.weeks[0]?.initial?.slice(0, 5) ?? ""} end={bs.weeks[0]?.end?.slice(0, 5) ?? ""} qtdService={bs.qtdServices!} />
                            <AgenrapLinkButton hrefLink={`/${bs.name}`}>
                                Ver serviços
                            </AgenrapLinkButton>
                        </div>
                    </div>
                </div>

            ))

            }
        </div>



    )
}