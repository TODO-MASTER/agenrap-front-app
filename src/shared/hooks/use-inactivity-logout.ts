'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function useInactivityLogout(minutesIdle: number | null) {
    const router = useRouter()
    const timer = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (minutesIdle === null) return

        const reset = () => {
            if (timer.current) clearTimeout(timer.current)
            timer.current = setTimeout(async () => {
                await fetch('/api/logout', { method: 'POST' })
                router.push('/login')
            }, minutesIdle * 60 * 1000)
        }

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
        events.forEach(e => window.addEventListener(e, reset))
        reset()

        return () => {
            if (timer.current) clearTimeout(timer.current)
            events.forEach(e => window.removeEventListener(e, reset))
        }
    }, [minutesIdle, router])
}