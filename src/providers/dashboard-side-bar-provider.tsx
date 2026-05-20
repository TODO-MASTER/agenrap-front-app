"use client"
import { useEffect, useState } from "react"
import { SidebarProvider } from "../shared/components/ui/sidebar"

export default function DashboardSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

useEffect(() => {
  let timeout: NodeJS.Timeout
  const checkMobile = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => setOpen(window.innerWidth < 1024), 100)
  }
  checkMobile()
  window.addEventListener("resize", checkMobile)
  return () => {
    window.removeEventListener("resize", checkMobile)
    clearTimeout(timeout)
  }
}, [])

  return (
    <SidebarProvider
    defaultOpen={false}
      style={{ "--sidebar-width-icon": "12rem" } as React.CSSProperties}
      className="overflow-hidden"
    >
      {children}
    </SidebarProvider>
  )
}