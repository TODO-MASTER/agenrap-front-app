import { formatCurrency } from "@/src/features/business/hooks/use-dashboard-derived-data"
import { BG_TOOLTIP, BORDER, CREAM_LIGHT, GOLD, PURPLE, TEXT_MUTED } from "@/src/features/business/types/dashboard-constants"

export const CustomAreaTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div className="border px-3 py-2" style={{ background: BG_TOOLTIP, borderColor: PURPLE + "60" }}>
            <p className="font-tree text-xs mb-1" style={{ color: TEXT_MUTED }}>Dia {label}</p>
            <p className="font-tree font-bold text-sm" style={{ color: PURPLE }}>
                {formatCurrency(payload[0].value)}
            </p>
        </div>
    )
}
 
export const CustomBarTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    const item = payload[0]
    return (
        <div className="border px-3 py-2" style={{ background: BG_TOOLTIP, borderColor: GOLD + "60" }}>
            <p className="font-tree text-xs mb-1" style={{ color: TEXT_MUTED }}>{item.payload.fullName}</p>
            <p className="font-tree font-bold text-sm" style={{ color: GOLD }}>{item.value} realizados</p>
        </div>
    )
}
 
export const CustomPieTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div className="border px-3 py-2" style={{ background: BG_TOOLTIP, borderColor: BORDER }}>
            <p className="font-tree text-xs" style={{ color: payload[0].payload.fill }}>{payload[0].name}</p>
            <p className="font-tree font-bold text-sm" style={{ color: CREAM_LIGHT }}>{payload[0].value}</p>
        </div>
    )
}