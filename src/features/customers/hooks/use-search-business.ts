'use client'
import { searchBusiness } from "@/src/features/customers/services/customer.service";
import { useEffect, useState } from "react";


export type BusinessSearchResult = {
    id: number
    name: string
    atSign: string
}

export function useBusinessSearch(query: string) {
    const [results, setResults] = useState<BusinessSearchResult[]>([])
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        const trimmed = query.trim()
        if (trimmed.length < 2) {
            setResults([])
            return
        }

        setIsSearching(true)
        const timeout = setTimeout(async () => {
            const res = await searchBusiness(trimmed)
            setResults(res.data! ?? [])
            setIsSearching(false)
        }, 500)

        return () => clearTimeout(timeout)
    }, [query])

    return { results, isSearching }
}