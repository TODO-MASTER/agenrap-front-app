'use client'
import { useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

const POLL_INTERVAL_MS = 45_000

export function useDashboardPolling(onRefresh?: () => void) {
    const router = useRouter()
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const refresh = useCallback(() => {
        router.refresh()
        onRefresh?.()
    }, [router, onRefresh])

    const startPolling = useCallback(() => {
        if (intervalRef.current) return
        intervalRef.current = setInterval(refresh, POLL_INTERVAL_MS)
    }, [refresh])

    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    useEffect(() => {
        function handleVisibilityChange() {
            if (document.visibilityState === "visible") {
                refresh()
                startPolling()
            } else {
                stopPolling()
            }
        }

        if (document.visibilityState === "visible") {
            startPolling()
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            stopPolling()
        }
    }, [refresh, startPolling, stopPolling])
}