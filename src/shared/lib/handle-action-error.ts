import { SubscriptionRequiredError } from "@/src/shared/utils/errors"
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
 
     const isSubscriptionError =
        e instanceof SubscriptionRequiredError ||
        (e instanceof Error && e.name === 'SubscriptionRequiredError')

    if (isSubscriptionError) {
        toast.error(e instanceof Error ? e.message : 'Plano necessário para continuar.')
        router.push(`/dashboard?rap=${atSign ?? ''}`)
        return
    }

    toast.error(e instanceof Error ? e.message : fallbackMessage)
}