import { GOLD, TEXT_MUTED } from "@/src/features/business/types/dashboard-constants"

type Props = { label: string }

export function LiveIndicator({ label }: Props) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: GOLD }}
                />
                <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: GOLD }}
                />
            </span>
            <span className="font-tree text-[10px] uppercase tracking-widest" style={{ color: TEXT_MUTED }}>
                Atualizado {label}
            </span>
        </div>
    )
}