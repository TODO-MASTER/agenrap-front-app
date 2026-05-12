'use client'
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";

import { useState } from "react";
import { AgenrapCollapsableProps } from "@/src/shared/components/agenrap-ui/collapsable/types/agenrap-collapsable-props";
export default function AgenrapCollapsable({ children, collapseName, spawnNotifier }: AgenrapCollapsableProps) {
    const [collapseOpen,setCollapseOpen] = useState<boolean>(false)
    return (
        <Collapsible className=" ">
            <CollapsibleTrigger className="flex w-full justify-between items-center bg-(--agenrap-brown-500) rounded-md px-1 py-2 mb-4">
                <p className="text-white font-tree font-bold text-xl">{collapseName}</p>
                <div className="flex gap-1 items-center">
                {
                    spawnNotifier.haveNotifier &&
                    <p className="text-white font-tree font-bold ">+{spawnNotifier.qtdNotifier}</p>
                }
                {!collapseOpen?<ChevronsUpDown onClick={()=>setCollapseOpen(true)} className="hover:bg-(--agenrap-brown-200)/25 rounded-md p-1 cursor-pointer" color="#fff" width={35} height={35}/>
                :<ChevronsDownUp className="hover:bg-(--agenrap-brown-200)/25 rounded-md p-1 cursor-pointer" onClick={()=>setCollapseOpen(false)} color="#fff" width={35} height={35}/>}
                </div>
                </CollapsibleTrigger>
                
            <CollapsibleContent className="flex flex-col gap-y-2">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}