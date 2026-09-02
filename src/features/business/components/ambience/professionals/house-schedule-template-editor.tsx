'use client'

import { useState } from "react"
import { Pencil, X, Clock } from "lucide-react"
import { toast } from "sonner"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions"
import { translateDayName } from "@/src/shared/utils/time.utils"

export default function HouseScheduleTemplateEditor() {
  const weeks = useBusinessStore(bs => bs.weeks)
  const setSelectWorkingPeriod = useBusinessStore(bs => bs.setSelectedWorkingPeriod)
  const { handleEditWorkingPeriodAction, isPending } = useBusinessActions()

  const [editing, setEditing] = useState<{ id: number; week: string; initial: string; end: string } | null>(null)
  const [draftInitial, setDraftInitial] = useState("08:00")
  const [draftEnd, setDraftEnd] = useState("18:00")

  const activeDays = weeks.filter(w => w.active)

  function openEdit(wk: typeof activeDays[number]) {
    if (!wk.id) return
    setEditing({ id: wk.id, week: wk.week, initial: wk.initial.slice(0, 5), end: wk.end.slice(0, 5) })
    setDraftInitial(wk.initial.slice(0, 5))
    setDraftEnd(wk.end.slice(0, 5))
  }

 function save() {
  if (!editing) return
  if (draftInitial >= draftEnd) {
    toast.error("Horário inicial precisa ser antes do final")
    return
  }
  handleEditWorkingPeriodAction(
    { name: editing.week, initial: draftInitial, end: draftEnd },
    () => setEditing(null),
    editing.id
  )
}

  if (activeDays.length === 0) return null

  return (
    <div className="flex flex-col gap-y-3  p-4 rounded-xl bg-(--agenrap-gray-800) w-fit border border-white/5">
      <div>
        <p className="font-tree font-semibold text-white">Modelo de horário</p>
        <p className="font-tree text-xs text-white/50 mt-0.5">
          Horário sugerido ao cadastrar um profissional novo. Não afeta quem já está cadastrado.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeDays.map((wk) => (
          <button
            key={wk.week}
            type="button"
            onClick={() => openEdit(wk)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Clock size={12} className="text-white/40" />
            <span className="font-tree text-xs text-white/80">
              {translateDayName(wk.week)} {wk.initial.slice(0, 5)}–{wk.end.slice(0, 5)}
            </span>
            <Pencil size={11} className="text-white/40" />
          </button>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-(--agenrap-gray-800) rounded-xl p-6 w-full max-w-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-tree text-white font-semibold text-lg">
                Modelo de {translateDayName(editing.week)}
              </p>
              <button type="button" onClick={() => setEditing(null)}>
                <X color="#fff" size={20} />
              </button>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-white/50 text-xs font-tree uppercase">Início</span>
                <input
                  type="time"
                  value={draftInitial}
                  onChange={(e) => setDraftInitial(e.target.value)}
                  className="bg-white/10 text-white rounded-md px-2 py-2 font-tree outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-white/50 text-xs font-tree uppercase">Fim</span>
                <input
                  type="time"
                  value={draftEnd}
                  onChange={(e) => setDraftEnd(e.target.value)}
                  className="bg-white/10 text-white rounded-md px-2 py-2 font-tree outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={save}
              disabled={isPending}
              className="py-3 rounded-md bg-(--agenrap-purple-500) text-white font-tree font-semibold"
            >
              {isPending ? "Salvando..." : "Salvar modelo"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}