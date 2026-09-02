import { redirect } from "next/navigation"
import Image from "next/image"
import { GetMyStaffBusinesses } from "@/src/features/business/services/professional.service"
import { formatPublicHandle } from "@/src/shared/utils/formatters.utils"
import { macroLogo } from "@/src/assets/images"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function SelectBusinessPage() {
  const res = await GetMyStaffBusinesses()
  const list = res.data ?? []

  if (list.length === 0) redirect("/appointments")
  if (list.length === 1) redirect(`/dashboard?rap=${formatPublicHandle(list[0].atSign)}`)

  return (
    <main className="w-full min-h-lvh flex flex-col items-center justify-center bg-(--agenrap-gray-200) px-6 py-16 gap-y-10 relative">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Image src={macroLogo} alt="" fill className="object-contain opacity-[0.05]" />
      </div>

      <div className="flex flex-col items-center gap-y-2 text-center">
        <h1 className="font-cinzel text-3xl font-bold text-(--agenrap-gray-800)">
          Qual negócio?
        </h1>
        <p className="font-tree text-sm text-(--agenrap-gray-800)/60">
          Você faz parte da equipe de mais de um negócio
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-y-3">
        {list.map((biz) => (
          <Link
            key={biz.businessId}
            href={`/dashboard?rap=${formatPublicHandle(biz.atSign)}`}
            className="flex items-center gap-x-4 p-4 rounded-xl bg-white border border-(--agenrap-gray-800)/8 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <ProfessionalAvatar name={biz.professionalName} color={biz.avatarColor} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-tree font-bold text-(--agenrap-gray-800) truncate">
                {biz.businessName}
              </p>
              <p className="font-tree text-xs text-(--agenrap-gray-800)/50">
                como {biz.professionalName}
              </p>
            </div>
            <ArrowRight size={18} className="text-(--agenrap-purple-500) shrink-0" />
          </Link>
        ))}
      </div>
    </main>
  )
}