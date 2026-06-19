"use client"

import { BROWN, GOLD, MONTH_NAMES, PURPLE } from "@/src/features/business/types/dashboard-constants"
import { DashboardSummary } from "@/src/features/business/types/dashboard.types"
import { currencyUtils } from "@/src/shared/utils/currency.utils"

export function formatCurrency(cents: number) {
    return currencyUtils.fromCents(cents)
}
 
export function formatShortDate(dateStr: string) {
    const [, , day] = dateStr.split("-")
    return day
}
 
function revenueVariation(current: number, previous: number) {
    if (previous === 0) return null
    return ((current - previous) / previous) * 100
}
 
export function useDashboardDerivedData(summary: DashboardSummary) {
    const variation = revenueVariation(summary.revenueThisMonth, summary.revenuePreviousMonth)
 
    const now = new Date()
    const monthLabel = `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`
 
    const h = now.getHours()
    const greeting = h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite"
 
    const cancellationRate = summary.appointmentsThisMonth > 0
        ? ((summary.appointmentsCancelledThisMonth / summary.appointmentsThisMonth) * 100).toFixed(0)
        : "0"
 
    const completionRate = summary.appointmentsThisMonth > 0
        ? ((summary.appointmentsCompletedThisMonth / summary.appointmentsThisMonth) * 100).toFixed(0)
        : "0"
 
    const pieData = [
        { name: "Concluídos", value: summary.appointmentsCompletedThisMonth, fill: PURPLE },
        { name: "Cancelados", value: summary.appointmentsCancelledThisMonth,  fill: BROWN  },
        {
            name: "Agendados",
            value: summary.appointmentsThisMonth
                - summary.appointmentsCompletedThisMonth
                - summary.appointmentsCancelledThisMonth,
            fill: GOLD,
        },
    ].filter((d) => d.value > 0)
 
    const areaData = summary.dailyRevenueThisMonth.map((d) => ({
        day: formatShortDate(d.date),
        revenue: d.revenue,
    }))
 
    const barData = summary.topServices.map((s) => ({
        name: s.serviceName.length > 18 ? s.serviceName.slice(0, 18) + "…" : s.serviceName,
        fullName: s.serviceName,
        count: s.count,
    }))
 
    return {
        variation,
        monthLabel,
        greeting,
        cancellationRate,
        completionRate,
        pieData,
        areaData,
        barData,
    }
}