import { CalendarCheck2, CalendarX2 } from "lucide-react"
import { DashboardSummary } from "@/src/features/business/types/dashboard.types"
import  { BG_CARD, BORDER, GOLD, BROWN, TEXT_MAIN, TEXT_MUTED } from "@/src/features/business/types/dashboard-constants"

type Props = {
    summary: DashboardSummary
    completionRate: string
    cancellationRate: string
}

export function RatesPanel({ summary, completionRate, cancellationRate }: Props) {
    return (
        <div className="flex flex-col gap-y-2">
            <div
                className="flex flex-col justify-between gap-y-3 p-4 border flex-1"
                style={{ background: BG_CARD, borderColor: BORDER, borderTop: `3px solid ${GOLD}` }}
            >
                <div className="flex items-start justify-between">
                    <p className="font-tree text-xs uppercase tracking-widest" style={{ color: TEXT_MUTED }}>
                        Taxa de conclusão
                    </p>
                    <CalendarCheck2 size={14} color={GOLD} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <p className="font-tree font-bold text-3xl" style={{ color: TEXT_MAIN }}>
                        {completionRate}
                        <span className="text-sm font-normal ml-0.5" style={{ color: TEXT_MUTED }}>%</span>
                    </p>
                    <div className="w-full h-1" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div className="h-1" style={{ width: `${completionRate}%`, background: GOLD }} />
                    </div>
                    <p className="font-tree text-xs" style={{ color: TEXT_MUTED }}>
                        {summary.appointmentsCompletedThisMonth} de {summary.appointmentsThisMonth} agendamentos
                    </p>
                </div>
            </div>

            <div
                className="flex flex-col justify-between gap-y-3 p-4 border flex-1"
                style={{ background: BG_CARD, borderColor: BORDER, borderTop: `3px solid ${BROWN}` }}
            >
                <div className="flex items-start justify-between">
                    <p className="font-tree text-xs uppercase tracking-widest" style={{ color: TEXT_MUTED }}>
                        Taxa de cancelamento
                    </p>
                    <CalendarX2 size={14} color={BROWN} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <p className="font-tree font-bold text-3xl" style={{ color: TEXT_MAIN }}>
                        {cancellationRate}
                        <span className="text-sm font-normal ml-0.5" style={{ color: TEXT_MUTED }}>%</span>
                    </p>
                    <div className="w-full h-1" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <div className="h-1" style={{ width: `${cancellationRate}%`, background: BROWN }} />
                    </div>
                    <p className="font-tree text-xs" style={{ color: TEXT_MUTED }}>
                        {summary.appointmentsCancelledThisMonth} cancelados esse mês
                    </p>
                </div>
            </div>
        </div>
    )
}