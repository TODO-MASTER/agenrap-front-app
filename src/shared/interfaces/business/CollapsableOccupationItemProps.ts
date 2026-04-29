import { UseFieldArrayRemove } from "react-hook-form";
export interface CollapsableOccupationItemSimpleProps{
    name:string,
    duration:string,
    value:string,
}

export interface OccupationSimpleListProps{
    occupationList:CollapsableOccupationItemSimpleProps[]
}

export interface CollapsableOccupationItemProps{
    name:string,
    duration:string,
    price:string,
    remove: UseFieldArrayRemove,
    indx:number
}