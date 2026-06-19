"use client"

import {
    CalendarCheck2,
    CircleDollarSign,
    Clock3,
    Users,
} from "lucide-react"
import { DashboardSummary } from "@/src/features/business/types/dashboard.types"
import { formatCurrency, useDashboardDerivedData } from "@/src/features/business/hooks/use-dashboard-derived-data"
import { KpiCard } from "@/src/features/business/components/ambience/dashboard/kpi-card"
import { DailyRevenueChart } from "@/src/features/business/components/ambience/dashboard/daily-revenue-chart"
import { AppointmentStatusChart } from "@/src/features/business/components/ambience/dashboard/appointment-status-chart"
import { TopServicesChart } from "@/src/features/business/components/ambience/dashboard/top-services-chart"
import { RatesPanel } from "@/src/features/business/components/ambience/dashboard/rates-panel"
import { BG_ROOT, BG_CARD, BORDER, GOLD, PURPLE, BROWN, TEXT_MAIN, TEXT_MUTED, TEXT_SUB } from "@/src/features/business/types/dashboard-constants"


type Props = {
    summary: DashboardSummary
    businessName: string
}

export default function DashboardClient({ summary, businessName }: Props) {
    const {
        variation,
        monthLabel,
        greeting,
        cancellationRate,
        completionRate,
        pieData,
        areaData,
        barData,
    } = useDashboardDerivedData(summary)

    return (
        <div className="flex flex-col gap-y-3 w-full" style={{ background: BG_ROOT }}>

            <div className="flex flex-col gap-y-0.5 border-b pb-3" style={{ borderColor: "#D9D0C8" }}>
                <p className="font-tree text-xs uppercase tracking-widest" style={{ color: "#9A7B5A" }}>
                    {greeting}
                </p>
                <h1 className="font-tree font-bold text-2xl" style={{ color: "#1C0F00" }}>
                    {businessName}
                </h1>
                <p className="font-tree text-xs" style={{ color: "#9A7B5A" }}>
                    Visão geral · {monthLabel}
                </p>
            </div>

            {summary.nextAppointment ? (
                <div
                    className="flex items-center justify-between p-3 border"
                    style={{
                        background: BG_CARD,
                        borderColor: BORDER,
                        borderLeft: `3px solid ${GOLD}`,
                    }}
                >
                    <div className="flex items-center gap-3">
                        <Clock3 size={15} color={GOLD} />
                        <div>
                            <p className="font-tree text-xs uppercase tracking-widest" style={{ color: TEXT_MUTED }}>
                                Próximo atendimento
                            </p>
                            <p className="font-tree font-bold text-sm" style={{ color: TEXT_MAIN }}>
                                {summary.nextAppointment.clientName}
                                <span className="font-normal ml-2" style={{ color: TEXT_SUB }}>
                                    — {summary.nextAppointment.serviceName}
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="font-tree font-bold text-lg" style={{ color: GOLD }}>
                        {summary.nextAppointment.hour.slice(0, 5)}
                    </p>
                </div>
            ) : (
                <div
                    className="flex items-center gap-3 p-3 border"
                    style={{ background: BG_CARD, borderColor: BORDER }}
                >
                    <Clock3 size={15} color={TEXT_MUTED} />
                    <p className="font-tree text-sm" style={{ color: TEXT_MUTED }}>
                        Nenhum atendimento agendado para hoje
                    </p>
                </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <KpiCard
                    label="Receita hoje"
                    value={formatCurrency(summary.revenueToday)}
                    sub={`Semana: ${formatCurrency(summary.revenueThisWeek)}`}
                    icon={<CircleDollarSign size={14} />}
                    accent={PURPLE}
                />
                <KpiCard
                    label="Receita do mês"
                    value={formatCurrency(summary.revenueThisMonth)}
                    icon={<CircleDollarSign size={14} />}
                    accent={GOLD}
                    trend={variation}
                />
                <KpiCard
                    label="Clientes ativos"
                    value={String(summary.totalActiveCustomers)}
                    sub={`+${summary.newCustomersThisMonth} esse mês`}
                    icon={<Users size={14} />}
                    accent={BROWN}
                />
                <KpiCard
                    label="Agendamentos"
                    value={String(summary.appointmentsThisMonth)}
                    sub={`Hoje: ${summary.appointmentsToday}`}
                    icon={<CalendarCheck2 size={14} />}
                    accent={PURPLE}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <DailyRevenueChart
                    data={areaData}
                    monthLabel={monthLabel}
                    totalRevenue={summary.revenueThisMonth}
                />
                <AppointmentStatusChart
                    data={pieData}
                    monthLabel={monthLabel}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <TopServicesChart
                    data={barData}
                    monthLabel={monthLabel}
                />
                <RatesPanel
                    summary={summary}
                    completionRate={completionRate}
                    cancellationRate={cancellationRate}
                />
            </div>
        </div>
    )
}