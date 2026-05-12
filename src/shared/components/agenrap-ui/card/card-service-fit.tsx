'use client'

import { ClockCheck } from "lucide-react";
export interface CollapsableServiceItemSimpleProps{
    name:string,
    duration:string,
    value:string,
}
export default function CardServiceFit({ name, duration, value}: CollapsableServiceItemSimpleProps) {
    return (
        <div className=" flex flex-col w-full    pl-3 gap-y-1 relative bg-(--agenrap-gray-800)">
            <div className="flex flex-col gap-y-2 py-2 ">
                <p className="font-tree lg:text-2xl md:text-xl pl-2  break-all text-white font-extrabold italic">{name}</p>
                <div className="flex gap-x-1">
                    <ClockCheck color="#fff" />
                    <p className="font-tree text-lg text-white font-medium">{duration}</p>
                </div>
            </div>
            <div className="flex justify-end self-end w-full p-4 pt-4 py-0 pr-0 pb-0 h-full  rounded-tl-[4.40rem] bg-(--agenrap-yellow-200) ">
                {/* <div className="flex justify-end self-end w-full p-8 pr-0 pb-0 min-h-full rounded-br-md rounded-tl-[4.40rem] bg-(--agenrap-brown-200)/95 "> */}
                    <div className="flex justify-end  w-full   self-end py-2 pl-2 pr-1 rounded-tl-[4.40rem] bg-(--agenrap-gray-800)/50 ">
                        <p className="text-white self-end font-tree font-bold md:text-2xl text-nowrap text-xl">{value.split(",")[0]},<span className="md:text-xl text-lg ">{value.split(",")[1]}</span></p>
                    </div>
                
            </div>
        </div>
    )
}