'use client'

import { ClockCheck } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { Service } from "@/src/features/business/types"



interface AgenrapServiceSelectProps {
  services: Service[]
  onSelect: (serviceId: number) => void
  placeholder?: string
}

export default function AgenrapServiceSelect({
  services,
  onSelect,
  placeholder = "Selecione um serviço",
}: AgenrapServiceSelectProps) {
  return (
    <Select onValueChange={(val) => onSelect(Number(val))}>
      <SelectTrigger
        className="
          w-full bg-(--agenrap-gray-800) border border-(--agenrap-purple-500)/20
          text-white font-tree focus:ring-0 focus:ring-offset-0
          focus:border-(--agenrap-purple-500)/60 hover:border-(--agenrap-purple-500)/40
          transition-colors rounded-lg h-auto py-3 px-4
        "
      >
        <SelectValue
          placeholder={
            <span className="font-tree text-white/40">{placeholder}</span>
          }
        />
      </SelectTrigger>

      <SelectContent className="bg-(--agenrap-gray-800) border border-(--agenrap-purple-500)/20 rounded-lg p-1">
        <SelectGroup>
          {services.map((svs) => (
            <SelectItem
              key={svs.id}
              value={String(svs.id)}
              className="
                rounded-md cursor-pointer px-3 py-2
                focus:bg-(--agenrap-purple-500)/15
                data-[state=checked]:bg-(--agenrap-purple-500)/20
              "
            >
              <div className="flex items-center justify-between gap-x-4 w-full">
                <div className="flex flex-col gap-y-0.5">
                  <p className="font-tree text-white font-bold italic text-sm leading-tight">
                    {svs.name}
                  </p>
                  <div className="flex items-center gap-x-1">
                    <ClockCheck size={12} color="#BB77EE" />
                    <p className="font-tree text-white/60 text-xs">{svs.duration}</p>
                  </div>
                </div>
                <p className="font-tree text-(--agenrap-yellow-200) font-semibold text-sm text-nowrap shrink-0">
                  {currencyUtils.fromCents(svs.value, "BRL")}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}