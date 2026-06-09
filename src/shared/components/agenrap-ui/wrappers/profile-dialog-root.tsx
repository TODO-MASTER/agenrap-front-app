
'use client'

import EditProfileDialog from "@/src/shared/components/agenrap-ui/dialog/edit-profile-dialog"
import { useProfileDialogStore } from "@/src/shared/store/use-profile-dialog.store"
import { useUserStore } from "@/src/shared/store/use-user-store"


export default function ProfileDialogRoot() {
  const { open, setOpen } = useProfileDialogStore()
  const user = useUserStore(s => s.user)

  if (!user) return null

  return <EditProfileDialog user={user} open={open} setOpen={setOpen} isManager />
}