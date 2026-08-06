import { isRedirectError } from "next/dist/client/components/redirect-error"
import { toast } from "sonner"

 
type RouterLike = { push: (href: string) => void }

export function handleActionError(
    e: unknown,
    router: RouterLike,
    atSign: string | null,
    fallbackMessage: string
) {
    if (isRedirectError(e)) throw e
    toast.error(e instanceof Error ? e.message : fallbackMessage)
}

export function checkSubscriptionRequired(
    data: { subscriptionRequired?: boolean, message: string },
    router: RouterLike,
    atSign: string | null
): boolean {
    if (!data.subscriptionRequired) return false
    toast.error(data.message || 'Plano necessário para continuar.')
    router.push(`/dashboard?rap=${atSign ?? ''}`)
    return true
}