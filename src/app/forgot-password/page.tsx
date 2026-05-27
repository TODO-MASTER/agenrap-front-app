'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem } from '@/src/shared/components/ui/form'
import AgenrapInput from '@/src/shared/components/agenrap-ui/input/agenrap-input'
import AgenrapButton from '@/src/shared/components/agenrap-ui/button/agenrap-button'

import { HeartHandshake, LoaderCircle, Mail, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { calytraPureLogo, calytraPureType, macroLogo, verifyRecoverPasswordIcon } from '@/src/assets/images'
import Link from 'next/link'
import { forgotPasswordAction } from '@/src/shared/services/user.service'

const schema = z.object({ email: z.string().email('Email inválido').min(1) })
type Schema = z.infer<typeof schema>

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false)
    const [isPending, startTransition] = useTransition()

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: { email: '' },
        mode: 'onChange',
    })

    function onSubmit(values: Schema) {
        startTransition(async () => {
            await forgotPasswordAction(values.email)
            setSent(true)
        })
    }

    if (sent) {
        return (
            <div className="h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center">


                      
                                <div className="flex items-center justify-center ">
                                    <Image src={calytraPureLogo} alt="logo da Calytra" className="w-16 h-16" />
                                    <HeartHandshake width={35} height={35} color="#2563EB" />
                                    <Image src={macroLogo} alt="logo AGENRAP" className="w-12 h-12 " />
                                </div>
                                <h1 className="text-2xl font-tree font-bold">Verifique seu Email</h1>
                                <div className="flex flex-col">
                                    <Image src={verifyRecoverPasswordIcon} alt="icone referente a verificar o email" />
                                    <div className="flex gap-x-0.5 justify-end items-center py-1">
                                        <ShieldCheck width={25} height={25} color="#2563EB" />
                                        <Image src={calytraPureType} alt="calytra protection" className=" w-25" />
                                    </div>
                                </div>
                
                        
                <Link href="/login" className="text-sm font-tree  text-black font-semibold w-full  hover:underline">
                    Voltar ao login
                </Link>
            </div>
        )
    }

    return (
        <div className="h-dvh flex flex-col items-center justify-center gap-6 px-6">
            <div className="flex flex-col items-center gap-1 text-center">
        <Image src={macroLogo} alt="logo AGENRAP" className="w-12 h-12 " />
                <p className="text-xl font-tree font-semibold">Esqueceu a senha?</p>
                <p className="text-sm text-muted-foreground font-tree max-w-sm">
                    Informe seu email e enviaremos um link para redefinir sua senha.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="email"
                                        label="Seu email"
                                        variant="brownrap"
                                        placeholder="exemplo@email.com"
                                        icon={<Mail size={20} />}
                                        left
                                        {...field}
                                    />
                                </FormControl>
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
                            : 'Enviar link'
                        }
                    </AgenrapButton>
                    <Link href="/login" className="text-center text-sm font-tree text-(--agenrap-purple-500) hover:underline">
                        Voltar ao login
                    </Link>
                </form>
            </Form>
        </div>
    )
}