'use client'

import { Professional } from "@/src/features/business/types/professional.types"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"

type Props = {
  professionals: Professional[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export default function ProfessionalSelector({
  professionals,
  selectedId,
  onSelect,
}: Props) {
  if (!professionals.length) return null

  return (
    <div className="flex flex-col gap-y-2.5">
      <p className="font-tree font-semibold text-lg text-black px-1">
        Quem vai te atender?
      </p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-1 py-1">
        {professionals.map((pro) => {
          const active = selectedId === pro.id
          return (
            <button
              key={pro.id}
              type="button"
              onClick={() => onSelect(pro.id)}
              className={`flex flex-col items-center gap-y-1.5 shrink-0 px-3 py-2.5 rounded-xl transition-all ${
                active
                  ? "bg-white shadow-md ring-2 ring-(--agenrap-purple-500)/40"
                  : "bg-white/50 hover:bg-white/80 border border-transparent"
              }`}
            >
              <ProfessionalAvatar
                name={pro.name}
                color={pro.avatarColor}
                size="lg"
                showRing={active}
              />
              <span className="font-tree text-sm font-medium text-black max-w-24 truncate">
                {pro.name.split(/\s+/)[0]}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}