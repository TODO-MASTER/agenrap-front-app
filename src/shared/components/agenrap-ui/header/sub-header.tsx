"use client"

type Mode = { key: string; label: string }

type Props = {
    title: string
    viewMode: string
    modes: Mode[]
    onModeChange: (key: string) => void
}

export default function SubHeader({ title, viewMode, modes, onModeChange }: Props) {
    return (
        <div className="flex w-full flex-col sm:flex-row sm:items-end justify-between gap-x-4 mb-6 gap-y-0 shrink-0">
            <h1 className="lg:text-4xl md:text-2xl text-2xl font-tree font-medium pb-2">
                {title}
            </h1>

            <div className="flex border-b border-black/10 w-full sm:w-fit shrink-0">
                {modes.map((m) => (
                    <button
                        key={m.key}
                        type="button"
                        onClick={() => onModeChange(m.key)}
                        className={`px-5 py-2.5 text-sm font-medium font-tree transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
                            viewMode === m.key
                                ? "border-(--agenrap-brown-500) text-(--agenrap-brown-500) font-semibold"
                                : "border-transparent text-black/40 hover:text-black/70 hover:border-black/20"
                        }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>
        </div>
    )
}