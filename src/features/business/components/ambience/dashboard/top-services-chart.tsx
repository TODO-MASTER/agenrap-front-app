import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Scissors } from "lucide-react"
import { Eyebrow, SectionBlock } from "@/src/features/business/components/ambience/dashboard/dashboard-primitives"
import { BG_CARD_ALT, BROWN, GOLD, PURPLE, TEXT_MUTED, TEXT_SUB } from "@/src/features/business/types/dashboard-constants"
import { CustomBarTooltip } from "@/src/features/business/components/ambience/dashboard/dashboard-tooltips"


type BarDataPoint = {
    name: string
    fullName: string
    count: number
}

type Props = {
    data: BarDataPoint[]
    monthLabel: string
}

export function TopServicesChart({ data, monthLabel }: Props) {
    return (
        <SectionBlock className="lg:col-span-2">
            <div className="flex items-center gap-2">
                <Scissors size={12} color={GOLD} />
                <Eyebrow label="Serviços mais realizados" title={`Top · ${monthLabel}`} />
            </div>

            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={Math.max(data.length * 38, 100)}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
                        barCategoryGap="35%"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: TEXT_MUTED, fontSize: 10, fontFamily: "var(--font-tree)" }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: TEXT_SUB, fontSize: 11, fontFamily: "var(--font-tree)" }}
                            axisLine={false}
                            tickLine={false}
                            width={130}
                        />
                        <Tooltip
                            content={<CustomBarTooltip />}
                            cursor={{ fill: BG_CARD_ALT }}
                        />
                        <Bar dataKey="count" radius={0} isAnimationActive={false}>
                            {data.map((_, i) => (
                                <Cell
                                    key={i}
                                    fill={i === 0 ? GOLD : i === 1 ? PURPLE : BROWN}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-24">
                    <p className="font-tree text-sm" style={{ color: TEXT_MUTED }}>
                        Nenhum serviço concluído ainda
                    </p>
                </div>
            )}
        </SectionBlock>
    )
}