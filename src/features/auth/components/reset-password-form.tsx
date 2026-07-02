'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransition, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem } from '@/src/shared/components/ui/form'
import AgenrapInput from '@/src/shared/components/agenrap-ui/input/agenrap-input'
import AgenrapButton from '@/src/shared/components/agenrap-ui/button/agenrap-button'

import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { macroLogo } from '@/src/assets/images'
import Link from 'next/link'
import { toast } from 'sonner'
import { resetPasswordAction } from '@/src/shared/services/user.service'

const schema = z.object({
    newPassword: z.string().min(1),
    confirmPassword: z.string().min(1),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'As senhas não coincidem',
            path: ['confirmPassword'],
        })
    }
})
type Schema = z.infer<typeof schema>

export default function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const [isPending, startTransition] = useTransition()
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: { newPassword: '', confirmPassword: '' },
        mode: 'onChange',
    })

    if (!token) {
        return (
            <div className="h-dvh flex flex-col items-center justify-center gap-4 text-center px-6">
                <p className="text-xl font-tree font-semibold">Link inválido</p>
                <Link href="/forgot-password" className="text-sm font-semibold text-(--agenrap-purple-500) hover:underline">
                    Solicitar novo link
                </Link>
            </div>
        )
    }

    function onSubmit(values: Schema) {
        startTransition(async () => {
            try {
                await resetPasswordAction(token!, values.newPassword)
                toast.success('Senha redefinida com sucesso!')
                router.push('/login')
            } catch (e: any) {
                toast.error(e.message ?? 'Token inválido ou expirado.')
            }
        })
    }

    const EyeToggle = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
        <button type="button" onClick={onToggle} className="cursor-pointer hover:opacity-70 transition-opacity">
            {show
                ? <EyeOff size={18} style={{ color: 'var(--agenrap-brown-200)' }} />
                : <Eye size={18} style={{ color: 'var(--agenrap-brown-200)' }} />
            }
        </button>
    )

    return (
        <div className="h-dvh flex flex-col items-center justify-center gap-6 px-6">
            <div className="flex flex-col items-center gap-1 text-center">
                <Image src={macroLogo} alt="logo AGENRAP" className="w-12 h-12 " />
                <p className="text-xl font-tree font-semibold">Nova senha</p>
                <p className="text-sm text-muted-foreground font-tree">Escolha uma nova senha para sua conta.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="newPassword"
                                        label="Nova senha"
                                        variant="brownrap"
                                        type={showNew ? 'text' : 'password'}
                                        icon={<EyeToggle show={showNew} onToggle={() => setShowNew(p => !p)} />}
                                        left
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.newPassword && (
                                    <p className="text-xs text-red-400 font-tree">{form.formState.errors.newPassword.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="confirmPassword"
                                        label="Repita a senha"
                                        variant="brownrap"
                                        type={showConfirm ? 'text' : 'password'}
                                        icon={<EyeToggle show={showConfirm} onToggle={() => setShowConfirm(p => !p)} />}
                                        left
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.confirmPassword && (
                                    <p className="text-xs text-red-400 font-tree">{form.formState.errors.confirmPassword.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                    <AgenrapButton
                        type="submit"
                        variant="purplerap"
                        disabled={isPending || !form.formState.isValid}
                        className={`w-full justify-center ${(isPending || !form.formState.isValid) && 'cursor-not-allowed opacity-50'}`}
                    >
                        {isPending
                            ? <div className="flex relative w-full justify-center">
                                <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                                <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                            </div>
                            : 'Salvar senha'
                        }
                    </AgenrapButton>
                </form>
            </Form>
        </div>
    )
}