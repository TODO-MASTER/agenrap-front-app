"use client"
import { LucideLogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LogoutButtonProps {
    showExpanded?: boolean
}
 export const  handleLogout=async(setIsPending:any,router:any)=> {
        setIsPending(true)
        await fetch('/api/logout', { method: 'POST' })
        router.push('/login')
    }
export function LogoutButton({ showExpanded = true }: LogoutButtonProps) {
    const router = useRouter()
    const [isPending, setIsPending] = useState(false)

   

    return (
        <button
            onClick={()=>handleLogout(setIsPending,router)}
            disabled={isPending}
            className={[
                "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all select-none",
                "bg-red-500 text-white hover:opacity-65",
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