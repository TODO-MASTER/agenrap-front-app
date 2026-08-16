'use client'
import { useState } from "react"
import { Service } from "@/src/features/business/types"
import { Professional } from "@/src/features/business/types/professional.types"
import ProfessionalForm from "./professional-form"
import ProfessionalWorkingPeriodForm from "./professional-working-period-form"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { Pencil, Clock, Ban } from "lucide-react"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"
import RangeTurnManager from "@/src/features/business/components/ambience/range-turn/range-turn-section"

type Props = {
    services: Service[]
    professionals: Professional[]
    tgrap: string
}

type PanelMode = "none" | "form" | "schedule" | "blocks"

export default function ProfessionalsPageClient({ services, professionals, tgrap }: Props) {
    const [editing, setEditing] = useState<Professional | null>(null)
    const [panel, setPanel] = useState<PanelMode>(professionals.length === 0 ? "form" : "none")
    const [targetId, setTargetId] = useState<number | null>(null)

    return (
        <div className="flex flex-col gap-y-6 w-full">
            <div className="flex items-center justify-between">
                <p className="font-tree font-bold text-3xl">Profissionais</p>
                <AgenrapButton variant="purplerap" onClick={() => { setEditing(null); setPanel("form") }}>
                    Novo profissional
                </AgenrapButton>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {professionals.map(pro => (
                    <div key={pro.id} className="flex items-center gap-x-3 p-4 rounded-md bg-(--agenrap-gray-800)">
                        <ProfessionalAvatar name={pro.name} color={pro.avatarColor} size="md" />
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="font-tree font-semibold text-white truncate">{pro.name}</p>
                            <p className="font-tree text-xs text-white/60">{pro.serviceIds.length} serviço(s)</p>
                        </div>
                        <button onClick={() => { setTargetId(pro.id); setPanel("schedule") }} className="p-2 rounded-md hover:bg-white/10" title="Expediente">
                            <Clock size={16} color="#fff" />
                        </button>
                        <button onClick={() => { setTargetId(pro.id); setPanel("blocks") }} className="p-2 rounded-md hover:bg-white/10" title="Bloqueios">
                            <Ban size={16} color="#fff" />
                        </button>
                        <button onClick={() => { setEditing(pro); setPanel("form") }} className="p-2 rounded-md hover:bg-white/10" title="Editar">
                            <Pencil size={16} color="#fff" />
                        </button>
                    </div>
                ))}
            </div>

            {panel === "form" && (
                <div className="max-w-md">
                    <ProfessionalForm
                        services={services}
                        editingProfessional={editing}
                        onSuccess={() => setPanel("none")}
                    />
                </div>
            )}

            {panel === "schedule" && targetId != null && (
                <div className="max-w-md bg-(--agenrap-brown-500)/75 rounded-md p-5">
                    <ProfessionalWorkingPeriodForm
                        professionalId={targetId}
                        onSuccess={() => setPanel("none")}
                    />
                </div>
            )}

            {panel === "blocks" && targetId != null && (
                <div className="bg-(--agenrap-brown-200) rounded-md p-2">
                    <RangeTurnManager
                        tgrap={tgrap}
                        initialKind="day"
                        initialMode="new"
                        professionalId={targetId}
                        embedded
                    />
                </div>
            )}
        </div>
    )
}