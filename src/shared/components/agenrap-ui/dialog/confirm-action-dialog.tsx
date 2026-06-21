'use client'
import { Dispatch, SetStateAction, ReactNode, useTransition } from "react";
import { LoaderCircle, LucideIcon, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";

interface ConfirmActionDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    icon: LucideIcon
    title: string
    message: ReactNode
    confirmLabel?: string
    confirmIcon?: LucideIcon
    confirmColorClassName?: string
    refreshOnConfirm?: boolean
    onConfirm: () => Promise<void> | void
}

export default function ConfirmActionDialog({
    open,
    setOpen,
    icon: Icon,
    title,
    message,
    confirmLabel = "Deletar",
    confirmIcon: ConfirmIcon = Trash,
    confirmColorClassName = "bg-red-600",
    refreshOnConfirm = true,
    onConfirm,
}: ConfirmActionDialogProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    function handleConfirm() {
        startTransition(async () => {
            await onConfirm()
            if (refreshOnConfirm) router.refresh()
            setOpen(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent
                className="flex flex-col w-full gap-y-6 bg-[#2e2e2e] border-0 p-0"
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <DialogHeader className="flex w-full justify-start px-8 py-4 border-b border-(--agenrap-purple-500)">
                    <DialogTitle className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Icon size={25} color="#fff" />
                            <p className="font-tree text-white text-2xl font-semibold">{title}</p>
                        </div>
                        <button type="button" onClick={() => setOpen(false)} disabled={isPending}>
                            <X size={25} color="red" />
                        </button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-y-4 px-8 pb-8">
                    <p className="font-tree text-white text-center text-lg">
                        {message}
                    </p>

                    <div className="flex gap-x-3 w-full">
                        <AgenrapButton
                            className="w-full"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Voltar
                        </AgenrapButton>

                        <AgenrapButton
                            className={`w-full flex items-center justify-center gap-x-2 ${confirmColorClassName}`}
                            onClick={handleConfirm}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <LoaderCircle size={25} color="#fff" className="animate-spin" />
                            ) : (
                                <>
                                    <ConfirmIcon size={25} color="#fff" />
                                    <p>{confirmLabel}</p>
                                </>
                            )}
                        </AgenrapButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}