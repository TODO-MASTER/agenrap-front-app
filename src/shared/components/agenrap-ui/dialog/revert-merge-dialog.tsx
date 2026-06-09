import { getMergeHistoryAsync, MergeHistoryItem, revertMergeAsync } from "@/src/features/business/services/merge.service"
import { BusinessCustomer } from "@/src/features/business/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import { LoaderCircle, RotateCcw, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface RevertMergeDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    customer: BusinessCustomer | null
}
 
export default function RevertMergeDialog({ open, setOpen, customer }: RevertMergeDialogProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const business = useBusinessStore(b => b.business)
 
    const [history, setHistory] = useState<MergeHistoryItem[]>([])
    const [loading, setLoading] = useState(false)
    const [revertingId, setRevertingId] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
 
    useEffect(() => {
        if (!open) {
            setHistory([])
            setError(null)
            setRevertingId(null)
            return
        }
        if (!customer?.userId || !business) return
 
        const rap = searchParams.get("rap") ?? ""
        const load = async () => {
            setLoading(true)
            try {
                const res = await getMergeHistoryAsync(rap, customer.userId!)
                setHistory(res)
            } catch {
                setError("Não foi possível carregar o histórico.")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [open, customer, business])
 
    const handleRevert = async (customerId: number) => {
        const rap = searchParams.get("rap") ?? ""
        setRevertingId(customerId)
        try {
            await revertMergeAsync(rap, customerId)
            setHistory(prev => prev.filter(h => h.customerId !== customerId))
            router.refresh()
        } catch {
            setError("Erro ao reverter mesclagem.")
        } finally {
            setRevertingId(null)
        }
    }
 
    const initials = (name: string) =>
        name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
 
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent
                style={{ width: 'clamp(300px, 92vw, 480px)', maxWidth: 'none' }}
                className="flex flex-col gap-y-0 bg-[#2e2e2e] border-0 p-0 overflow-hidden"
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <DialogHeader className="flex w-full justify-start px-4 sm:px-6 py-4 border-b border-(--agenrap-purple-500)/10 shrink-0">
                    <DialogTitle className="flex justify-between items-center gap-x-3">
                        <div className="flex items-center gap-x-3 min-w-0">
                            <RotateCcw  color="#f87171" size={22} />
                            <div className="flex flex-col ">
                                <p className="font-tree text-white text-base text-start sm:text-lg font-semibold ">Mesclagens</p>
                                {customer && (
                                    <p className="font-tree text-red-400/70 text-xs sm:text-sm font-normal leading-tight truncate">
                                        {customer.fullName}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button type="button" onClick={() => setOpen(false)} className="shrink-0">
                            <X size={20} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>
 
                <div className="flex flex-col gap-3 px-4 sm:px-5 py-4 sm:py-5 min-h-[120px]">
                    {error && (
                        <p className="font-tree text-sm text-red-400 text-center">{error}</p>
                    )}
 
                    {loading && (
                        <div className="flex justify-center items-center py-8">
                            <LoaderCircle className="animate-spin w-8 h-8" color="#f87171" />
                        </div>
                    )}
 
                    {!loading && history.length === 0 && (
                        <p className="font-tree text-sm text-white/40 text-center py-8">
                            Nenhuma mesclagem registrada.
                        </p>
                    )}
 
                    {!loading && history.map(h => (
                        <div key={h.customerId} className="flex items-center gap-x-3 bg-(--agenrap-gray-800) rounded-xl px-3 sm:px-4 py-3">
                            <span
                                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 font-tree text-sm font-semibold"
                                style={{ backgroundColor: '#1a1a1a', color: '#FFE082' }}
                            >
                                {initials(h.customerName)}
                            </span>
                            <div className="flex flex-col flex-1 min-w-0">
                                <p className="font-tree text-white text-sm font-semibold truncate">{h.customerName}</p>
                                <p className="font-tree text-xs text-white/40">
                                    {h.customerTelephone?.trim() ? maskPhone(h.customerTelephone) : 'Sem telefone'}
                                    {' · '}
                                    {new Date(h.mergedAt).toLocaleDateString('pt-BR')}
                                </p>
                                                                <p className="font-tree text-xs text-white/40">
                                    {h.customerEmail?.trim() ? h.customerEmail : 'Sem email'}
                                    {' · '}
                                </p>
                            </div>
                            <button
                                onClick={() => handleRevert(h.customerId)}
                                disabled={revertingId === h.customerId}
                                className="flex items-center gap-x-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-40 shrink-0"
                            >
                                {revertingId === h.customerId
                                    ? <LoaderCircle size={13} className="animate-spin" color="#f87171" />
                                    : <RotateCcw size={13} color="#f87171" />
                                }
                                <span className="font-tree text-xs text-red-400 hidden sm:inline">Reverter</span>
                            </button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}