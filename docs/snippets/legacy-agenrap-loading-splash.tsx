// "use client"

// import { useEffect, useRef, useState } from "react"
// import Image from "next/image"
// import { macroLogo } from "@/src/assets/images"

// const DEFAULT_PHRASES = [
//     "Preparando sua agenda com carinho",
//     "Organizando tudo para você",
//     "Sincronizando seus compromissos",
//     "Ajeitando os últimos detalhes",
//     "Quase pronto para um dia incrível",
// ]

// const CHARS = "≈≠∞∅∂∆∇∫∑πµ∂ƒθλφψω"

// type Props = {
//     phrases?: string[]
// }

// export default function AgenrapLoadingSplash({ phrases = DEFAULT_PHRASES }: Props) {
//     const [phraseIndex, setPhraseIndex] = useState(0)
//     const [displayText, setDisplayText] = useState("")
//     const [showCursor, setShowCursor] = useState(true)

//     const timeoutRef = useRef<NodeJS.Timeout | null>(null)

//     useEffect(() => {
//         const phrase = phrases[phraseIndex]
//         let currentText = ""

//         const typeNextLetter = (index: number) => {
//             if (index >= phrase.length) {
//                 timeoutRef.current = setTimeout(() => {
//                     setPhraseIndex((prev) => (prev + 1) % phrases.length)
//                 }, 1250)
//                 return
//             }

//             const letter = phrase[index]
//             let scrambleCount = 0

//             const scrambleInterval = setInterval(() => {
//                 if (scrambleCount < 4) {
//                     setDisplayText(currentText + CHARS[Math.floor(Math.random() * CHARS.length)])
//                     scrambleCount++
//                 } else {
//                     clearInterval(scrambleInterval)
//                     currentText += letter
//                     setDisplayText(currentText)
//                     timeoutRef.current = setTimeout(() => typeNextLetter(index + 1), 42)
//                 }
//             }, 22)
//         }

//         let back = displayText.length
//         const backInterval = setInterval(() => {
//             if (back > 0) {
//                 back--
//                 const scrambleChar = CHARS[Math.floor(Math.random() * CHARS.length)]
//                 setDisplayText(displayText.slice(0, back) + scrambleChar)
//             } else {
//                 clearInterval(backInterval)
//                 typeNextLetter(0)
//             }
//         }, 28)

//         return () => {
//             clearInterval(backInterval)
//             if (timeoutRef.current) clearTimeout(timeoutRef.current)
//         }
//     }, [phraseIndex, phrases])

//     useEffect(() => {
//         const interval = setInterval(() => setShowCursor(v => !v), 420)
//         return () => clearInterval(interval)
//     }, [])

//     return (
//         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--agenrap-gray-200) overflow-hidden">
//             <div className="flex flex-col items-center gap-12">
//                 <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-(--agenrap-yellow-200) to-(--agenrap-brown-500) rounded-full blur-3xl opacity-20 scale-125" />
//                     <Image
//                         src={macroLogo}
//                         alt="Agenrap"
//                         className="relative w-28 h-28 drop-shadow-xl"
//                         priority
//                     />
//                 </div>

//                 <div className="min-h-[56px] flex items-center">
//                     <p className="font-tree text-2xl text-(--agenrap-gray-800) tracking-wide">
//                         {displayText}
//                         <span
//                             className={`inline-block w-[3px] h-7 bg-(--agenrap-brown-500) ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}
//                         />
//                     </p>
//                 </div>

//                 <div className="flex gap-2">
//                     {phrases.map((_, i) => (
//                         <div
//                             key={i}
//                             className={`h-1 rounded-full transition-all duration-700 ${
//                                 i === phraseIndex ? "w-10 bg-(--agenrap-purple-500)" : "w-2 bg-(--agenrap-gray-800)/15"
//                             }`}
//                         />
//                     ))}
//                 </div>

//                 <p className="font-cinzel text-(--agenrap-gray-800)/60 text-xs tracking-[4px] font-light">AGENRAP</p>
//             </div>
//         </div>
//     )
// }