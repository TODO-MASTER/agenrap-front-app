import { BG_CARD, BORDER, BROWN, GOLD, TEXT_MAIN, TEXT_MUTED } from "@/src/features/business/types/dashboard-constants"
import { TrendingDown, TrendingUp } from "lucide-react"

type KpiCardProps = {
    label: string
    value: string
    sub?: string
    icon: React.ReactNode
    accent: string
    trend?: number | null
}
 
export function KpiCard({ label, value, sub, icon, accent, trend }: KpiCardProps) {
    return (
        <div
            className="flex flex-col justify-between gap-y-2 p-4 border"
            style={{
                background: BG_CARD,
                borderColor: BORDER,
                borderTop: `3px solid ${accent}`,
            }}
        >
            <div className="flex items-start justify-between">
                <p className="font-tree text-xs uppercase tracking-widest" style={{ color: TEXT_MUTED }}>
                    {label}
                </p>
                <span style={{ color: accent }}>{icon}</span>
            </div>
            <div className="flex flex-col gap-y-0.5">
                <p className="font-tree font-bold text-xl" style={{ color: TEXT_MAIN }}>{value}</p>
                {sub && <p className="font-tree text-xs" style={{ color: TEXT_MUTED }}>{sub}</p>}
                {trend !== null && trend !== undefined && (
                    <div className="flex items-center gap-1 mt-0.5">
                        {trend >= 0
                            ? <TrendingUp size={11} color={GOLD} />
                            : <TrendingDown size={11} color={BROWN} />}
                        <span className="font-tree text-xs" style={{ color: trend >= 0 ? GOLD : BROWN }}>
                            {trend >= 0 ? "+" : ""}{trend.toFixed(1)}% vs mês anterior
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}