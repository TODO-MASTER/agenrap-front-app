'use client'
import { ClockCheck, Trash } from "lucide-react";
import { CollapsableOccupationItemProps } from "./interfaces/CollapsableOccupationItemProps";
import { timeUtils } from "@/src/shared/utils/timeUtils";
export default function CardServiceMax({ name, duration, price, remove, indx }: CollapsableOccupationItemProps) {
    return (
        <div className="flex  w-full  rounded-md gap-x-1 bg-(--agenrap-gray-800)">
            <div className="flex justify-between h-37.5 w-full pl-3 relative z-0">
                <div className="flex flex-col gap-y-2 py-2 pl-2">
                    <p className="font-tree lg:text-2xl md:text-xl   text-white font-extrabold italic">{name}</p>
                    <div className="flex gap-x-1">
                        <ClockCheck color="#fff" />
                        <p className="font-tree text-lg text-white font-medium">{timeUtils.toHourString(Number(duration))}</p>
                    </div>
                </div>
                <div className="flex justify-end w-[60%] min-h-full  p-4 pr-0 pb-0 rounded-r-md rounded-tl-4xl bg-(--agenrap-green-300) ">
                    <button type="button" className="flex absolute justify-end -mt-8  -right-3  bg-red-300/15 rounded-md p-1" onClick={() => remove(indx)}><Trash color="red" /></button>
                    <div className="flex justify-end w-full self-end h-full rounded-r-md rounded-tl-4xl bg-(--agenrap-brown-200)/95 ">
                        <div className="flex justify-end  w-[95%] h-[85%] rounded-br-md self-end py-2 pl-2 pr-1 rounded-tl-4xl bg-(--agenrap-gray-800)/50 ">
                            <p className="text-white self-end font-tree font-bold md:text-4xl text-nowrap text-xl">{price.split(",")[0]},<span className="md:text-xl text-lg ">{price.split(",")[1]}</span></p>
                        </div>
                    </div>

                </div>
                <div className="flex  w-full z-[-1]  h-10 absolute p-4 bottom-0 -ml-3 rounded-b-md  pr-0 pb-0   bg-(--agenrap-green-300) "></div>
            </div>

        </div>
    )
}