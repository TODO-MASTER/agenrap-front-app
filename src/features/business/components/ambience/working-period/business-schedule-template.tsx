'use client'

import { useState } from "react"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions"
import { translateDayName } from "@/src/shared/utils/time.utils"
import { useStaffContext } from "@/src/providers/staff-context-provider"
import { hasPerm } from "@/src/shared/utils/perm-utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const WEEK_ORDER = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const

type Props = {
  tgrap: string
}

export default function BusinessDayToggles({ tgrap }: Props) {
  const weeks = useBusinessStore(bs => bs.weeks)
  const setSelectWorkingPeriod = useBusinessStore(bs => bs.setSelectedWorkingPeriod)
  const { staffContext } = useStaffContext()
  const router = useRouter()

  const canCreate = staffContext.isManager || hasPerm(staffContext, "house.hour.create")
  const canDelete = staffContext.isManager || hasPerm(staffContext, "house.hour.delete")

  const { handleCreateWkPeriodAction, handleDeleteWkpAction, isPending } = useBusinessActions()
  const [confirmDeleteDay, setConfirmDeleteDay] = useState<string | null>(null)

  const byWeek = Object.fromEntries(weeks.map(w => [w.week, w]))

  function enableDay(day: string) {
    handleCreateWkPeriodAction(
      { business: { weeks: [{ name: day, initial: "08:00", end: "18:00" }] } },
      () => router.refresh()
    )
  }

  function openDisableConfirm(day: string) {
    if (!byWeek[day]?.id) {
      toast.error("Período não encontrado para este dia")
      return
    }
    setConfirmDeleteDay(day)
  }

function confirmDisable() {
  if (!confirmDeleteDay) return
  const wkp = byWeek[confirmDeleteDay]
  if (!wkp?.id) {
    toast.error("Periodo não encontrado para este dia")
    return
  }

  setSelectWorkingPeriod({
    id: wkp.id,
    week: wkp.week ?? confirmDeleteDay,
    initial: wkp.initial,
    end: wkp.end,
  })

  handleDeleteWkpAction(() => setConfirmDeleteDay(null), wkp.id)
}

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div>
        <p className="font-tree font-bold text-2xl">Jornada</p>
        <p className="font-tree text-sm text-black/50 mt-1 max-w-xl">
          Dias em que a casa funciona. Desativar um dia fecha o agendamento para todo mundo
          nesse dia, independente do expediente de cada profissional.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {WEEK_ORDER.map((day) => {
          const active = byWeek[day]?.active
          const canToggle = active ? canDelete : canCreate

          return (
            <div
              key={day}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                active
                  ? "bg-(--agenrap-gray-800) border-(--agenrap-purple-500)/30"
                  : "bg-black/5 border-transparent"
              }`}
            >
              <p className={`font-tree font-semibold text-lg ${active ? "text-white" : "text-black/40"}`}>
                {translateDayName(day)}
              </p>

              {canToggle && (
                <button
                  type="button"
                  onClick={() => (active ? openDisableConfirm(day) : enableDay(day))}
                  disabled={isPending}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    active ? "bg-(--agenrap-purple-500)" : "bg-black/15"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      active ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {confirmDeleteDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-(--agenrap-gray-800) rounded-xl p-6 w-full max-w-sm flex flex-col gap-4">
            <p className="font-tree text-white font-semibold text-lg">
              Desabilitar {translateDayName(confirmDeleteDay)}?
            </p>
            <p className="font-tree text-xs text-white/60">
              A casa fica fechada nesse dia para todo mundo — ninguém vai conseguir agendar.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-md bg-white/10 text-white font-tree text-sm"
                onClick={() => setConfirmDeleteDay(null)}
              >
                Voltar
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 rounded-md bg-red-600 text-white font-tree text-sm"
                onClick={confirmDisable}
                disabled={isPending}
              >
                {isPending ? "Removendo..." : "Desabilitar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}