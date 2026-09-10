'use client'
import { ClockCheck, Trash } from "lucide-react"
import { timeUtils } from "@/src/shared/utils/time.utils"
import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form"
import { InitialBusinessServiceSchema } from "@/src/features/business/schemas"

type Props = {
  name: string
  duration: string
  price: string
  remove: UseFieldArrayRemove
  indx: number
  register: UseFormRegister<InitialBusinessServiceSchema>
  
}

export default function CollapsableServiceItem({
  name,
  duration,
  price,
  remove,
  indx,
  register,
}: Props) {
  return (
    <div className="w-full flex flex-col rounded-md bg-(--agenrap-gray-800) overflow-hidden">
      <div className="w-full flex justify-between pl-3 gap-x-1">
        <div className="flex flex-col gap-y-4 py-2">
          <p className="font-tree lg:text-2xl md:text-xl pl-2 text-white font-extrabold italic">
            {name}
          </p>
          <div className="flex gap-x-1">
            <ClockCheck color="#fff" />
            <p className="font-tree text-lg text-white font-medium">
              {timeUtils.toHourString(Number(duration))}
            </p>
          </div>
        </div>

        <div className="flex justify-end w-[60%] min-h-full rounded-r-md rounded-tl-[4.40rem] bg-(--agenrap-brown-200)/95 ">
          <button
            type="button"
            className="absolute z-20 -mt-2 -mr-2 bg-red-300/15 rounded-md p-1"
            onClick={() => remove(indx)}
          >
            <Trash color="red" />
          </button>
          <div className="flex justify-end md:w-[75%] w-[95%] h-[75%] rounded-br-md self-end py-2 pl-2 pr-1 rounded-tl-[4.40rem] bg-(--agenrap-gray-800)/50">
            <p className="text-white self-end font-tree font-bold md:text-4xl text-nowrap text-xl">
              {price.split(",")[0]},
              <span className="md:text-xl text-lg">{price.split(",")[1]}</span>
            </p>
          </div>
        </div>
      </div>

      {/* atribuição ao dono */}
      <label className="flex items-center gap-2 px-4 py-2.5 border-t border-(--agenrap-brown-500)/20 cursor-pointer select-none">
        <input
          type="checkbox"
          className="w-4 h-4 accent-(--agenrap-purple-500) cursor-pointer"
          {...register(`business.occupations.${indx}.assignToMe`)}
        />
        <span className="font-tree text-sm text-(--agenrap-yellow-200)">
          Eu atendo este serviço
        </span>
      </label>
    </div>
  )
}