'use client'
import { Service } from "@/src/features/business/types";
import CardServiceFit from "@/src/shared/components/agenrap-ui/card/card-service-fit";
import AgenrapDialogJoinSchedule from "@/src/shared/components/agenrap-ui/dialog/agenrap-dialog-join-schedule";
import { BusinessCtx } from "@/src/shared/types";
import { currencyUtils } from "@/src/shared/utils/currency.utils";
import { useEffect, useState } from "react";

type ITargetBusinessTServices = {
    businessTarget: BusinessCtx,
    serviceTarget: Service
}

export default function QuickSchedulingAnnouncementSection({ businessTarget, serviceTarget }: ITargetBusinessTServices) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (businessTarget?.haveAct === false && !open) {
            setOpen(true)
        } else if (businessTarget?.haveAct === true) {
            setOpen(false)
        }
    }, [businessTarget, open])



    return (
        <section>
            <AgenrapDialogJoinSchedule business={businessTarget!} open={open} setOpen={setOpen} />
            <p className="font-tree font-bold text-4xl md:py-8 py-4">{businessTarget.mnrName} - <span className="text-3xl font-semibold">Agendamento</span> </p>
            <div className="flex w-full md:bg-(--agenrap-purple-500) bg-(--agenrap-brown-500)/40 relative z-0 md:mb-8 mb-4  md:h-55 h-fit">
                <div className="md:bg-(--agenrap-brown-500)/85 bg-(--agenrap-brown-500)/40 p-4 lg:pl-14 lg:pr-8 md:px-8 md:py-5  rounded-bl-[99px] flex justify-between w-full h-full">
                    <div className=" hidden md:flex gap-2 lg:h-full md:h-[85%] ">
                        <span className="flex w-1.5 h-full  bg-(--agenrap-yellow-200)"></span>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-white font-tree font-bold md:text-3xl text-lg  ">Agendar</p>
                            <p className="text-white font-tree font-bold md:text-3xl text-lg mb-2">Rapidamente</p>
                            <p className="text-white font-tree font-medium  lg:text-lg  text-sm ">Ótima escolha de serviço, restam</p>
                            <p className="text-white font-tree font-medium lg:text-lg text-sm">apenas 3 etapas para finalizar seu</p>
                            <p className="text-yellow-200  font-tree font-bold  lg:text-lg text-sm">agendamento</p>
                        </div>
                    </div>
                    <div className="flex md:w-[50%] w-full">
                        <CardServiceFit name={serviceTarget.name} duration={serviceTarget.duration} value={currencyUtils.fromCents(serviceTarget.value, "BRL")} />
                    </div>
                </div>
            </div>
        </section>
    )
}