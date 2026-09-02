'use client'

import { useState } from "react"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"
import { AgenrapSegmentedControl } from "@/src/shared/components/agenrap-ui/button/agenrap-segment-button"
import MyServicesSection from "@/src/features/business/components/ambience/professionals/my-services-section"

import ProfessionalScheduleSection from "@/src/features/business/components/ambience/professionals/professional-schedule-section"
import RangeTurnManager from "@/src/features/business/components/ambience/range-turn/range-turn-section"
import { Service } from "@/src/features/business/types"
import MyProfileForm from "@/src/features/business/components/ambience/professionals/me/my-profile-form"

type TabKey = "profile" | "services" | "schedule" | "blocks"

type Props = {
  tgrap: string
  professionalId: number
  professionalName: string | null
  avatarColor?: string | null
  telephone?: string | null
  services: Service[]
  initialServiceIds: number[]
  canEdit: boolean
}

export default function MyProfessionalPageClient({
  tgrap,
  professionalId,
  professionalName,
  avatarColor,
  telephone,
  services,
  initialServiceIds,
  canEdit,
}: Props) {
  const [tab, setTab] = useState<TabKey>("services")

  const segments = [
    { label: "Dados", active: tab === "profile", onClick: () => setTab("profile") },
    { label: "Serviços", active: tab === "services", onClick: () => setTab("services") },
    { label: "Expediente", active: tab === "schedule", onClick: () => setTab("schedule") },
    { label: "Bloqueios", active: tab === "blocks", onClick: () => setTab("blocks") },
  ]

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="flex items-center gap-3">
        <ProfessionalAvatar name={professionalName ?? "Você"} color={avatarColor ?? "plum"} size="md" />
        <div className="min-w-0 flex-1">
          <p className="font-tree font-bold text-2xl truncate">{professionalName ?? "Minha agenda"}</p>
          <p className="font-tree text-sm text-black/50">Serviços, expediente e bloqueios pessoais</p>
        </div>
      </div>

      <AgenrapSegmentedControl segments={segments} />

      {tab === "profile" && (
        <MyProfileForm
          professionalId={professionalId}
          name={professionalName ?? ""}
          telephone={telephone}
          avatarColor={avatarColor}
        />
      )}

      {tab === "services" && (
        <MyServicesSection
          professionalId={professionalId}
          services={services}
          initialServiceIds={initialServiceIds}
          canEdit={canEdit}
        />
      )}

      {tab === "schedule" && (
        <ProfessionalScheduleSection
          professionalId={professionalId}
          professionalName={professionalName ?? undefined}
          tgrap={tgrap}
        />
      )}

      {tab === "blocks" && (
        <div className="w-full">
          <p className="font-tree text-sm text-black/50 mb-3">
            Folgas e faixas de horário só suas. Bloqueios da casa ficam com o dono.
          </p>
          <RangeTurnManager
            tgrap={tgrap}
            initialKind="day"
            initialMode="new"
            professionalId={professionalId}
            embedded
          />
        </div>
      )}
    </div>
  )
}