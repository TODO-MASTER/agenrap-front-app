'use client'

import { CollapsableServiceItemSimpleProps } from "@/src/shared/components/agenrap-ui/card/card-service-fit";
import { ClockCheck } from "lucide-react";

export default function CardServiceMax({ name, duration, value, actionButton}: CollapsableServiceItemSimpleProps) {
    return (
        <div className="flex flex-col   rounded-md gap-x-1 min-h-50 bg-(--agenrap-gray-800)">
            <div className="flex justify-between h-full w-full  ">
                <div className="flex flex-col gap-y-1 w-full ">
                <div className="flex flex-col gap-y-2  py-2 pl-4  ">
                    <p className="font-tree text-xl  line-clamp-2 text-white font-extrabold italic">{name}</p>
                    <div className="flex gap-x-1">
                        <ClockCheck color="#fff" />
                        <p className="font-tree text-lg text-white font-medium">{duration}</p>
                    </div>
                             
                </div>
                  <div className="flex  w-full flex-1       items-center  py-2 pl-2   rounded-l-sm     bg-(--agenrap-brown-200) ">
                            {actionButton&&actionButton}

                </div>
                </div>
                <div className="flex justify-end w-full   h-full rounded-tr-sm  rounded-tl-4xl py-2  bg-(--agenrap-brown-200)">
          
                        <div className="flex justify-end  w-[95%] h-full   py-2 pl-2 pr-1  rounded-md bg-(--agenrap-brown-500) ">
                            <p className="text-white self-end font-tree font-bold md:text-2xl  text-xl">{value.split(",")[0]},<span className="md:text-xl text-lg ">{value.split(",")[1]}</span></p>
                        </div>
                

                </div>
     
            </div>

        </div>
    )
}