
import FeedbackPageClient from "@/src/shared/components/feedback-page-client"
import { GetMyFeedback } from "@/src/shared/services/feedback.service"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Feedback - Agenrap",
    description: "Conte sua experiência com o Agenrap",
}

export default async function FeedbackPage() {
    const history = await GetMyFeedback()
    return <FeedbackPageClient history={history?.data ?? []} />
}