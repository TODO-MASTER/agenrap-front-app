'use client'
import { Dispatch, SetStateAction, } from "react";



import { CalendarClockIcon, X } from "lucide-react";

import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions";
import { BusinessCtx } from "@/src/shared/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
interface DialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    business:BusinessCtx
}

export default function AgenrapDialogJoinSchedule({ open, setOpen,business }: DialogProps) {
    const {handleJoinScheduleByRap}=useCustomerActions()
    return (

     <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent
                className="flex flex-col w-full gap-y-6 bg-[#2e2e2e] border-0 p-0"
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <DialogHeader className="flex w-full justify-start px-8 py-4 border-b border-(--agenrap-purple-500)">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <CalendarClockIcon size={25} color="#fff" />
                            <p className="font-tree text-white text-2xl font-semibold">Agenda não adicionada</p>
                        </div>
                        <button type="button" onClick={() => setOpen(false)}>
                            <X size={25} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-y-4 px-8 pb-8">
                    <p className="font-tree text-white text-center text-lg">
                        Você ainda não está na agenda de{" "}
                        <span className="text-(--agenrap-yellow-200) font-bold">{business?.mnrName ?? business?.name}</span>.
                        Deseja adicioná-la?
                    </p>

                    <div className="flex gap-x-3 w-full ">
                        <AgenrapLinkButton
                        hrefLink="/appointments?mode=list"
                            className="w-full"
                            onClick={() => setOpen(false)}
                    
                        >
                            Voltar
                        </AgenrapLinkButton>
                         
                        <AgenrapButton
                            className="w-full"
                          onClick={() => handleJoinScheduleByRap(business.atSign)}
                        >
                            Adicionar
                        </AgenrapButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}