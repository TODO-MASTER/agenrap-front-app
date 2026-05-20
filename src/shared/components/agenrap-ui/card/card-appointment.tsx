import { dateUtils } from "@/src/shared/utils/date.utils"
import { AppointmentCancelRes } from "@/src/shared/types/appointment.types"

type AppointmentItem = AppointmentCancelRes['data'][number]

const MONTHS = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"]

type Props = {
  ap: AppointmentItem
  onSelect: (appt: AppointmentItem) => void
}

export default function CardAppointment({ ap, onSelect }: Props) {
  const date  = dateUtils.fromDateString(ap.appointmentDate)
  const day   = date.getDate()
  const month = MONTHS[date.getMonth()]
  const hour  = ap.appointmentHour.slice(0, 5)
  const price = (ap.serviceValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div
      onClick={() => onSelect(ap)}
      className="w-full flex items-stretch rounded-xl overflow-hidden mb-2.5
        bg-(--agenrap-gray-800) border border-white/5
        hover:border-(--agenrap-purple-500)/60 hover:shadow-lg hover:shadow-black/30
        transition-all duration-200 cursor-pointer"
    >
      <div className="w-1.5 shrink-0" style={{ background: 'linear-gradient(to bottom, #FFE082, #C46210)' }} />

      <div className="flex flex-col items-center justify-center px-3 sm:px-4 py-4 min-w-14 border-r border-white/5">
        <span className="text-[9px] font-bold tracking-[0.25em] text-(--agenrap-yellow-200)">{month}</span>
        <span className="text-[28px] sm:text-3xl font-black leading-none text-white">{day}</span>
        <span className="text-[9px] tracking-wider font-semibold mt-1 text-gray-400">{ap.workingPeriodWeek}</span>
      </div>

      <div className="flex flex-col justify-center gap-1 px-3 sm:px-4 py-4 flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{ap.serviceName}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-(--agenrap-yellow-200) font-semibold">{hour}</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-400">{ap.serviceDuration}</span>
        </div>
      </div>

      <div className="flex items-center px-3 sm:px-4 shrink-0">
        <span className="text-sm font-bold text-(--agenrap-green-300)">{price}</span>
      </div>
    </div>
  )
}