'use client'

import ProfileTabs, { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { UserAuthRes } from "@/src/shared/services/user.service"
import { VisuallyHidden } from "radix-ui"

import { useState } from "react"

export default function EditProfileDialog({ user }: { user: UserAuthRes }) {
  const [open, setOpen] = useState(false)
  const missingPhone = !user.telephone

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Meu perfil"
        className="relative w-9 h-9 rounded-full flex items-center justify-center
                   text-xs font-bold text-white cursor-pointer
                   border-2 border-(--agenrap-brown-500) hover:border-(--agenrap-purple-500)
                   hover:ring-2 hover:ring-(--agenrap-purple-500)/20 transition-all"
        style={{ background: 'var(--agenrap-brown-500)' }}
      >
        {user.initials}
        {missingPhone && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-(--agenrap-gray-200)"
            style={{ background: 'var(--agenrap-yellow-500)' }}
          />
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 gap-0 overflow-hidden border-0"
          style={{ width: 'clamp(320px, 90vw, 440px)', maxWidth: 'none', background: '#2e2e2e' }}
          showCloseButton={false}
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root>
            <DialogTitle>Editar perfil</DialogTitle>
          </VisuallyHidden.Root>

          <DialogHeader className="flex flex-row items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
                     <div
                className="w-9 h-9 rounded-tr-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: 'var(--agenrap-purple-500)' }}
              >
              <div
                className="w-9 h-9 rounded-bl-xl  flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: 'var(--agenrap-brown-500)' }}
              >
                {user.initials}
              </div>
              </div>
              <div className="min-w-0">
                <p className="font-tree font-semibold text-sm text-white leading-tight truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-white/40 truncate">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/30 hover:text-white transition-colors text-lg leading-none"
            >
              ✕
            </button>
          </DialogHeader>

          <div className="px-5 py-5">
        
            <ProfileTabs user={user} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}