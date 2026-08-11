'use client'

import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button"
import CardBusiness from "@/src/shared/components/agenrap-ui/card/card-business"
import ShowAppointmentsDialog from "@/src/shared/components/agenrap-ui/dialog/show-appointments-dialog"
import { GetNextAppointments } from "@/src/shared/services/appointment.service"
import { BusinessCtx } from "@/src/shared/types"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import { formatPublicHandle } from "@/src/shared/utils/formatters.utils"
import { ScrollText } from "lucide-react"
import { startTransition, useState } from "react"

export default function BusinessDisplay({ business }: { business: BusinessCtx[] }) {
  const [openAppointments, setOpenAppointments] = useState(false)
  const [appointments, setAppointments] = useState<AppointmentCancelRes | null>(null)

  function handleOpen(bs: BusinessCtx) {
    setOpenAppointments(true)
    startTransition(async () => {
      const res = await GetNextAppointments(bs.id)
      setAppointments(res)
    })
  }

  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <ShowAppointmentsDialog
        appointments={appointments!}
        open={openAppointments}
        onClose={() => setOpenAppointments(false)}
      />

      {business.map((bs) => {
        const atSign = formatPublicHandle(bs.atSign)

        return (
          <div key={bs.id} className="relative flex flex-col">
            <div className="absolute z-10 -mr-2 -mt-6 flex w-full justify-end">
              <div className="flex items-center justify-end gap-x-2 rounded-md border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) px-2 py-1">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => handleOpen(bs)}
                >
                  <ScrollText color="#FFE082" size={24} />
                </button>
              </div>
            </div>

            <CardBusiness
              name={bs.name!}
              atSign={atSign}
              init={bs.weeks[0]?.initial?.slice(0, 5) ?? ""}
              end={bs.weeks[0]?.end?.slice(0, 5) ?? ""}
              qtdService={bs.qtdServices!}
              isOpenToday={bs.isOpenToday}
              statusMessage={bs.statusMessage}
            />

            <AgenrapLinkButton hrefLink={`/${atSign}`}>
              {bs.isOpenToday ? "Ver serviços" : "Ver agenda"}
            </AgenrapLinkButton>
          </div>
        )
      })}
    </div>
  )
}