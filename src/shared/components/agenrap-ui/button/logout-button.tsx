"use client"

import { LucideLogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/src/shared/lib/utils"

interface LogoutButtonProps {
  showExpanded?: boolean
  className?: string
}

export const handleLogout = async (setIsPending: any, router: any) => {
  setIsPending(true)
  await fetch("/api/logout", { method: "POST" })
  router.push("/login")
}

export function LogoutButton({ showExpanded = true, className }: LogoutButtonProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  return (
    <button
      onClick={() => handleLogout(setIsPending, router)}
      disabled={isPending}
      className={cn(
        "flex items-center justify-center rounded-md transition-all select-none",
        "bg-red-500 text-white hover:opacity-80",
        showExpanded ? "w-full gap-2 px-3 py-2" : "h-11 w-11",
        isPending && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <LucideLogOut className="h-5 w-5 shrink-0" />
      {showExpanded && <span className="font-tree text-sm">Sair</span>}
    </button>
  )
}