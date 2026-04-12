'use client'
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import AgenrapCalendar from "../calendar/AgenrapCalendar";
import AgenrapButton from "../button/AgenrapButton";
import { CalendarClockIcon, X } from "lucide-react";

export default function AgenrapDialogScheduleForm() {
    const [open, setOpen] = useState<boolean>(false)
    const [haveDate, setDate] = useState<Date | undefined>()
    return (

        <Dialog open={open} onOpenChange={() => setOpen(!open)}    >
            <div className=""></div>
            <AgenrapButton onClick={() => setOpen(!open)}>Open</AgenrapButton>
            <DialogContent className="flex flex-col w-full  gap-y-2 bg-[#2e2e2e] border-0 p-0 " showCloseButton={false} aria-describedby={undefined}>
                <DialogHeader className="flex w-full justify-start px-8 py-4 border-b border-(--agenrap-purple-500)" >
                    <DialogTitle className="flex justify-between " >
                        <div className="flex items-center gap-1">
                            <CalendarClockIcon size={25} color="#fff"/>
                        <p className="font-tree text-white text-2xl font-semibold">Agendamento</p>
                        </div>
                        <button><X size={25} color="red"/></button>
                    </DialogTitle>

                </DialogHeader>
                <div className="w-full flex flex-col max-h-[75vh] pb-2 pt-4 gap-2  overflow-y-auto no-scrollbar items-center">
                    <AgenrapCalendar date={haveDate} setDate={setDate} className="w-[85%]" />
                    {haveDate ?
                        <div className="grid grid-cols-4 gap-1 w-[85%] bg-(--agenrap-brown-500)/10 border border-(--agenrap-brown-500) mt-2 px-2 py-2  ">
                            {["08:30",
                                "09:00",
                                "09:30",
                                "10:00",
                                "10:30",
                                "11:00",
                                "11:30",
                                "12:00",
                                "12:30",
                                "13:00",
                                "13:30",
                                "14:00",
                                "14:30",
                                "15:00",
                                "15:30",
                                "16:00",
                                "16:30",
                                "17:00",
                                "17:30"].map((hrs, index) => (
                                    <div key={index} className="p-2  group bg-[#FFE082]/10 hover:bg-(--agenrap-purple-500)  transition-colors">
                                        <p className="text-center text-lg text-amber-100 group-hover:text-white">{hrs}</p>
                                    </div>
                                ))}
                        </div> : <p className="font-tree text-sm font-medium  text-white">Nenhum dia foi selecionado para ver os horários</p>}
                        <div className="flex w-[85%] pb-4">
                    <AgenrapButton className="h-25  py-6 w-full" onClick={() => setOpen(!open)}>Open</AgenrapButton>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}