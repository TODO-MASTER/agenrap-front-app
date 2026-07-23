'use client'
import { leaveBusinessAction } from "@/src/features/customers/services/customer.service";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import CardBusiness from "@/src/shared/components/agenrap-ui/card/card-business";
import ShowAppointmentsDialog from "@/src/shared/components/agenrap-ui/dialog/show-appointments-dialog";
import ConfirmActionDialog from "@/src/shared/components/agenrap-ui/dialog/confirm-action-dialog";
import { GetNextAppointments } from "@/src/shared/services/appointment.service";
import { BusinessCtx } from "@/src/shared/types";
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types";
import { formatPublicHandle } from "@/src/shared/utils/formatters.utils";
import { DoorOpen, ScrollText } from "lucide-react";
import { startTransition, useState } from "react";

export default function BusinessDisplay({ business }: { business: BusinessCtx[] }) {
    const [openAppointments, setOpenAppointments] = useState<boolean>(false)
    const [appointments, setAppointments] = useState<AppointmentCancelRes | null>(null)
    const [leaveTarget, setLeaveTarget] = useState<BusinessCtx | null>(null)

    function handleOpen(bs: BusinessCtx) {
        setOpenAppointments(true)
        startTransition(async () => {
            const res = await GetNextAppointments(bs.id)
            setAppointments(res)
        })
    }

    return (
        <div className="grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 gap-8">
            <ShowAppointmentsDialog
                appointments={appointments!}
                open={openAppointments}
                onClose={() => setOpenAppointments(false)}
            />

            <ConfirmActionDialog
                open={!!leaveTarget}
                setOpen={(value) => { if (!value) setLeaveTarget(null) }}
                icon={DoorOpen}
                title="Saindo da agenda"
                message={
                    <>
                        Você tem certeza que deseja sair de{" "}
                        <span className="text-red-600 font-bold">{leaveTarget?.name}</span>?
                    </>
                }
                confirmLabel="Sair"
                confirmIcon={DoorOpen}
                onConfirm={() => leaveBusinessAction(formatPublicHandle(leaveTarget!.atSign))}
            />

            {business!.map(bs => {
                const atSign = formatPublicHandle(bs.atSign)

                return (
                    <div key={bs.id} className="flex flex-col relative">
                        <div className="flex justify-end w-full -mt-6 -mr-2 absolute z-10">
                            <div className="border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) rounded-md px-2 py-1 flex justify-end gap-x-2 items-center">
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() => handleOpen(bs)}
                                >
                                    <ScrollText color="#FFE082" size={24} />
                                </button>

                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    title="Sair da agenda"
                                    onClick={() => setLeaveTarget(bs)}
                                >
                                    <DoorOpen
                                        color={bs.isOpenToday ? "red" : "#FFE082"}
                                        size={24}
                                    />
                                </button>
                            </div>
                        </div>

                        <CardBusiness
                            name={bs.name!}
                            atSign={atSign}
                            init={bs.weeks[0]?.initial?.slice(0, 5) ?? ""}
                            end={bs.weeks[0]?.end?.slice(0, 5) ?? ""}
                            qtdService={bs.qtdServices!}
                            isOpenToday={bs.isOpenToday}
                            statusMessage={bs.statusMessage}
                        />
                        <AgenrapLinkButton hrefLink={`/${atSign}`}>
                            {bs.isOpenToday ? "Ver serviços" : "Ver agenda"}
                        </AgenrapLinkButton>
                    </div>
                )
            })}
        </div>
    )
}