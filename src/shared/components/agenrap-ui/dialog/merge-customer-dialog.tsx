'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { GitMerge, LoaderCircle, LucideSkipBack, X, ArrowDown, CheckCircle2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getMergePreview, mergeCustomerAsync, MergePreview } from "@/src/features/business/services/merge.service"
import { currencyUtils } from "@/src/shared/utils/currency.utils"
import { BusinessCustomer } from "@/src/features/business/types"
import { useBusinessStore } from "@/src/shared/store/use-business.store"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { useMergeActions } from "@/src/features/customers/hooks/use-merge-actions"

interface MergeCustomerDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    customer: BusinessCustomer | null
}
 
export default function MergeCustomerDialog({ open, setOpen, customer }: MergeCustomerDialogProps) {
    const searchParams = useSearchParams()
    const business = useBusinessStore(b => b.business)
    const { handleLoadMergePreview, handleConfirmMerge, isPreviewPending, isMergePending } = useMergeActions()
 
    const [preview, setPreview] = useState<MergePreview | null>(null)
 
    useEffect(() => {
        if (!open) {
            setPreview(null)
            return
        }
        if (!customer || !business) return
        if (!customer.userId || !customer.mergeTargetCustomerIds?.length) return
 
        handleLoadMergePreview(customer.mergeTargetCustomerIds, customer.userId, (res) => {
            setPreview(res)
        })
    }, [open, customer, business])
 
    const initials = (name: string) =>
        name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
 
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent
                style={{ width: 'clamp(300px, 92vw, 520px)', maxWidth: 'none' }}
                className="flex flex-col gap-y-0 bg-[#2e2e2e] border-0 p-0 overflow-hidden"
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <DialogHeader className="flex w-full justify-start px-6 py-4 border-b border-(--agenrap-purple-500)/10 shrink-0">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-x-3 min-w-0">
                            <GitMerge className="w-6 h-6 shrink-0" color="#BB77EE" />
                            <div className="flex flex-col min-w-0">
                                <p className="font-tree text-white text-lg font-semibold leading-tight">Mesclar cliente</p>
                                {customer && (
                                    <p className="font-tree text-(--agenrap-purple-500) text-sm font-normal leading-tight truncate">
                                        {customer.fullName}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button type="button" onClick={() => setOpen(false)} className="shrink-0">
                            <X size={22} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>
 
                {isPreviewPending && (
                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12">
                        <div className="flex relative justify-center items-center">
                            <Image src={macroLogo} alt="" className="w-12 h-12 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-12 h-12" color="#BB77EE" />
                        </div>
                        <p className="font-tree text-white/50 text-sm">Carregando dados da mesclagem...</p>
                    </div>
                )}
 
                {!isPreviewPending && preview && (
                    <div className="flex flex-col gap-4 px-5 py-5">
                        <CustomerCard
                            name={preview.userName}
                            telephone={preview.userTelephone}
                            email={preview.userEmail}
                            totalAppointments={preview.userTotalAppointments}
                            totalSpent={preview.userTotalSpent}
                            label="Com conta"
                            labelColor="#BB77EE"
                            initials={initials(preview.userName)}
                        />
 
                        <div className="flex items-center justify-center gap-x-2">
                            <span className="h-px flex-1 bg-white/10" />
                            <ArrowDown size={13} color="#ffffff40" />
                            <span className="font-tree text-[10px] text-white/30">vai absorver</span>
                            <ArrowDown size={13} color="#ffffff40" />
                            <span className="h-px flex-1 bg-white/10" />
                        </div>
 
                        <div className="flex flex-col gap-y-2">
                            {preview.customers.map(c => (
                                <CustomerCard
                                    key={c.customerId}
                                    name={c.customerName}
                                    telephone={c.customerTelephone}
                                    email={c.customerEmail}
                                    totalAppointments={c.customerTotalAppointments}
                                    totalSpent={c.customerTotalSpent}
                                    label="Sem conta"
                                    labelColor="#ffffff40"
                                    initials={initials(c.customerName)}
                                />
                            ))}
                        </div>
 
                        <div className="flex items-center justify-between bg-(--agenrap-purple-500)/10 border border-(--agenrap-purple-500)/20 rounded-xl px-4 py-3">
                            <p className="font-tree text-sm text-(--agenrap-purple-500) font-semibold">Após a mesclagem</p>
                            <div className="flex items-center gap-x-3">
                                <span className="font-tree text-xs text-white/60">
                                    {preview.mergedTotalAppointments} agend.
                                </span>
                                <span className="text-white/20">·</span>
                                <span className="font-tree text-xs font-semibold text-white">
                                    {currencyUtils.fromCents(preview.mergedTotalSpent)}
                                </span>
                            </div>
                        </div>
 
                        <div className="flex gap-3 pt-1">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                disabled={isMergePending}
                                className="flex items-center gap-x-2 px-4 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors text-sm font-tree disabled:opacity-40 shrink-0"
                            >
                                <LucideSkipBack size={14} />
                                Cancelar
                            </button>
 
                            <button
                                type="button"
                                onClick={() => handleConfirmMerge(preview, () => setOpen(false))}
                                disabled={isMergePending}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-(--agenrap-purple-500)/15 border border-(--agenrap-purple-500)/30 hover:bg-(--agenrap-purple-500)/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isMergePending
                                    ? <>
                                        <div className="flex relative justify-center items-center">
                                            <Image src={macroLogo} alt="" className="w-5 h-5 opacity-15 animate-pulse" />
                                            <LoaderCircle className="animate-spin absolute w-5 h-5" color="#BB77EE" />
                                        </div>
                                        <span className="font-tree text-sm text-(--agenrap-purple-500)">Mesclando...</span>
                                    </>
                                    : <>
                                        <GitMerge size={15} color="#BB77EE" />
                                        <span className="font-tree text-sm text-(--agenrap-purple-500)">Confirmar mesclagem</span>
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
 
function CustomerCard({
    name, telephone,email, totalAppointments, totalSpent, label, labelColor, initials,
}: {
    name: string
    telephone: string | null
    email: string | null
    totalAppointments: number
    totalSpent: number
    label: string
    labelColor: string
    initials: string
}) {
    return (
        <div className="flex items-center gap-x-3 bg-(--agenrap-gray-800) rounded-xl px-4 py-3">
            <span
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 font-tree text-sm font-semibold"
                style={{ backgroundColor: '#1a1a1a', color: '#FFE082' }}
            >
                {initials}
            </span>
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-x-1.5 flex-wrap">
                    <p className="font-tree text-white text-sm font-semibold truncate">{name}</p>
                    <span className="font-tree text-[10px] shrink-0" style={{ color: labelColor }}>{label}</span>
                </div>
                <p className="font-tree text-xs text-white/40">{telephone?.trim() ? maskPhone(telephone) : 'Sem telefone'}</p>
                <p className="font-tree text-xs text-white/40">{email?.trim() ? email : 'Sem email'}</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
                <p className="font-tree text-xs text-white/60">{totalAppointments} agend.</p>
                <p className="font-tree text-xs font-semibold text-white">{currencyUtils.fromCents(totalSpent)}</p>
            </div>
        </div>
    )
}