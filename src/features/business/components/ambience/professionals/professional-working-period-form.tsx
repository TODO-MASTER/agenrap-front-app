'use client'

import { useEffect, useState } from "react"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { toast } from "sonner"
import { LoaderCircle, Pencil, Trash, X, Plus } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import {
  CreateProfessionalWorkingPeriod,

  GetProfessionalWorkingPeriods,
  ProfessionalWkPeriodReq,
} from "@/src/features/business/services"
import { DeleteProfessionalWorkingPeriod, EditProfessionalWorkingPeriod } from "@/src/features/business/services/professional.service"

const WEEK_DAYS = [
  { key: "SEG", label: "Segunda" },
  { key: "TER", label: "Terça" },
  { key: "QUA", label: "Quarta" },
  { key: "QUI", label: "Quinta" },
  { key: "SEX", label: "Sexta" },
  { key: "SAB", label: "Sábado" },
  { key: "DOM", label: "Domingo" },
] as const

type WeekKey = (typeof WEEK_DAYS)[number]["key"]

type ExistingDay = {
  id: number
  week: string
  initial: string
  end: string
}

type Props = {
  professionalId: number
  professionalName?: string
  onSuccess?: () => void
  onClose?: () => void
}

function labelOf(week: string) {
  return WEEK_DAYS.find((d) => d.key === week)?.label ?? week
}

function toHHMM(value: string) {
  if (!value) return "08:00"
  return value.length >= 5 ? value.slice(0, 5) : value
}

export default function ProfessionalWorkingPeriodForm({
  professionalId,
  professionalName,
  onSuccess,
  onClose,
}: Props) {
  const [existing, setExisting] = useState<ExistingDay[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [isPending, setIsPending] = useState(false)

  const [mode, setMode] = useState<"list" | "add" | "edit">("list")
  const [editingId, setEditingId] = useState<number | null>(null)

  const [selectedWeek, setSelectedWeek] = useState<WeekKey | "">("")
  const [initial, setInitial] = useState("08:00")
  const [end, setEnd] = useState("18:00")

  const usedWeeks = new Set(existing.map((e) => e.week))
  const availableWeeks = WEEK_DAYS.filter((d) => !usedWeeks.has(d.key))

  async function loadList() {
    setLoadingList(true)
    try {
      const res = await GetProfessionalWorkingPeriods(professionalId)
      const rows = (res.data ?? []).map((w) => ({
        id: w.id ?? 0,
        week: String(w.week).toUpperCase(),
        initial: toHHMM(String(w.initial)),
        end: toHHMM(String(w.end)),
      }))
      setExisting(rows.filter((r) => r.id > 0))
    } catch {
      toast.error("Erro ao carregar expediente")
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    loadList()
  }, [professionalId])

  function openAdd() {
    if (!availableWeeks.length) {
      toast.error("Todos os dias já estão cadastrados")
      return
    }
    setSelectedWeek(availableWeeks[0].key)
    setInitial("08:00")
    setEnd("18:00")
    setEditingId(null)
    setMode("add")
  }

  function openEdit(row: ExistingDay) {
    setEditingId(row.id)
    setSelectedWeek(row.week as WeekKey)
    setInitial(row.initial)
    setEnd(row.end)
    setMode("edit")
  }

  function cancelForm() {
    setMode("list")
    setEditingId(null)
    setSelectedWeek("")
  }

  async function handleSave() {
    if (!selectedWeek) {
      toast.error("Selecione um dia")
      return
    }
    if (initial >= end) {
      toast.error("Horário inicial precisa ser antes do final")
      return
    }

    setIsPending(true)
    try {
      if (mode === "add") {
        const payload: ProfessionalWkPeriodReq[] = [
          { week: selectedWeek, initial, end },
        ]
        const res = await CreateProfessionalWorkingPeriod(professionalId, payload)
        if (res.data == null) {
          toast.error(res.message || "Erro ao salvar")
          return
        }
        toast.success(res.message || "Dia adicionado!")
      } else if (mode === "edit" && editingId != null) {
        const res = await EditProfessionalWorkingPeriod(professionalId, editingId, {
          week: selectedWeek,
          initial,
          end,
        })
        if (res.data == null) {
          toast.error(res.message || "Erro ao editar")
          return
        }
        toast.success(res.message || "Expediente atualizado!")
      }
      await loadList()
      setMode("list")
      setEditingId(null)
      onSuccess?.()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao salvar expediente")
    } finally {
      setIsPending(false)
    }
  }

  async function handleDelete(row: ExistingDay) {
    if (existing.length <= 1) {
      toast.error("É necessário manter ao menos um dia de expediente")
      return
    }
    setIsPending(true)
    try {
      const res = await DeleteProfessionalWorkingPeriod(professionalId, row.id)
      if (res.data == null && res.data !== false) {
        toast.error(res.message || "Erro ao remover")
        return
      }
      toast.success(res.message || "Dia removido")
      await loadList()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao remover")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col min-w-0">
          <p className="font-tree font-semibold text-lg text-white">Expediente</p>
          {professionalName && (
            <p className="font-tree text-xs text-white/60 truncate">{professionalName}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {mode === "list" && (
            <button
              type="button"
              onClick={openAdd}
              className="p-2 rounded-md hover:bg-white/10"
              title="Adicionar dia"
            >
              <Plus size={18} color="#fff" />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-white/10"
              title="Fechar"
            >
              <X size={18} color="#fff" />
            </button>
          )}
        </div>
      </div>

      {loadingList ? (
        <div className="flex justify-center py-8">
          <div className="flex relative">
            <Image src={macroLogo} alt="" className="w-8 h-8 opacity-15 animate-pulse" />
            <LoaderCircle className="animate-spin absolute w-8 h-8" color="#F5E6CC" />
          </div>
        </div>
      ) : mode === "list" ? (
        <div className="flex flex-col gap-y-2">
          {existing.length === 0 ? (
            <div className="flex flex-col gap-3 items-center py-6 px-3 rounded-md bg-white/5">
              <p className="font-tree text-sm text-white/60 text-center">
                Nenhum dia cadastrado ainda
              </p>
              <AgenrapButton variant="purplerap" onClick={openAdd} className="px-4">
                Cadastrar expediente
              </AgenrapButton>
            </div>
          ) : (
            existing.map((row) => (
              <div
                key={row.id}
                className="flex items-center gap-x-3 p-3 rounded-md bg-(--agenrap-gray-800)"
              >
                <div className="w-10 h-10 shrink-0 rounded-md bg-(--agenrap-purple-500)/30 flex items-center justify-center">
                  <span className="font-tree text-xs font-bold text-white">{row.week}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="font-tree text-sm font-semibold text-white">{labelOf(row.week)}</p>
                  <p className="font-tree text-xs text-white/60">
                    {row.initial} – {row.end}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openEdit(row)}
                  className="p-2 rounded-md hover:bg-white/10"
                  title="Editar"
                >
                  <Pencil size={15} color="#fff" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(row)}
                  className="p-2 rounded-md hover:bg-white/10"
                  title="Remover"
                  disabled={isPending}
                >
                  <Trash size={15} color="#f87171" />
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 rounded-md border border-white/10 p-4">
          <p className="font-tree text-sm font-semibold text-white">
            {mode === "add" ? "Novo dia" : "Editar horário"}
          </p>

          {mode === "add" ? (
            <div className="flex flex-wrap gap-1.5">
              {availableWeeks.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setSelectedWeek(d.key)}
                  className={`px-3 py-1.5 text-xs font-tree font-semibold rounded-md transition-colors ${
                    selectedWeek === d.key
                      ? "bg-(--agenrap-purple-500) text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="font-tree text-sm text-white/80">{labelOf(String(selectedWeek))}</p>
          )}

          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-tree text-[11px] text-white/50 uppercase tracking-wide">Início</span>
              <input
                type="time"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                className="bg-white/10 text-white text-sm rounded-md px-2 py-2 font-tree outline-none w-full"
              />
            </div>
            <span className="text-white/40 text-xs mt-5">até</span>
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-tree text-[11px] text-white/50 uppercase tracking-wide">Fim</span>
              <input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="bg-white/10 text-white text-sm rounded-md px-2 py-2 font-tree outline-none w-full"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <AgenrapButton
              variant="purplerap"
              onClick={handleSave}
              className="flex-1 flex justify-center items-center"
            >
              {isPending ? (
                <div className="flex relative">
                  <Image src={macroLogo} alt="" className="w-7 h-7 opacity-15 animate-pulse" />
                  <LoaderCircle className="animate-spin absolute w-7 h-7" color="#F5E6CC" />
                </div>
              ) : (
                "Salvar"
              )}
            </AgenrapButton>
            <button
              type="button"
              onClick={cancelForm}
              className="px-4 rounded-md bg-white/10 text-white font-tree text-sm hover:bg-white/15"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}