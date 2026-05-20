import CardAppointment from "@/src/shared/components/agenrap-ui/card/card-appointment"
import { ScrollArea, ScrollBar } from "@/src/shared/components/ui/scroll-area"
import { Skeleton } from "@/src/shared/components/ui/skeleton"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"
import { CalendarDays } from "lucide-react"

type AppointmentItem = AppointmentCancelRes['data'][number]

type Props = {
  appointments: AppointmentCancelRes | null
  onSelect: (appt: AppointmentItem) => void
}

export default function AppointmentDisplay({ appointments, onSelect }: Props) {
  if (!appointments) return (
    <div className="flex flex-col gap-2.5 p-1">
      <Skeleton className="h-[72px] w-full rounded-xl bg-(--agenrap-gray-800)/40" />
      <Skeleton className="h-[72px] w-full rounded-xl bg-(--agenrap-gray-800)/30" />
      <Skeleton className="h-[72px] w-full rounded-xl bg-(--agenrap-gray-800)/20" />
    </div>
  )

  if (appointments.data.length === 0) return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <CalendarDays size={36} color="#C46210" opacity={0.4} />
      <p className="text-sm font-semibold text-(--agenrap-gray-800)/50">Nenhum agendamento futuro</p>
      <p className="text-xs text-(--agenrap-brown-500)/50">Você não possui agendamentos ativos no momento</p>
    </div>
  )

  return (
    <ScrollArea className="h-80 w-full px-1">
      <ScrollBar primitiveThumbVar="rounded-full bg-(--agenrap-yellow-200)" />
      <div className="flex flex-col p-1">
        {appointments.data.map(ap => (
          <CardAppointment ap={ap} key={ap.appointmentId} onSelect={onSelect} />
        ))}
      </div>
    </ScrollArea>
  )
}