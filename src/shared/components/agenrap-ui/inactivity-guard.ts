'use client'

import { useInactivityLogout } from '@/src/shared/hooks/use-inactivity-logout'
import { usePathname } from 'next/navigation'

export function InactivityGuard() {
    const pathname = usePathname()
    
    const isPublic = ['/login', '/register', '/welcome', '/verify-email', '/verify-pending-email']
        .some(r => pathname.startsWith(r))

    useInactivityLogout(isPublic ? null : 20)
    
    return null
}