'use client'
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, LoaderCircle, MessageCircle, Star } from "lucide-react"
import { Textarea } from "@/src/shared/components/ui/textarea"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"

import { FeedbackCategory, FeedbackRes } from "@/src/shared/services/feedback.service"
import { useFeedbackActions } from "@/src/shared/hooks/use-feedback-action"

const CATEGORIES: { key: FeedbackCategory; label: string }[] = [
    { key: "Suggestion", label: "Sugestão" },
    { key: "Bug", label: "Problema" },
    { key: "Praise", label: "Elogio" },
    { key: "Other", label: "Outro" },
]

const STATUS_LABEL: Record<string, string> = { New: "Recebido", Seen: "Em análise", Resolved: "Resolvido" }
const STATUS_COLOR: Record<string, string> = { New: "var(--agenrap-blue-500)", Seen: "var(--agenrap-yellow-500)", Resolved: "var(--agenrap-green-300)" }
const CATEGORY_LABEL: Record<string, string> = { Bug: "Problema", Suggestion: "Sugestão", Praise: "Elogio", Other: "Outro" }

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function FeedbackPageClient({ history }: { history: FeedbackRes[] }) {
    const { handleSubmitFeedback, isPending } = useFeedbackActions()
    const router = useRouter()
    const searchParams = useSearchParams()
    const atSign = searchParams.get("rap")

    const [message, setMessage] = useState("")
    const [rating, setRating] = useState<number | null>(null)
    const [category, setCategory] = useState<FeedbackCategory | null>(null)

    function handleSend() {
        if (!message.trim()) return
        handleSubmitFeedback({ message: message.trim(), rating, category }, atSign, () => {
            setMessage("")
            setRating(null)
            setCategory(null)
        })
    }

    return (
        <div className="min-h-dvh bg-(--agenrap-gray-200) flex flex-col">
            <div className="w-full bg-(--agenrap-gray-800) px-6 py-8 md:py-10">
                <div className="max-w-2xl mx-auto flex flex-col gap-y-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-x-2 font-tree text-sm text-white/60 hover:text-white transition-colors w-fit"
                    >
                        <ArrowLeft size={16} />
                        Voltar
                    </button>
                    <div className="flex items-center gap-x-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-(--agenrap-purple-500)/15 border border-(--agenrap-purple-500)/30">
                            <MessageCircle size={20} className="text-(--agenrap-yellow-200)" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-tree text-2xl font-bold text-white">Sua opinião importa</h1>
                            <p className="font-tree text-sm text-white/50">Conte o que achou, o que travou ou o que sentiu falta</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full h-[3px]">
                <div className="flex-1 bg-(--agenrap-purple-500)" />
                <div className="flex-1 bg-(--agenrap-yellow-200)" />
                <div className="flex-1 bg-(--agenrap-brown-500)" />
            </div>

            <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 flex flex-col gap-y-10">
                <div className="bg-white border border-(--agenrap-brown-500)/10 shadow-lg shadow-black/5 flex flex-col gap-y-5 p-6">
                    <div className="flex flex-col gap-y-2">
                        <p className="font-tree text-sm font-semibold text-(--agenrap-gray-800)">Como você avalia sua experiência?</p>
                        <div className="flex gap-x-1.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button key={n} type="button" onClick={() => setRating(n)}>
                                    <Star
                                        size={28}
                                        fill={rating != null && n <= rating ? "#F59E0B" : "transparent"}
                                        color={rating != null && n <= rating ? "#F59E0B" : "#C46210"}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <p className="font-tree text-sm font-semibold text-(--agenrap-gray-800)">Sobre o que é?</p>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c.key}
                                    type="button"
                                    onClick={() => setCategory(category === c.key ? null : c.key)}
                                    className={`font-tree text-xs px-3.5 py-2 border transition-colors ${
                                        category === c.key
                                            ? "bg-(--agenrap-purple-500) text-white border-(--agenrap-purple-500)"
                                            : "bg-(--agenrap-gray-200) text-(--agenrap-gray-800)/70 border-(--agenrap-brown-500)/15"
                                    }`}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <p className="font-tree text-sm font-semibold text-(--agenrap-gray-800)">Sua mensagem</p>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Conte com detalhes, isso ajuda muito..."
                            className="font-tree bg-(--agenrap-gray-200) border-(--agenrap-brown-500)/15 min-h-32 resize-none"
                            maxLength={1000}
                        />
                    </div>

                    <AgenrapButton
                        onClick={handleSend}
                        disabled={!message.trim() || isPending}
                        className={`${!message.trim() ? "opacity-50 cursor-not-allowed" : ""} flex justify-center items-center bg-(--agenrap-purple-500) hover:bg-(--agenrap-purple-500)/85`}
                    >
                        {isPending ? <LoaderCircle size={18} className="animate-spin text-white" /> : "Enviar feedback"}
                    </AgenrapButton>
                </div>

                {history.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                        <p className="font-tree text-xs uppercase tracking-widest text-(--agenrap-brown-500)/60">
                            Seus feedbacks anteriores
                        </p>
                        <div className="flex flex-col gap-y-3">
                            {history.map((f) => (
                                <div key={f.id} className="bg-white border border-(--agenrap-brown-500)/10 p-4 flex flex-col gap-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-x-2">
                                            {f.category && (
                                                <span className="font-tree text-[10px] uppercase tracking-wider text-(--agenrap-brown-500)/60">
                                                    {CATEGORY_LABEL[f.category]}
                                                </span>
                                            )}
                                            {f.rating != null && (
                                                <div className="flex items-center gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <Star key={n} size={11} fill={n <= f.rating! ? "#F59E0B" : "transparent"} color={n <= f.rating! ? "#F59E0B" : "#d4d4d4"} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-tree text-[10px] text-(--agenrap-brown-500)/40">
                                            {formatDate(f.createdAt)}
                                        </span>
                                    </div>
                                    <p className="font-tree text-sm text-(--agenrap-gray-800)/80 leading-relaxed">{f.message}</p>
                                    <span
                                        className="font-tree text-[10px] font-semibold uppercase tracking-wider w-fit px-2 py-0.5"
                                        style={{ color: STATUS_COLOR[f.status], backgroundColor: STATUS_COLOR[f.status] + "20" }}
                                    >
                                        {STATUS_LABEL[f.status]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}