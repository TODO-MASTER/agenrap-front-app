'use client'

import { useBusinessStore } from "@/src/shared/store/useBusinessStore"
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx"
import { useEffect } from "react"

export function BusinessInitializer({ data }: { data: IBusinessCtx }) {
  const setBusiness = useBusinessStore((state) => state.setBusiness)

  useEffect(() => {
    setBusiness(data)
  }, [data])

  return null
}