'use client'
import { useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"


import { createCheckoutAction } from "@/src/features/business/services/subscription.service"
import { SubscriptionRequiredError } from "@/src/shared/utils/errors"

export function useSubscription() {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()

    function handleCheckout() {
        const atSign = searchParams.get("rap")
        if (!atSign) return

        startTransition(async () => {
            try {
                const res = await createCheckoutAction(atSign)
                window.open(res.data.checkoutUrl, '_blank')
            } catch (e) {
                if (e instanceof SubscriptionRequiredError) return
                toast.error(e instanceof Error ? e.message : 'Erro ao gerar link de pagamento')
            }
        })
    }

    return { handleCheckout, isPending }
}