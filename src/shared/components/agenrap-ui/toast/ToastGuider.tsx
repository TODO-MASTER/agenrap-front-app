'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
export function ToastGuider({ message }: { message: string }) {
    const router = useRouter()
    const fired = useRef(false)

    useEffect(() => {
        if (fired.current) return
        fired.current = true
        toast.warning(message)
        const url = new URL(window.location.href)
        url.searchParams.delete('flash')
        router.replace(url.pathname)
    }, [])

    return null
}