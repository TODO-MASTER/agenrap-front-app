'use client'

import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { Service } from "@/src/features/business/types"
import {
  AttachProfessionalService,
  DetachProfessionalService,
} from "@/src/features/business/services/professional.service"
import { toast } from "sonner"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { currencyUtils } from "@/src/shared/utils/currency.utils"

type Props = {
  professionalId: number
  services: Service[]
  initialServiceIds: number[]
  canEdit: boolean
}

export default function MyServicesSection({
  professionalId,
  services,
  initialServiceIds,
  canEdit,
}: Props) {
  const [linked, setLinked] = useState<Set<number>>(new Set(initialServiceIds))
  const [busyId, setBusyId] = useState<number | null>(null)

  useEffect(() => {
    setLinked(new Set(initialServiceIds))
  }, [initialServiceIds])

  async function handleToggle(serviceId: number, isLinked: boolean) {
    if (!canEdit || busyId != null) return
    setBusyId(serviceId)
    try {
      const res = isLinked
        ? await DetachProfessionalService(professionalId, serviceId)
        : await AttachProfessionalService(professionalId, serviceId)
      if (res.data == null) {
        toast.error(res.message || "Não foi possível atualizar")
        return
      }
      setLinked((prev) => {
        const next = new Set(prev)
        if (isLinked) next.delete(serviceId)
        else next.add(serviceId)
        return next
      })
      toast.success(
        isLinked ? "Serviço desatrelado" : "Serviço atrelado a você"
      )
    } catch (e) {
      if (isRedirectError(e)) throw e
      toast.error(e instanceof Error ? e.message : "Erro ao atualizar")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div>
        <p className="font-tree font-semibold text-xl">Serviços que eu atendo</p>
        <p className="font-tree text-sm text-black/50">
          {canEdit
            ? "Ative o que você realiza. Isso não cria serviço na casa."
            : "Você só visualiza. Peça ao dono a permissão de editar serviços."}
        </p>
      </div>

      {services.length === 0 ? (
        <p className="font-tree text-sm text-black/45">Nenhum serviço na casa ainda</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((svs) => {
            const id = svs.id!
            const isLinked = linked.has(id)
            const busy = busyId === id
            return (
              <div
                key={id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  isLinked
                    ? "bg-(--agenrap-purple-500)/10 border-(--agenrap-purple-500)/40"
                    : "bg-white/50 border-(--agenrap-brown-500)/15"
                }`}
              >
                <div className="min-w-0 flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-tree font-semibold text-black truncate">{svs.name}</p>
                    {isLinked && (
                      <span className="shrink-0 text-[10px] font-tree font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-(--agenrap-purple-500) text-white">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="font-tree text-xs text-black/45">
                    {svs.duration}
                    {svs.value != null
                      ? ` · ${currencyUtils.fromCents(svs.value, "BRL")}`
                      : ""}
                  </p>
                </div>
                {canEdit && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => handleToggle(id, isLinked)}
                    className={`shrink-0 rounded-md px-3 py-2 text-xs font-tree font-semibold transition-colors ${
                      isLinked
                        ? "bg-black/5 text-black/70 hover:bg-red-500/10 hover:text-red-600"
                        : "bg-(--agenrap-gray-800) text-(--agenrap-yellow-200)"
                    }`}
                  >
                    {busy ? (
                      <span className="flex relative w-5 h-5">
                        <Image src={macroLogo} alt="" className="w-5 h-5 opacity-15 animate-pulse" />
                        <LoaderCircle className="animate-spin absolute w-5 h-5" color="#BB77EE" />
                      </span>
                    ) : isLinked ? (
                      "Remover"
                    ) : (
                      "Atrelar"
                    )}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}