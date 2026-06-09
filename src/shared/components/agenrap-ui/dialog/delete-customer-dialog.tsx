'use client'
import { Dispatch, SetStateAction, } from "react";

import { CalendarClockIcon, LoaderCircle, Trash, X } from "lucide-react";
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { Dialog,DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import { useRouter } from "next/navigation";
import { macroLogo } from "@/src/assets/images";
import Image from "next/image";
import { BusinessCustomer } from "@/src/features/business/types";
interface DialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setDrawerOpen: Dispatch<SetStateAction<boolean>>,
    customerGuest:BusinessCustomer
}

export default function DeleteCustomerDialog({ open, setOpen,customerGuest,setDrawerOpen }: DialogProps) {
    const {handleDeleteCustomerAction,isPending}=useBusinessActions()
    const router = useRouter()
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
                            <p className="font-tree text-white text-2xl font-semibold">Deletando um Cliente</p>
                        </div>
                        <button type="button" onClick={() => setOpen(false)}>
                            <X size={25} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-y-4 px-8 pb-8">
                    <p className="font-tree text-white text-center text-lg">
                        Você tem certeza que deseja deletar <span className="text-red-600 font-bold">{customerGuest?.fullName}</span>?
                    </p>

                    <div className="flex gap-x-3 w-full ">
                        <AgenrapButton
                        
                            className="w-full"
                            onClick={() => setOpen(false)}
                    
                        >
                            Voltar
                        </AgenrapButton>
                         
                        <AgenrapButton
                        disabled={isPending}
                            className="w-full flex items-center justify-center gap-x-2 bg-red-600"
                          onClick={() => handleDeleteCustomerAction(customerGuest.customerId??null,()=>{
                            router.refresh()
                            setDrawerOpen(false)
                            setOpen(false)
                          })}
                        >
                              {isPending ? (
                        <div className="flex w-full justify-center items-center relative">
                            <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                        </div>
                    ) : <div className="w-full flex items-center justify-center gap-x-2">
                         <Trash size={25} color="#fff"/>
                            <p>Deletar</p>
                        </div>}
                           
                        </AgenrapButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}