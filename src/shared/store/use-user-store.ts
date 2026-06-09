import { UserAuthRes } from "@/src/shared/services/user.service"
import { create } from "zustand"

interface UserState {
  user: UserAuthRes | null
  setUser: (user: UserAuthRes) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))