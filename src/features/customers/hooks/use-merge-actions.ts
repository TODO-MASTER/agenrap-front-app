import { getMergePreview, mergeCustomerAsync, MergePreview } from "@/src/features/business/services/merge.service"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export function useMergeActions() {
  const [isPreviewPending, startPreviewTransition] = useTransition()
  const [isMergePending, startMergeTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
 
  function handleLoadMergePreview(
    customerIds: number[],
    userId: number,
    onSuccess: (preview: MergePreview) => void
  ) {
    const rap = searchParams.get("rap") ?? ""
    startPreviewTransition(async () => {
      try {
        const res = await getMergePreview(rap, customerIds, userId)
        onSuccess(res)
      } catch (e) {
        if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : "Não foi possível carregar o preview.")
      }
    })
  }
 
  function handleConfirmMerge(
    preview: MergePreview,
    onSuccess: () => void
  ) {
    const rap = searchParams.get("rap") ?? ""
    startMergeTransition(async () => {
      try {
        const response = await mergeCustomerAsync(rap, {
          customerIds: preview.customers.map(c => c.customerId),
          userId: preview.userId,
        })
        toast.success( response.message??"Mesclagem realizada com sucesso!")
        onSuccess()
        router.refresh()
      } catch (e) {
        if (isRedirectError(e)) throw e
        toast.error(e instanceof Error ? e.message : "Algo deu errado na mesclagem.")
      }
    })
  }
 
  return { handleLoadMergePreview, handleConfirmMerge, isPreviewPending, isMergePending }
}