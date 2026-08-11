'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function useInactivityLogout(minutesIdle: number | null) {
  const router = useRouter()
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastReset = useRef(0)

  useEffect(() => {
    if (minutesIdle === null) return

    const timeoutMs = minutesIdle * 60 * 1000

    const logout = async () => {
      try {
        await fetch('/api/logout', { method: 'POST' })
      } finally {
        router.replace('/login')
      }
    }

    const reset = () => {
      const now = Date.now()
      // evita reset excessivo (mousemove/touchmove)
      if (now - lastReset.current < 1000) return
      lastReset.current = now

      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(logout, timeoutMs)
    }

    const events: (keyof WindowEventMap)[] = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'touchmove',
      'wheel',
      'click',
    ]

    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reset()
    })

    reset()

    return () => {
      if (timer.current) clearTimeout(timer.current)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [minutesIdle]) 

  return null
}