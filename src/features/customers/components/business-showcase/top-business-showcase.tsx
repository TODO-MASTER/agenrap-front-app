'use client'

import { miniIcon } from "@/src/assets/images"
import AgenrapBottomNav from "@/src/features/customers/components/agenrap-bottom-nav"
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button"
import { FeedbackButton } from "@/src/shared/components/agenrap-ui/button/feedback-button"
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
  title = "Estabelecimentos",
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
    <div className="relative flex w-full flex-col gap-y-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-y-4">
        <div className="flex items-center gap-x-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center">
            <Image src={miniIcon} alt="icone da marca agenrap" className="h-16 w-16" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-tree text-xl font-bold leading-tight md:text-3xl lg:text-4xl">
              {title}
            </h3>
            <span className="font-tree text-sm   text-(--agenrap-brown-500)/60">
              {searching ? "Por nome do estabelecimento" : "Visão Geral"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-3 md:w-fit">
          <EditProfileDialog setOpen={setOpen} open={open} user={user} />
    <FeedbackButton
      plusClassName="
         !hidden md:flex static w-11 h-11 rounded-md
        flex items-center justify-center
        bg-(--agenrap-purple-500) text-white
        shadow-none hover:bg-(--agenrap-purple-500)/85
      "
    />
          <button
            type="button"
            onClick={() => setOpen(true)}
            title="Meu perfil"
            className="relative flex h-10 w-10 cursor-pointer rounded-full items-center justify-center border-2 border-(--agenrap-brown-500) text-xs font-bold text-white transition-all hover:border-(--agenrap-purple-500) hover:ring-2 hover:ring-(--agenrap-purple-500)/20"
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
            <div className="hidden md:flex relative right-auto bottom-auto z-auto ">
              <AgenrapLinkButton
                hrefLink={actionHref}
              variant={"brownlinkrap"}
                plusClassName="
                  flex items-center justify-center gap-x-2 
                  rounded-md bg-(--agenrap-yellow-200) text-(--agenrap-gray-800) shadow-lg
                  hover:bg-(--agenrap-yellow-200)/90
                  h-11 w-auto  px-7 shadow-none
                  md:bg-(--agenrap-purple-500) md:text-white md:hover:bg-(--agenrap-purple-500)/85
                "
              
              >
                {searching?
                <List size={20} className="md:text-white text-(--agenrap-gray-800)" />
                :                <Search size={20} className="md:text-white text-(--agenrap-gray-800)" />
}
                <span className="hidden md:inline font-tree text-sm font-semibold">{actionLabel}</span>
              </AgenrapLinkButton>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full h-[3px]">
        <div className="flex-1 bg-(--agenrap-purple-500)" />
        <div className="flex-1 bg-(--agenrap-yellow-200)" />
        <div className="flex-1 bg-(--agenrap-brown-500)" />
      </div>

<div className="block md:hidden">
  <AgenrapBottomNav>
    <LogoutButton showExpanded={false} />

    <FeedbackButton
      plusClassName="
        static w-11 h-11 rounded-md
        flex items-center justify-center
        bg-(--agenrap-purple-500) text-white
        shadow-none hover:bg-(--agenrap-purple-500)/85
      "
    />
     {showActionButton && (
      <AgenrapLinkButton
        hrefLink={actionHref}
        variant="brownlinkrap"
        plusClassName="
           h-11 w-fit items-center justify-center rounded-md
          bg-(--agenrap-yellow-200) text-(--agenrap-gray-800)
          shadow-none hover:bg-(--agenrap-yellow-200)/90
        "
      >
        {searching ? (
          <List size={20} className="text-(--agenrap-gray-800)" />
        ) : (
          <Search size={20} className="text-(--agenrap-gray-800)" />
        )}
      </AgenrapLinkButton>
    )}
  </AgenrapBottomNav>
</div>
      <div className="hidden md:flex fixed bottom-6 left-6 z-50">
        <LogoutButton showExpanded={true} />
      </div>
    </div>
  )
}