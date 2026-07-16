"use client"
import { LucideLogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LogoutButtonProps {
    showExpanded?: boolean
}

export function LogoutButton({ showExpanded = true }: LogoutButtonProps) {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

    async function handleLogout() {
        setIsPending(true)
        await fetch('/api/logout', { method: 'POST' })
        router.push('/login')
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className={[
                "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all select-none",
                "text-red-500/70 hover:text-red-600 hover:bg-red-500/10 active:bg-red-500/15",
                !showExpanded ? "justify-center" : "",
                isPending ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
        >
            <LucideLogOut className="h-5 w-5 shrink-0" />
            {showExpanded && (
                <span className="font-tree text-sm">Sair</span>
            )}
        </button>
    )
}