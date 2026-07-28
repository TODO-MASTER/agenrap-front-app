'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/shared/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { VisuallyHidden } from "radix-ui"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { useBusinessActions } from "@/src/features/business/hooks/use-business-actions"
import { editBusinessNameSchema, EditBusinessNameSchema } from "@/src/features/business/schemas/business.schema"

type Props = {
    currentName: string
    open: boolean
    setOpen: (open: boolean) => void
}

export default function EditBusinessNameDialog({ currentName, open, setOpen }: Props) {
    const { handleUpdateBusinessNameAction, isPending } = useBusinessActions()

    const form = useForm<EditBusinessNameSchema>({
        resolver: zodResolver(editBusinessNameSchema),
        defaultValues: { name: currentName },
        mode: "onChange",
    })

    function onSubmit(values: EditBusinessNameSchema) {
        handleUpdateBusinessNameAction(values, () => setOpen(false))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="p-0 gap-0 overflow-hidden border-0"
                style={{ width: 'clamp(320px, 90vw, 420px)', maxWidth: 'none', background: '#2e2e2e' }}
                showCloseButton={false}
                aria-describedby={undefined}
            >
                <VisuallyHidden.Root>
                    <DialogTitle>Editar nome do negócio</DialogTitle>
                </VisuallyHidden.Root>

                <DialogHeader className="flex flex-row items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
                    <p className="font-tree font-semibold text-sm text-white">Editar nome do negócio</p>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="text-white/30 hover:text-white transition-colors text-lg leading-none"
                    >
                        ✕
                    </button>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 py-5 flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AgenrapInput
                                            id="business-name"
                                            label="Nome do negócio"
                                            variant="cyberYellowRap"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    {form.formState.errors.name && (
                                        <p className="text-xs text-red-400 font-tree mt-0.5">
                                            {form.formState.errors.name.message}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        <p className="text-xs text-white/40 font-tree">
                            O link público da sua agenda não será alterado.
                        </p>

                        <AgenrapButton
                            type="submit"
                            variant="purplerap"
                            disabled={isPending || !form.formState.isValid || !form.formState.isDirty}
                            className={`w-full justify-center items-center ${(!form.formState.isValid || !form.formState.isDirty) && "cursor-not-allowed opacity-50"}`}
                        >
                            {isPending ? (
                                <div className="flex w-full justify-center items-center relative">
                                    <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                                    <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                                </div>
                            ) : 'Salvar nome'}
                        </AgenrapButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}