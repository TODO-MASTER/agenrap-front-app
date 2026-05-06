'use client'
import { ClockCheck, Trash } from "lucide-react";
import { CollapsableOccupationItemProps } from "../../../../interfaces/business/CollapsableOccupationItemProps";
import { timeUtils } from "@/src/shared/utils/timeUtils";
export default function CollapsableOccupationItem({ name, duration, price,remove,indx }: CollapsableOccupationItemProps) {
    return (
        <div className="w-full flex justify-between rounded-md  pl-3 gap-x-1 bg-(--agenrap-gray-800)">
            <div className="flex flex-col gap-y-4 py-2 ">
                <p className="font-tree lg:text-2xl md:text-xl pl-2  text-white font-extrabold italic">{name}</p>
                <div className="flex gap-x-1">
                    <ClockCheck color="#fff" />
                    <p className="font-tree text-lg text-white font-medium">{timeUtils.toHourString(Number(duration))}</p>
                </div>
            </div>
            <div className="flex justify-end w-[60%] min-h-full rounded-r-md rounded-tl-[4.40rem] bg-(--agenrap-brown-200)/95 ">
            <button type="button" className="flex absolute justify-end -mt-2 -mr-2  bg-red-300/15 rounded-md  p-1" onClick={()=>remove(indx)}><Trash color="red"/></button>
                <div className="flex justify-end md:w-[75%] w-[95%] h-[75%] rounded-br-md self-end py-2 pl-2 pr-1 rounded-tl-[4.40rem] bg-(--agenrap-gray-800)/50 ">
                    <p className="text-white self-end font-tree font-bold md:text-4xl text-nowrap text-xl">{price.split(",")[0]},<span className="md:text-xl text-lg ">{price.split(",")[1]}</span></p>
                </div>
            </div>
        </div>
    )
}