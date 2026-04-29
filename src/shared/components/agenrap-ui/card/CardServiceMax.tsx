'use client'
import { CollapsableOccupationItemSimpleProps } from "@/src/shared/interfaces/business/CollapsableOccupationItemProps";
import { ClockCheck } from "lucide-react";

export default function CardServiceMax({ name, duration, value}: CollapsableOccupationItemSimpleProps) {
    return (
        <div className="flex   rounded-t-md gap-x-1 min-h-44 bg-(--agenrap-gray-800)">
            <div className="flex justify-between h-full w-full pl-3  relative z-0">
                <div className="flex flex-col gap-y-2 py-2 pl-2 pr-2  min-w-[50%] max-w-[50%]">
                    <p className="font-tree text-xl  line-clamp-2 text-white font-extrabold italic">{name}</p>
                    <div className="flex gap-x-1">
                        <ClockCheck color="#fff" />
                        <p className="font-tree text-lg text-white font-medium">{duration}</p>
                    </div>
                </div>
                <div className="flex justify-end w-[50%]  self-end h-full rounded-tr-sm  rounded-tl-4xl bg-(--agenrap-brown-200)">
          
                        <div className="flex justify-end  w-[95%] h-[85%]  self-end py-2 pl-2 pr-1 rounded-tl-4xl bg-(--agenrap-brown-500) ">
                            <p className="text-white self-end font-tree font-bold md:text-2xl  text-xl">{value.split(",")[0]},<span className="md:text-xl text-lg ">{value.split(",")[1]}</span></p>
                        </div>
                

                </div>
                <div className="flex  w-full z-[-1]  h-10 absolute p-4 bottom-0 -ml-3   pr-0 pb-0   bg-(--agenrap-brown-200) "></div>
            </div>

        </div>
    )
}