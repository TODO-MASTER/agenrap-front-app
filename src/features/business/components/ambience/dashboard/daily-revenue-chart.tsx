import { Eyebrow, SectionBlock } from "@/src/features/business/components/ambience/dashboard/dashboard-primitives"
import { CustomAreaTooltip } from "@/src/features/business/components/ambience/dashboard/dashboard-tooltips"
import { formatCurrency } from "@/src/features/business/hooks/use-dashboard-derived-data"
import { PURPLE, TEXT_MUTED } from "@/src/features/business/types/dashboard-constants"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

 
type AreaDataPoint = {
    day: string
    revenue: number
}
 
type Props = {
    data: AreaDataPoint[]
    monthLabel: string
    totalRevenue: number
}
 
export function DailyRevenueChart({ data, monthLabel, totalRevenue }: Props) {
    return (
        <SectionBlock className="lg:col-span-2">
            <div className="flex items-center justify-between">
                <Eyebrow label="Receita diária" title={monthLabel} />
                <span
                    className="font-tree text-xs px-2 py-1"
                    style={{ background: PURPLE + "25", color: PURPLE }}
                >
                    {formatCurrency(totalRevenue)} total
                </span>
            </div>
 
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor={PURPLE} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={PURPLE} stopOpacity={0}    />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tick={{ fill: TEXT_MUTED, fontSize: 10, fontFamily: "var(--font-tree)" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tickFormatter={(v) => `R$${(v / 100).toFixed(0)}`}
                            tick={{ fill: TEXT_MUTED, fontSize: 10, fontFamily: "var(--font-tree)" }}
                            axisLine={false}
                            tickLine={false}
                            width={56}
                        />
                        <Tooltip content={<CustomAreaTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={PURPLE}
                            strokeWidth={2}
                            fill="url(#purpleGrad)"
                            dot={{ fill: PURPLE, r: 2.5, strokeWidth: 0 }}
                            activeDot={{ r: 4, fill: PURPLE, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-36">
                    <p className="font-tree text-sm" style={{ color: TEXT_MUTED }}>
                        Nenhuma receita registrada ainda
                    </p>
                </div>
            )}
        </SectionBlock>
    )
}