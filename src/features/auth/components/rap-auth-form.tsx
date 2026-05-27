"use client"

import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlignEndVertical, ContactRound, Eye, EyeClosed, LoaderCircle, MailPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { useAuth } from "../hooks/use-auth";
import { macroLogo } from "@/src/assets/images";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setPendingRap } from "@/src/shared/utils/cookies.utils";
import Link from "next/link";

export default function RapAuthForm({ isLogin }: { isLogin?: boolean }) {
    const { onRegisterSubmit, withCheckRapLogin, isAuthLoading } = useAuth();
    const [openEye, setOpenEye] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const rap = searchParams.get("rap")

    const formSchema = z.object(isLogin ? {
        email: z.string().min(1, { message: "*Campo obrigatório" }).email({ message: "*Email inválido" }),
        password: z.string()
    } : {
        firstName: z.string().min(2, { message: "*Mínimo 2 letras" }),
        lastName: z.string().min(2, { message: "*Mínimo 2 letras" }),
        email: z.string().min(1, { message: "*Campo obrigatório" }).email({ message: "*Email inválido" }),
        password: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isLogin ? {
            email: "",
            password: ""
        } : {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => isLogin ? withCheckRapLogin(values) : onRegisterSubmit(values))}
                className="flex flex-col gap-6"
            >
                {!isLogin && (
                    <div className="flex sm:flex-row flex-col gap-3">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <AgenrapInput
                                            id="rap-first-name"
                                            label="Primeiro nome"
                                            variant="brownrap"
                                            autoComplete="off"
                                            placeholder="Ex. Otávio"
                                            icon={<ContactRound size={22} />}
                                            left={true}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <AgenrapInput
                                            id="rap-last-name"
                                            label="Sobrenome"
                                            variant="brownrap"
                                            autoComplete="off"
                                            placeholder="Ex. Mesquita"
                                            icon={<AlignEndVertical/>}
                                            left={true}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    id="rap-email"
                                    label="Seu email"
                                    variant="brownrap"
                                    autoComplete="off"
                                    placeholder="Forneça um email válido"
                                    icon={<MailPlus size={25} />}
                                    left={true}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    id="rap-password"
                                    label="Sua senha"
                                    variant="brownrap"
                                    type={openEye ? "text" : "password"}
                                    autoComplete="off"
                                    placeholder="Digite sua senha"
                                    icon={
                                        openEye
                                            ? <Eye onClick={() => setOpenEye(!openEye)} size={20} color="black" className="cursor-pointer" />
                                            : <EyeClosed onClick={() => setOpenEye(!openEye)} size={20} color="black" className="cursor-pointer" />
                                    }
                                    left={true}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <AgenrapButton
                    type="submit"
                    variant="purplerap"
                    disabled={!form.formState.isValid}
                    className={`${!form.formState.isValid ? "cursor-not-allowed" : ""} flex justify-center items-center`}
                >
                    {isAuthLoading
                        ? <div className="flex relative">
                            <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                        </div>
                        : isLogin ? "Entrar" : "Criar conta"
                    }
                </AgenrapButton>

                {!isLogin && (
                    <p className="text-center text-sm font-tree text-(--agenrap-brown-500)/60">
                        Já tem uma conta?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                if (rap) setPendingRap(rap)
                                router.push(rap ? `/login?rap=${rap}` : "/login")
                            }}
                            className="font-semibold text-(--agenrap-purple-500) hover:underline cursor-pointer"
                        >
                            Entrar
                        </button>
                    </p>
                )}

              {!isLogin && (
    <p className="text-center text-sm font-tree text-(--agenrap-brown-500)/60">
        Já tem uma conta?{" "}
        <button
            type="button"
            onClick={() => {
                if (rap) setPendingRap(rap)
                router.push(rap ? `/login?rap=${rap}` : "/login")
            }}
            className="font-semibold text-(--agenrap-brown-500) hover:underline cursor-pointer"
        >
            Entrar
        </button>
    </p>
)}

{isLogin && (
    <div className="flex flex-col gap-3">
        <p className="text-center text-sm font-tree text-black/85">
            Não tem uma conta?{" "}
            <button
                type="button"
                onClick={() => {
                    if (rap) setPendingRap(rap)
                    router.push(rap ? `/register?cmd=Y&rap=${rap}` : "/register?cmd=Y")
                }}
                className="font-semibold text-(--agenrap-purple-500) hover:underline cursor-pointer"
            >
                Criar conta
            </button>
        </p>
        <p className="text-center text-sm font-tree text-(--agenrap-brown-500)/60">
            <Link href="/forgot-password" className="font-semibold text-(--agenrap-brown-500)/60 hover:text-(--agenrap-brown-500) hover:underline transition-colors">
                Esqueci minha senha
            </Link>
        </p>
    </div>
)}
            </form>
        </Form>
    )
}