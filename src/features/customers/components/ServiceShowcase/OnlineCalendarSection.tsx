'use client'
import { miniIcon } from "@/src/assets/images";
import AgenrapDialogJoinSchedule from "@/src/shared/components/agenrap-ui/dialog/AgenrapDialogJoinSchedule";
import { useBusinessStore } from "@/src/shared/store/useBusinessStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OnlineCalendarSection() {
    const [open,setOpen] = useState(false)
    const business = useBusinessStore(bsCtx=>bsCtx.business)
    useEffect(()=>{
        if(business?.haveAct===false &&   !open ){
        setOpen(true)
        }else if(business?.haveAct===true){
            setOpen(false)
        }
    },[business,open])
    return (
        <section className="md:h-52 h-45 flex flex-col md:p-12 p-4 md:pb-0 pb-0  items-center bg-(--agenrap-brown-500)/75">
                  <AgenrapDialogJoinSchedule business={business!} open={open} setOpen={setOpen}/>
            <div className="flex gap-x-2 h-full items-center">
                <Image src={miniIcon} alt="logo do agenrap versão mini" width={67} height={67} className="hidden md:block" />
                <Image src={miniIcon} alt="logo do agenrap versão mini" width={52} height={52} className="md:hidden block" />
                <span className="flex md:h-[45%] h-[25%] w-1 bg-(--agenrap-yellow-200)"></span>
                <p className="font-tree text-white lg:text-3xl md:text-2xl text-lg  font-bold">Essa é sua agenda online</p>
            </div>
            <div className=" bg-(--agenrap-gray-800)  w-fit  flex" >
                <p className="font-tree lg:text-xl text-sm  p-2 font-bold text-white">Disponibilizado por <span className="text-(--agenrap-yellow-200)">agenrap</span></p>
            </div>
        </section>
    )
}