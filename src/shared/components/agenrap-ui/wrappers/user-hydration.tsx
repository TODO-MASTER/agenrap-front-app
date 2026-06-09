'use client'

import { useEffect } from "react"
import { getOne } from "@/src/shared/services/user.service"
import { useUserStore } from "@/src/shared/store/use-user-store"


export default function UserHydration() {
  const setUser = useUserStore(s => s.setUser)

  useEffect(() => {
    getOne().then(res => {
      if (res) setUser(res)
    })
  }, [])

  return null
}