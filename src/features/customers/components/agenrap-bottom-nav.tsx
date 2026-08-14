'use client'


import { cn } from '@/src/shared/lib/utils'
import { ReactNode, Children } from 'react'

interface MobileBottomNavProps {
  children: ReactNode
  className?: string
  /** Quantidade de colunas. Se não passar, ele conta os children automaticamente */
  cols?: number
}

export default function AgenrapBottomNav({ children, className, cols }: MobileBottomNavProps) {
  const itemsCount = cols ?? Children.count(children)

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16',
        'bg-(--agenrap-brown-200) border-t border-black/20',
        'grid place-items-center',
        className
      )}
      style={{ gridTemplateColumns: `repeat(${itemsCount}, minmax(0, 1fr))` }}
    >
      {children}
    </nav>
  )
}