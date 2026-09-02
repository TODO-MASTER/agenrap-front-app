'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GetStaffContext } from "@/src/features/business/services/professional.service"
import { StaffContext } from "@/src/features/business/types/professional.types"

const EMPTY_CTX: StaffContext = {
  isManager: false,
  professionalId: null,
  professionalName: null,
  businessId: 0,
  atSign: "",
  businessName: "",
  permissionCodes: [],
}

type StaffContextValue = {
  staffContext: StaffContext
  contextLoading: boolean
}

const StaffContextReact = createContext<StaffContextValue>({
  staffContext: EMPTY_CTX,
  contextLoading: true,
})

export function useStaffContext() {
  return useContext(StaffContextReact)
}

export default function StaffContextProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const rap = searchParams.get("rap")
  const [ctx, setCtx] = useState<StaffContext | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!rap) {
      router.push("/")
      return
    }

    let cancelled = false
    setLoading(true)

    GetStaffContext(rap)
      .then((res) => {
        if (cancelled) return
        if (!res?.data) {
          router.push("/login")
          return
        }
        setCtx(res.data)
      })
      .catch(() => {
        if (!cancelled) router.push("/login")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [rap, router])

  const value = useMemo(
    () => ({
      staffContext: ctx ?? EMPTY_CTX,
      contextLoading: loading || !ctx,
    }),
    [ctx, loading]
  )

  return (
    <StaffContextReact.Provider value={value}>
      {children}
    </StaffContextReact.Provider>
  )
}