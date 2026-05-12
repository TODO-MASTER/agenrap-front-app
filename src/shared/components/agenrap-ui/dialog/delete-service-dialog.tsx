'use client'
import { Dispatch, SetStateAction, } from "react";

import { CalendarClockIcon, Trash, X } from "lucide-react";
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { Dialog,DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
interface DialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

export default function DeleteServiceDialog({ open, setOpen }: DialogProps) {
    const {handleDeleteServiceAction}=useBusinessActions()
    const selectedService = useBusinessStore(svs=>svs.selectedService)
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
                            <p className="font-tree text-white text-2xl font-semibold">Deletando um serviço</p>
                        </div>
                        <button type="button" onClick={() => setOpen(false)}>
                            <X size={25} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-y-4 px-8 pb-8">
                    <p className="font-tree text-white text-center text-lg">
                        Você tem certeza que deseja deletar <span className="text-red-600 font-bold">{selectedService?.name}</span>?
                    </p>

                    <div className="flex gap-x-3 w-full ">
                        <AgenrapButton
                        
                            className="w-full"
                            onClick={() => setOpen(false)}
                    
                        >
                            Voltar
                        </AgenrapButton>
                         
                        <AgenrapButton
                            className="w-full flex items-center justify-center gap-x-2 bg-red-600"
                          onClick={() => handleDeleteServiceAction(setOpen)}
                        >
                            <Trash size={25} color="#fff"/>
                            <p>Deletar</p>
                        </AgenrapButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}