"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"

const PHRASES = [
    "Preparando sua agenda com carinho",
    "Organizando tudo para você",
    "Sincronizando seus compromissos",
    "Ajeitando os últimos detalhes",
    "Quase pronto para um dia incrível",
]

const CHARS = "≈≠∞∅∂∆∇∫∑πµ∂ƒθλφψω"

export default function Loading() {
    const [phraseIndex, setPhraseIndex] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [showCursor, setShowCursor] = useState(true)

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const phrase = PHRASES[phraseIndex]
        let currentText = ""

        const typeNextLetter = (index: number) => {
            if (index >= phrase.length) {
                timeoutRef.current = setTimeout(() => {
                    setPhraseIndex((prev) => (prev + 1) % PHRASES.length)
                }, 1250)
                return
            }

            const letter = phrase[index]
            let scrambleCount = 0

            const scrambleInterval = setInterval(() => {
                if (scrambleCount < 4) {
                    setDisplayText(currentText + CHARS[Math.floor(Math.random() * CHARS.length)])
                    scrambleCount++
                } else {
                    clearInterval(scrambleInterval)
                    currentText += letter
                    setDisplayText(currentText)
                    timeoutRef.current = setTimeout(() => typeNextLetter(index + 1), 42)
                }
            }, 22)
        }

        let back = displayText.length
        const backInterval = setInterval(() => {
            if (back > 0) {
                back--
                const scrambleChar = CHARS[Math.floor(Math.random() * CHARS.length)]
                setDisplayText(displayText.slice(0, back) + scrambleChar)
            } else {
                clearInterval(backInterval)
                typeNextLetter(0)
            }
        }, 28)

        return () => {
            clearInterval(backInterval)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [phraseIndex])

    useEffect(() => {
        const interval = setInterval(() => setShowCursor(v => !v), 420)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0500] overflow-hidden">
            <div className="flex flex-col items-center gap-12">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-3xl opacity-25 scale-125" />
                    <Image
                        src={macroLogo}
                        alt="Agenrap"
                        className="relative w-28 h-28 drop-shadow-2xl"
                        priority
                    />
                </div>

                <div className="min-h-[56px] flex items-center">
                    <p className="font-tree text-2xl text-amber-100 tracking-wide">
                        {displayText}
                        <span 
                            className={`inline-block w-[3px] h-7 bg-amber-400 ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}
                        />
                    </p>
                </div>

                <div className="flex gap-2">
                    {PHRASES.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-700 ${
                                i === phraseIndex ? "w-10 bg-amber-400" : "w-2 bg-amber-500/30"
                            }`}
                        />
                    ))}
                </div>

                <p className="font-cinzel text-white text-xs tracking-[4px] font-light">AGENRAP</p>
            </div>
        </div>
    )
}