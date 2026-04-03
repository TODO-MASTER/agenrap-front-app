import { UseFieldArrayRemove } from "react-hook-form";

export interface CollapsableOccupationItemProps{
    name:string,
    duration:string,
    price:string,
    remove: UseFieldArrayRemove,
    indx:number
}