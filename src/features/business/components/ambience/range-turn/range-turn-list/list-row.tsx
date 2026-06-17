"use client"

import { Trash2 } from "lucide-react"

export default function ListRow({
    reason, label, onDelete,
}: {
    reason: string
    label: string
    onDelete: () => void
}) {
    const [prefix, ...rest] = label.split(":")
    const value = rest.join(":").trim()

    return (
        <div className="flex justify-between items-center bg-black/20 border border-white/5 px-4 py-3.5 rounded-xl group hover:border-(--agenrap-purple-500)/30 hover:bg-black/30 transition-all">
            <div className="flex flex-col gap-y-1 min-w-0">
                <p className="text-white text-sm font-semibold font-tree truncate">{reason}</p>
                <p className="text-xs text-zinc-500 font-tree">
                    {prefix}:{" "}
                    <span className="text-(--agenrap-yellow-200) font-medium">{value}</span>
                </p>
            </div>
            <button
                type="button"
                onClick={onDelete}
                className="ml-3 shrink-0 p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            >
                <Trash2 size={15} />
            </button>
        </div>
    )
}