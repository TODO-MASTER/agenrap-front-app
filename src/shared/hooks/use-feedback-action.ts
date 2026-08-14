'use client'
import { useTransition } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { FeedbackReq, submitFeedback } from "@/src/shared/services/feedback.service"

export function useFeedbackActions() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleSubmitFeedback(values: FeedbackReq, atSign: string | null, onSuccess: () => void) {
        startTransition(async () => {
            const res = await submitFeedback(values, atSign)
            if (res.data == null) {
                toast.error(res.message || "Não foi possível enviar seu feedback")
            } else {
                toast.success(res.message || "Feedback enviado!")
                router.refresh()
                onSuccess()
            }
        })
    }

    return { handleSubmitFeedback, isPending }
}