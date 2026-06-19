import { BG_CARD, BORDER, TEXT_MAIN, TEXT_MUTED } from "@/src/features/business/types/dashboard-constants";

export function SectionBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`flex flex-col gap-y-3 p-4 border ${className}`}
            style={{ background: BG_CARD, borderColor: BORDER }}
        >
            {children}
        </div>
    )
}

export function Eyebrow({ label, title }: { label: string; title: string }) {
    return (
        <div className="flex flex-col gap-y-0.5">
            <p className="font-tree text-xs uppercase tracking-widest" style={{ color: TEXT_MUTED }}>{label}</p>
            <p className="font-tree font-bold text-sm" style={{ color: TEXT_MAIN }}>{title}</p>
        </div>
    )
}