'use client'
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import CardServiceMax from "@/src/shared/components/agenrap-ui/card/CardServiceMax";
import AgenrapDialogScheduleForm from "@/src/shared/components/agenrap-ui/dialog/AgenrapDialogJoinSchedule";
import { currencyUtils } from "@/src/shared/utils/currencyUtils";
import { useState } from "react";
import { useBusinessStore } from "@/src/shared/store/useBusinessStore";
import { redirect } from "next/navigation";

export default function ServicesDisplay({ rap }: { rap: string }) {
    const business = useBusinessStore(bsnCtx => bsnCtx.business)
    const [open, setOpen] = useState<boolean>(false)


    const handleSetService = (id: number) => {  
         redirect(`/${rap}/schedule?svs=${id}`);
    }
    return (
        <>
            
            <div className="bg-(--agenrap-yellow-200)/5 p-4   no-scrollbar  rounded-md w-full  py-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 gap-x-10    ">

                {business?.services.map((oc, index) => (
                    <div key={index} className="flex flex-col ">
                        <CardServiceMax name={oc.name} duration={oc.duration} value={currencyUtils.fromCents(oc.value, "BRL")} />
                        <AgenrapButton onClick={() => handleSetService(oc.id)}>
                            Agendamento
                        </AgenrapButton>
                    </div>
                ))

                }
            </div>
        </>
    )
}