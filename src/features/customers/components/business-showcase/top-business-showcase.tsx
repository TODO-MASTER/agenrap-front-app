'use client'

import { miniIcon } from "@/src/assets/images"
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button"
import { LogoutButton } from "@/src/shared/components/agenrap-ui/button/logout-button"
import EditProfileDialog from "@/src/shared/components/agenrap-ui/dialog/edit-profile-dialog"
import { UserAuthRes } from "@/src/shared/services/user.service"
import { List, Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type AppointmentTop = {
  user: UserAuthRes
  title?: string
  searching?: boolean
  bsnSize?: number | null
}

export default function TopBusinessShowcase({
  user,
  title = "Minhas agendas",
  searching = false,
  bsnSize,
}: AppointmentTop) {
  const [open, setOpen] = useState(false)
  const missingPhone = !user.telephone

  const showActionButton = searching ? !!bsnSize && bsnSize > 0 : true
  const actionHref = searching ? "/appointments?mode=list" : "/appointments?mode=search"
  const actionLabel = searching ? "Ver todos" : "Adicionar"
  const ActionIcon = searching ? List : Search

  return (
    <div className="relative flex w-full flex-wrap items-center justify-between gap-y-4">
      <div className="flex items-center gap-x-2">
        <Image src={miniIcon} alt="icone da marca agenrap" className="h-18 w-18" />
        <h3 className="font-tree text-xl font-medium md:text-2xl lg:text-4xl">
          {title}
        </h3>
      </div>

      <div className="flex items-center justify-end gap-x-3 md:w-fit">
        <EditProfileDialog setOpen={setOpen} open={open} user={user} />

        <button
          type="button"
          onClick={() => setOpen(true)}
          title="Meu perfil"
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-(--agenrap-brown-500) text-xs font-bold text-white transition-all hover:border-(--agenrap-purple-500) hover:ring-2 hover:ring-(--agenrap-purple-500)/20"
          style={{ background: "var(--agenrap-brown-500)" }}
        >
          {user.initials}
          {missingPhone && (
            <span
              className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-(--agenrap-gray-200)"
              style={{ background: "var(--agenrap-yellow-500)" }}
            />
          )}
        </button>

        {showActionButton && (
          <div className="fixed right-6 bottom-6 z-50 md:relative md:right-auto md:bottom-auto md:z-auto">
            <AgenrapLinkButton
              hrefLink={actionHref}
              className="
                flex h-14 w-14 items-center justify-center gap-x-2 rounded-full p-0
                bg-(--agenrap-yellow-200) text-(--agenrap-gray-800) shadow-lg
                hover:bg-(--agenrap-yellow-200)/90
                md:h-auto md:w-auto md:rounded-lg md:px-8 md:py-2 md:shadow-none
                md:bg-(--agenrap-purple-500) md:text-white md:hover:bg-(--agenrap-purple-500)/85
              "
            >
              <ActionIcon size={22} className="md:text-white text-(--agenrap-gray-800)" />
              <span className="hidden md:inline">{actionLabel}</span>
            </AgenrapLinkButton>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <LogoutButton />
      </div>
    </div>
  )
}