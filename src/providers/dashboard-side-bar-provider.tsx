"use client"
import { useEffect, useState } from "react"
import { SidebarProvider } from "../shared/components/ui/sidebar"

export default function DashboardSidebarProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const checkMobile = () => setOpen(window.innerWidth >= 1024)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    if (open === undefined) return null

    return (
        <SidebarProvider
            open={open}
            onOpenChange={setOpen}
            style={{ "--sidebar-width-icon": "6rem" } as React.CSSProperties}
            className="overflow-hidden"
        >
            {children}
        </SidebarProvider>
    )
}