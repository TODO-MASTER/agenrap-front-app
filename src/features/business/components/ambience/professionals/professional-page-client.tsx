'use client'

import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Service } from "@/src/features/business/types"
import { Professional } from "@/src/features/business/types/professional.types"
import ProfessionalForm from "./professional-form"

import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"
import RangeTurnManager from "@/src/features/business/components/ambience/range-turn/range-turn-section"
import { AgenrapSegmentedControl } from "@/src/shared/components/agenrap-ui/button/agenrap-segment-button"
import { ArrowLeft, Clock, Ban, Pencil } from "lucide-react"
import ProfessionalScheduleSection from "@/src/features/business/components/ambience/professionals/professional-schedule-section"
import { useStaffContext } from "@/src/providers/staff-context-provider"
import HouseScheduleTemplateEditor from "@/src/features/business/components/ambience/professionals/house-schedule-template-editor"

type Props = {
  services: Service[]
  professionals: Professional[]
  tgrap: string
}

type TabKey = "profile" | "schedule" | "blocks"

export default function ProfessionalsPageClient({ services, professionals, tgrap }: Props) {
  const {staffContext} = useStaffContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  const proIdRaw = searchParams.get("pro")
  const proId = proIdRaw ? Number(proIdRaw) : null
  const tabParam = searchParams.get("tab")
  const isNew = tabParam === "new" && proId == null
  const tab: TabKey =
    tabParam === "schedule" || tabParam === "blocks" || tabParam === "profile"
      ? tabParam
      : "profile"

  const selected = useMemo(
    () => (proId != null ? professionals.find((p) => p.id === proId) ?? null : null),
    [professionals, proId]
  )

  function replaceParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString())
    mutate(params)
    router.replace(`/dashboard/professionals?${params.toString()}`, { scroll: false })
  }

  function goList() {
    replaceParams((params) => {
      params.delete("pro")
      params.delete("tab")
    })
  }

  function openPro(id: number, nextTab: TabKey = "profile") {
    replaceParams((params) => {
      params.set("pro", String(id))
      params.set("tab", nextTab)
    })
  }

  function openNew() {
    replaceParams((params) => {
      params.delete("pro")
      params.set("tab", "new")
    })
  }

  function setTab(next: TabKey) {
    if (proId == null) return
    replaceParams((params) => {
      params.set("pro", String(proId))
      params.set("tab", next)
    })
  }

  if (isNew) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        <div className="flex items-center gap-3">
          <button type="button" onClick={goList} className="p-2 rounded-md hover:bg-black/5">
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="font-tree font-bold text-3xl">Novo profissional</p>
            <p className="font-tree text-sm text-black/50">Dados e serviços que ele realiza</p>
          </div>
        </div>
        <div className="w-full">
          <ProfessionalForm
            services={services}
            onSuccess={() => {
              router.refresh()
              goList()
            }}
          />
        </div>
      </div>
    )
  }

  if (selected) {
    const segments = [
      {
        label: "Dados",
        active: tab === "profile",
        onClick: () => setTab("profile"),
      },
      {
        label: "Expediente",
        active: tab === "schedule",
        onClick: () => setTab("schedule"),
      },
      {
        label: "Bloqueios",
        active: tab === "blocks",
        onClick: () => setTab("blocks"),
      },
    ]

    return (
      <div className="flex flex-col gap-y-6 w-full">
        <div className="flex items-center gap-3">
          <button type="button" onClick={goList} className="p-2 rounded-md hover:bg-black/5">
            <ArrowLeft size={20} />
          </button>
          <ProfessionalAvatar name={selected.name} color={selected.avatarColor} size="md" />
          <div className="min-w-0 flex-1">
            <p className="font-tree font-bold text-2xl truncate">{selected.name}</p>
            <p className="font-tree text-sm text-black/50">
              {selected.serviceIds?.length ?? 0} serviço(s) · configuração individual
            </p>
          </div>
        </div>

        <AgenrapSegmentedControl segments={segments} />

        {tab === "profile" && (
          <div className="w-full">
            <ProfessionalForm
              services={services}
              editingProfessional={selected}
              onSuccess={() => router.refresh()}
            />
          </div>
        )}

        {tab === "schedule" && (
          <ProfessionalScheduleSection
            professionalId={selected.id}
            professionalName={selected.name}
            tgrap={tgrap}
          />
        )}

        {tab === "blocks" && (
          <div className="w-full">
            <p className="font-tree text-sm text-black/50 mb-3">
              Folgas e faixas de horário só deste profissional. Bloqueios da casa ficam no menu
              Bloqueios.
            </p>
            <RangeTurnManager
              tgrap={tgrap}
              initialKind="day"
              initialMode="new"
              professionalId={selected.id}
              embedded
            />
          </div>
        )}
      </div>
    )
  }
 

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="font-tree font-bold text-3xl">Profissionais</p>
          <p className="font-tree text-sm text-black/50 mt-0.5">
            Cada um tem expediente e bloqueios próprios. Jornada e Bloqueios da sidebar são da casa.
          </p>
        </div>
        
        <AgenrapButton
          variant="purplerap"
          className="w-auto h-auto px-6 py-3 text-base"
          onClick={openNew}
        >
          Novo profissional
        </AgenrapButton>

      </div>
       {staffContext.isManager && <HouseScheduleTemplateEditor />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
       
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="group flex flex-col gap-3 p-4 rounded-xl bg-(--agenrap-gray-800) border border-white/5 hover:border-(--agenrap-purple-500)/30 transition-colors"
          >
            <button
              type="button"
              className="flex items-center gap-x-3 text-left"
              onClick={() => openPro(pro.id, "profile")}
            >
              <ProfessionalAvatar name={pro.name} color={pro.avatarColor} size="md" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-tree font-semibold text-white truncate">{pro.name}</p>
                  {pro.isManagerProfile && (
                    <span className="text-(--agenrap-yellow-200) text-[9px] font-tree font-bold uppercase bg-(--agenrap-yellow-200)/10 px-1.5 py-0.5 rounded-full shrink-0">
                      Dono
                    </span>
                  )}
                </div>
                <p className="font-tree text-xs text-white/50">{pro.serviceIds?.length ?? 0} serviço(s)</p>
              </div>
            </button>

            <div className="flex items-center gap-1.5 border-t border-white/5 pt-3">
              <button
                type="button"
                onClick={() => openPro(pro.id, "schedule")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                title="Expediente"
              >
                <Clock size={14} color="#fff" />
                <span className="font-tree text-[11px] text-white/70">Expediente</span>
              </button>
              <button
                type="button"
                onClick={() => openPro(pro.id, "blocks")}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                title="Bloqueios"
              >
                <Ban size={14} color="#fff" />
                <span className="font-tree text-[11px] text-white/70">Bloqueios</span>
              </button>
              <button
                type="button"
                onClick={() => openPro(pro.id, "profile")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                title="Dados"
              >
                <Pencil size={14} color="#fff" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {professionals.length === 0 && (
        <p className="font-tree text-sm text-black/50 text-center py-6">
          Nenhum profissional cadastrado ainda
        </p>
      )}
    </div>
  )
}