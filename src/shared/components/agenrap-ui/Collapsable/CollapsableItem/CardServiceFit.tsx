'use client'

import { ClockCheck, Trash } from "lucide-react";
import { CollapsableOccupationItemProps } from "./interfaces/CollapsableOccupationItemProps";
import { timeUtils } from "@/src/shared/utils/timeUtils";
export default function CardServiceFit({ name, duration, price}: CollapsableOccupationItemProps) {
    return (
        <div className="md:w-[60%] w-[85%] flex flex-col mx-auto  rounded-md  pl-3 gap-y-1 relative bg-(--agenrap-gray-800)">
            <div className="flex flex-col gap-y-2 py-2 ">
                <p className="font-tree lg:text-2xl md:text-xl pl-2  text-white font-extrabold italic">{name}</p>
                <div className="flex gap-x-1">
                    <ClockCheck color="#fff" />
                    <p className="font-tree text-lg text-white font-medium">{timeUtils.toHourString(Number(duration))}</p>
                </div>
            </div>
            <div className="flex justify-end self-end w-full p-4 pr-0 pb-0 min-h-full rounded-br-md rounded-tl-[4.40rem] bg-(--agenrap-green-300) ">
                <div className="flex justify-end self-end w-full p-8 pr-0 pb-0 min-h-full rounded-br-md rounded-tl-[4.40rem] bg-(--agenrap-brown-200)/95 ">
                    <div className="flex justify-end  w-full  rounded-br-md self-end py-2 pl-2 pr-1 rounded-tl-[4.40rem] bg-(--agenrap-gray-800)/50 ">
                        <p className="text-white self-end font-tree font-bold md:text-4xl text-nowrap text-xl">{price.split(",")[0]},<span className="md:text-xl text-lg ">{price.split(",")[1]}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}