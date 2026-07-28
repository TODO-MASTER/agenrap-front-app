'use client'

import { Check, Copy } from "lucide-react"
import { useState } from "react"

type Props = {
    link: string
}

export default function CopyLinkButton({ link }: Props) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all active:scale-[0.98] font-tree text-sm"
            style={{
                borderColor: copied ? "#4a9a5a" : "#D9D0C8",
                color: copied ? "#4a9a5a" : "#1C0F00",
                background: copied ? "#0F1A1210" : "transparent",
            }}
        >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span className="truncate max-w-[150px] md:max-w-none">{copied ? "Copiado!" : link}</span>
        </button>
    )
}