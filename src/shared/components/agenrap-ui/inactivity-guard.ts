'use client'

import { useInactivityLogout } from '@/src/shared/hooks/use-inactivity-logout'
import { usePathname } from 'next/navigation'

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/verify-email',
  '/verify-pending-email',
]

export function InactivityGuard() {
  const pathname = usePathname()

  const isPublic = PUBLIC_ROUTES.some((route) =>
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  )

  useInactivityLogout(isPublic ? null : 5)

  return null
}