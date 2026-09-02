'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import {
  AlarmClock,
  AlarmClockOff,
  LoaderCircle,
  LucideSkipBack,
  Pencil,
  TimerReset,
  X,
} from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  weekLabel: string
  initial: string
  end: string
  pending?: boolean
  onSave: (initial: string, end: string) => void
}

export default function ProfessionalEditWkpDialog({
  open,
  setOpen,
  weekLabel,
  initial,
  end,
  pending,
  onSave,
}: Props) {
  const [start, setStart] = useState(initial)
  const [finish, setFinish] = useState(end)

  useEffect(() => {
    if (open) {
      setStart(initial.slice(0, 5))
      setFinish(end.slice(0, 5))
    }
  }, [open, initial, end])

  const invalid = !start || !finish || start >= finish

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent
        className="flex flex-col w-full gap-y-6 bg-[#2e2e2e] border-0 p-0"
        showCloseButton={false}
        aria-describedby={undefined}
      >
        <DialogHeader className="flex w-full justify-start px-8 py-4 border-b border-(--agenrap-purple-500)/10">
          <DialogTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TimerReset color="#fff" className="md:w-12 md:h-12 w-8 h-8" />
              <div>
                <p className="font-tree text-white md:text-2xl text-lg font-semibold">
                  Alterar Expediente
                </p>
                <div className="bg-(--agenrap-purple-500)/10 border w-fit border-(--agenrap-purple-500)/15 p-1 rounded-lg">
                  <p className="font-tree font-normal text-(--agenrap-purple-500) text-lg">
                    {weekLabel}
                  </p>
                </div>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)}>
              <X size={25} color="red" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="bg-(--agenrap-gray-800) rounded-b-md w-full py-2 px-4 flex flex-col gap-4">
          <div className="flex gap-2 items-center w-full">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-white font-tree text-sm">De</span>
              <div className="flex items-center gap-2 border border-(--agenrap-yellow-200)/85 bg-(--agenrap-yellow-200)/25 rounded-[2px] px-2">
                <AlarmClock size={16} color="#fff" />
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="bg-transparent text-white outline-none p-2 w-full font-tree text-sm [&::-webkit-calendar-picker-indicator]:hidden"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-white font-tree text-sm">Até</span>
              <div className="flex items-center gap-2 border border-(--agenrap-yellow-200)/85 bg-(--agenrap-yellow-200)/25 rounded-[2px] px-2">
                <AlarmClockOff size={16} color="#fff" />
                <input
                  type="time"
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="bg-transparent text-white outline-none p-2 w-full font-tree text-sm [&::-webkit-calendar-picker-indicator]:hidden"
                />
              </div>
            </div>
          </div>

          {invalid && (
            <span className="text-xs text-red-300">Horário final deve ser após o inicial</span>
          )}

          <div className="flex gap-2 items-center justify-end w-full mb-2">
            <AgenrapButton
              variant="purplerap"
              type="button"
              onClick={() => setOpen(false)}
              className="flex gap-x-2 justify-center h-fit w-fit items-center"
            >
              <div className="flex gap-x-2 justify-center items-center p-2">
                <LucideSkipBack width={24} height={24} color="#fff" />
                <p className="font-tree text-lg font-medium">voltar</p>
              </div>
            </AgenrapButton>
            <AgenrapButton
              disabled={invalid || pending}
              variant="purplerap"
              type="button"
              onClick={() => onSave(start, finish)}
              className={`flex gap-x-2 justify-center h-fit w-fit bg-(--agenrap-yellow-200) items-center ${
                invalid || pending ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {pending ? (
                <div className="flex relative">
                  <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                  <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                </div>
              ) : (
                <div className="flex gap-x-2 justify-center items-center p-2">
                  <Pencil width={24} height={24} color="#000" />
                  <p className="font-tree text-lg font-medium text-black">Salvar</p>
                </div>
              )}
            </AgenrapButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}