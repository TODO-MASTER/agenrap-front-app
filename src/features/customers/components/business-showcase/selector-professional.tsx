'use client'
import { Professional } from "@/src/features/business/types/professional.types"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"


type Props = {
    professionals: Professional[]
    selectedId: number | null
    onSelect: (id: number) => void
}

export default function ProfessionalSelector({ professionals, selectedId, onSelect }: Props) {
    if (!professionals.length) return null

    return (
        <div className="flex flex-col gap-y-2">
            <p className="font-tree font-semibold text-lg text-black px-1">Escolha o profissional</p>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-1 py-1">
                {professionals.map(pro => {
                    const active = selectedId === pro.id
                    return (
                        <button
                            key={pro.id}
                            type="button"
                            onClick={() => onSelect(pro.id)}
                            className={`flex flex-col items-center gap-y-1 shrink-0 p-2 rounded-md transition-all ${active ? "bg-(--agenrap-purple-500)/20 border-2 border-(--agenrap-purple-500)" : "border-2 border-transparent hover:bg-black/5"}`}
                        >
                            <ProfessionalAvatar name={pro.name} color={pro.avatarColor} size="lg" />
                            <span className="font-tree text-sm font-medium text-black max-w-20 truncate">{pro.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}