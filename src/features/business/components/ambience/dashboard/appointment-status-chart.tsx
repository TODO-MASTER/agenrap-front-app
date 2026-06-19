import { Eyebrow, SectionBlock } from "@/src/features/business/components/ambience/dashboard/dashboard-primitives"
import { CustomPieTooltip } from "@/src/features/business/components/ambience/dashboard/dashboard-tooltips"
import { TEXT_MAIN, TEXT_MUTED, TEXT_SUB } from "@/src/features/business/types/dashboard-constants"
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts"


type PieDataPoint = {
    name: string
    value: number
    fill: string
}

type Props = {
    data: PieDataPoint[]
    monthLabel: string
}

export function AppointmentStatusChart({ data, monthLabel }: Props) {
    return (
        <SectionBlock>
            <Eyebrow label="Status dos agendamentos" title={monthLabel} />

            {data.length > 0 ? (
                <>
                    <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={36}
                                outerRadius={54}
                                paddingAngle={3}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                            </Pie>
                            <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-y-1.5">
                        {data.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 shrink-0" style={{ background: item.fill }} />
                                    <p className="font-tree text-xs" style={{ color: TEXT_SUB }}>{item.name}</p>
                                </div>
                                <p className="font-tree text-xs font-bold" style={{ color: TEXT_MAIN }}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-32">
                    <p className="font-tree text-sm" style={{ color: TEXT_MUTED }}>Sem dados ainda</p>
                </div>
            )}
        </SectionBlock>
    )
}