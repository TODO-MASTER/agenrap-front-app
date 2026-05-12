'use client'

import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { BusinessCtx } from "@/src/shared/types"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function BusinessInitializer({ data }: { data: BusinessCtx }) {
  const setBusiness = useBusinessStore((state) => state.setBusiness)
  const pathname = usePathname()

  useEffect(() => {
    setBusiness(data)
  }, [data, pathname])

  return null
}