'use client'

import { BusinessCustomer } from "@/src/features/business/types"
import ContactTab from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/contact-tab"
import ProfileTabs, { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { UserAuthRes } from "@/src/shared/services/user.service"
import { VisuallyHidden } from "radix-ui"

import { Dispatch, SetStateAction, useState } from "react"
export type EditProfileConditionally={
  user?:UserAuthRes
  userGuest?:BusinessCustomer
  isManager?:boolean
  open:boolean
  setOpen:(open: boolean) => void
}


export default function EditProfileDialog({ user,open,setOpen, userGuest }:EditProfileConditionally) {

  return (
    <>


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
                {userGuest?.initials?? user?.initials??""}
              </div>
              </div>
              <div className="min-w-0">
                <p className="font-tree font-semibold text-sm text-white leading-tight truncate">
                  {userGuest?.fullName?? user?.fullName??""}
                </p>
                <p className="text-xs text-white/40 truncate">{!userGuest?user?.email:""}</p>
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

            {!userGuest?    <ProfileTabs user={user!} open={open} setOpen={setOpen} />
            :<ContactTab user={userGuest} userGuest={userGuest} open={open} setOpen={setOpen}/>}
        
        
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}