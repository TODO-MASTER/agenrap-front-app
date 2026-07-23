"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollHint({ targetId }: { targetId: string }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const target = document.getElementById(targetId)
        if (!target) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(!entry.isIntersecting)
            },
            { threshold: 0.5 }
        )

        observer.observe(target)
        return () => observer.disconnect()
    }, [targetId])

    const handleClick = () => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <button
            onClick={handleClick}
            aria-label="Ver serviços"
            className={`flex flex-col bg-(--agenrap-gray-800) border-4 border-(--agenrap-yellow-200) rounded-full p-4 md:p-8 items-center gap-y-1 text-(--agenrap-pure-white)/70 hover:text-(--agenrap-pure-white) transition-all duration-300 animate-bounce
                ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
        >
           
            <ChevronDown size={20} className="text-(--agenrap-yellow-200)" />
        </button>
    )
}