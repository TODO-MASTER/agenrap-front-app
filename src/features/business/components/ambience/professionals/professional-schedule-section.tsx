'use client'

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { LoaderCircle, Pencil, X, BadgePlus } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { CardDayWeekShow } from "@/src/shared/components/agenrap-ui/card/card-day-week/card-day-week-show"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"


import { translateDayName } from "@/src/shared/utils/time.utils"
import ProfessionalEditWkpDialog from "@/src/shared/components/agenrap-ui/dialog/professional-edit-wkp-dialog"
import ProfessionalDeleteWkpDialog from "@/src/shared/components/agenrap-ui/dialog/professional-delete-wkp-dialog"
import { CreateProfessionalWorkingPeriod, GetProfessionalWorkingPeriods } from "@/src/features/business/services"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { DeleteProfessionalWorkingPeriod, EditProfessionalWorkingPeriod } from "@/src/features/business/services/professional.service"

const WEEK_OPTIONS = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const

type Row = {
  id: number
  week: string
  initial: string
  end: string
}

type Props = {
  professionalId: number
  professionalName?: string
  tgrap: string
}

function toHHMM(v: string) {
  if (!v) return "08:00"
  return v.length >= 5 ? v.slice(0, 5) : v
}

export default function ProfessionalScheduleSection({
  professionalId,
  professionalName,
}: Props) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<Row | null>(null)
  const [adding, setAdding] = useState(false)
  const [addWeek, setAddWeek] = useState<string>("SEG")
  const [addInitial, setAddInitial] = useState("08:00")
  const [addEnd, setAddEnd] = useState("18:00")

  const used = new Set(rows.map((r) => r.week.toUpperCase()))
  const available = WEEK_OPTIONS.filter((w) => !used.has(w))

  async function load() {
    setLoading(true)
    try {
      const res = await GetProfessionalWorkingPeriods(professionalId)
      const list = (res.data ?? [])
        .map((w) => ({
          id: w.id ?? 0,
          week: String(w.week).toUpperCase(),
          initial: toHHMM(String(w.initial)),
          end: toHHMM(String(w.end)),
        }))
        .filter((r) => r.id > 0)
      setRows(list)
    } catch {
      toast.error("Erro ao carregar expediente")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [professionalId])

  async function handleAdd() {
    if (!addWeek) {
      toast.error("Selecione um dia")
      return
    }
    if (addInitial >= addEnd) {
      toast.error("Horário inicial precisa ser antes do final")
      return
    }
    setPending(true)
    try {
      const res = await CreateProfessionalWorkingPeriod(professionalId, [
        { week: addWeek, initial: addInitial, end: addEnd },
      ])
      if (res.data == null) {
        toast.error(res.message || "Erro ao salvar")
        return
      }
      toast.success(res.message || "Dia adicionado!")
      setAdding(false)
      await load()
    } catch (e) {

          if (isRedirectError(e)) throw e
          toast.error(e instanceof Error ? e.message : 'Erro ao remover cliente')
        
    } finally {
      setPending(false)
    }
  }

  async function handleEditSave(initial: string, end: string) {
    if (!selected) return
    if (initial >= end) {
      toast.error("Horário inicial precisa ser antes do final")
      return
    }
    setPending(true)
    try {
      const res = await EditProfessionalWorkingPeriod(professionalId, selected.id, {
        week: selected.week,
        initial,
        end,
      })
      if (res.data == null) {
        toast.error(res.message || "Erro ao editar")
        return
      }
      toast.success(res.message || "Expediente atualizado!")
      setEditOpen(false)
      setSelected(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao editar")
    } finally {
      setPending(false)
    }
  }

  async function handleDeleteConfirm() {
    if (!selected) return
    if (rows.length <= 1) {
      toast.error("É necessário manter ao menos um dia de expediente")
      return
    }
    setPending(true)
    try {
      const res = await DeleteProfessionalWorkingPeriod(professionalId, selected.id)
      if (res.data == null && res.data !== false) {
        toast.error(res.message || "Erro ao remover")
        return
      }
      toast.success(res.message || "Dia removido")
      setDeleteOpen(false)
      setSelected(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao remover")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <ProfessionalEditWkpDialog
        open={editOpen}
        setOpen={setEditOpen}
        weekLabel={selected ? translateDayName(selected.week) : ""}
        initial={selected?.initial ?? "08:00"}
        end={selected?.end ?? "18:00"}
        pending={pending}
        onSave={handleEditSave}
      />
      <ProfessionalDeleteWkpDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        weekLabel={selected ? translateDayName(selected.week) : ""}
        pending={pending}
        onConfirm={handleDeleteConfirm}
      />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="font-tree font-semibold text-xl">Expediente individual</p>
          <p className="font-tree text-sm text-black/50">
            {professionalName
              ? `Dias e horários em que ${professionalName} atende`
              : "Dias e horários deste profissional"}
          </p>
        </div>
        {!adding && available.length > 0 && (
          <AgenrapButton
            type="button"
            variant="purplerap"
            className="w-auto h-auto px-4 py-2 text-sm flex items-center gap-2"
            onClick={() => {
              setAddWeek(available[0])
              setAddInitial("08:00")
              setAddEnd("18:00")
              setAdding(true)
            }}
          >
            <BadgePlus size={18} />
            Adicionar
          </AgenrapButton>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="flex relative">
            <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
          </div>
        </div>
      ) : (
        <>
          {adding && (
            <div className="flex flex-col gap-3 p-4 rounded-md bg-(--agenrap-gray-800) max-w-lg">
              <p className="font-tree text-white font-semibold">Novo dia</p>
              <div className="flex flex-wrap gap-1.5">
                {available.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setAddWeek(w)}
                    className={`px-3 py-1.5 text-xs font-tree font-semibold rounded-md ${
                      addWeek === w
                        ? "bg-(--agenrap-purple-500) text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {translateDayName(w)}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-white/50 text-xs font-tree uppercase">Início</span>
                  <input
                    type="time"
                    value={addInitial}
                    onChange={(e) => setAddInitial(e.target.value)}
                    className="bg-white/10 text-white rounded-md px-2 py-2 font-tree outline-none"
                  />
                </div>
                <span className="text-white/40 pb-2">→</span>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-white/50 text-xs font-tree uppercase">Fim</span>
                  <input
                    type="time"
                    value={addEnd}
                    onChange={(e) => setAddEnd(e.target.value)}
                    className="bg-white/10 text-white rounded-md px-2 py-2 font-tree outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <AgenrapButton
                  type="button"
                  variant="purplerap"
                  className="flex-1 h-auto py-3 text-base"
                  onClick={handleAdd}
                  disabled={pending}
                >
                  {pending ? "Salvando..." : "Salvar"}
                </AgenrapButton>
                <button
                  type="button"
                  className="px-4 rounded-md bg-white/10 text-white font-tree text-sm"
                  onClick={() => setAdding(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {rows.length === 0 && !adding ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <p className="font-tree text-black/50">Nenhum dia cadastrado</p>
              {available.length > 0 && (
                <AgenrapButton
                  type="button"
                  variant="purplerap"
                  className="w-auto h-auto px-5 py-3 text-base"
                  onClick={() => {
                    setAddWeek(available[0])
                    setAdding(true)
                  }}
                >
                  Cadastrar expediente
                </AgenrapButton>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 gap-y-8 mt-4">
              {rows.map((wk) => (
                <div key={wk.id} className="flex flex-col relative">
                  <div className="flex justify-end w-full -mt-6 -mr-2 absolute z-10">
                    <div className="border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) rounded-md px-2 py-1 flex justify-end gap-x-2">
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelected(wk)
                          setDeleteOpen(false)
                          setEditOpen(true)
                        }}
                      >
                        <Pencil color="blue" size={22} />
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelected(wk)
                          setEditOpen(false)
                          setDeleteOpen(true)
                        }}
                      >
                        <X color="red" size={24} />
                      </button>
                    </div>
                  </div>
                  <CardDayWeekShow name={wk.week} initial={wk.initial} end={wk.end} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}