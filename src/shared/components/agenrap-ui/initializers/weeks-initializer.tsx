'use client'

import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { NormalizedWeek } from "@/src/shared/utils/normalize-week.utils"
import { useEffect } from "react"

export function WeeksInitializer({ data }: { data: NormalizedWeek[] }) {
    const setWeeks = useBusinessStore((state) => state.setWeeks)

    useEffect(() => {
        setWeeks(data)
    }, [data])

    return null
}