import { ApiResponse } from "@/src/shared/types/api.shape.types";
export type SlotItem ={
    time:string
    available:boolean
    blockReason?:string
}
export type SlotRes = ApiResponse<{      slots:SlotItem[]
        bookedSlots?: string[]}>