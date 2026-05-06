'use client'

import { useBusinessStore } from "@/src/shared/store/useBusinessStore"
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function BusinessInitializer({ data }: { data: IBusinessCtx }) {
  const setBusiness = useBusinessStore((state) => state.setBusiness)
  const pathname = usePathname()

  useEffect(() => {
    setBusiness(data)
  }, [data, pathname])

  return null
}