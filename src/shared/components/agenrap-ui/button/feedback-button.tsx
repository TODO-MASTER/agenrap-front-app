'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { cn } from "@/src/shared/lib/utils"

export function FeedbackButton({isFixed,plusClassName}:{plusClassName?:string,isFixed?:boolean}) {
    const searchParams = useSearchParams()
    const rapFromQuery = searchParams.get("rap")
    const business = useBusinessStore(bsnCtx => bsnCtx.business)

    const atSign = rapFromQuery ?? (business?.isOwner ? business?.atSign : null)
    const href = atSign ? `/feedback?rap=${atSign}` : "/feedback"

    return (
        <Link
            href={href}
            title="Deixar feedback"
className={cn(
  "flex h-11 w-11 items-center justify-center rounded-md",
  "bg-(--agenrap-purple-500) text-white shadow-lg",
  "hover:bg-(--agenrap-purple-500)/85 transition-colors",
  isFixed && "fixed bottom-24 left-6 z-50",
  plusClassName
)}
        >
            <MessageCircle size={18} />
        </Link>
    )
}