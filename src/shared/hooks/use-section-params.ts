"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function useSectionParams(basePath: string) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, value)
        router.replace(`${basePath}?${params.toString()}`, { scroll: false })
    }

    const getParam = (key: string) => searchParams.get(key)

    return { setParam, getParam }
}