"use client"

import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/AgenrapInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactRound, Eye, EyeClosed, LoaderCircle, MailPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { useAuth } from "../hooks/useAuth";
import { macroLogo } from "@/src/assets/images";
import Image from "next/image";
import { useState } from "react";
export default function RapAuthForm(isLogin: { isLogin?: boolean }) {
    const { onRegisterSubmit, onLoginSubmit, isAuthLoading } = useAuth();
    const [openEye, setOpenEye] = useState<boolean>(false)

    const formSchema = z.object(isLogin.isLogin ?
        {
            email: z.string()
                .min(1, { message: "*Campo obrigatório" })
                .email({ message: "*Email inválido" }),
            password: z.string()
        } : {
            name: z.string().min(2, {
                message: "*Deve contêr pelo menos 2 letras.",
            }),
            email: z.string()
                .min(1, { message: "*Campo obrigatório" })
                .email({ message: "*Email inválido" }),
            password: z.string()
        })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isLogin.isLogin?{
            email: "",
            password: ""

        }: {
            name: "",
            email: "",
            password: ""

        },
        mode: "onChange"
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => isLogin ? onLoginSubmit(values) : onRegisterSubmit(values))}
                className="flex flex-col gap-6  "
            >
              {!isLogin.isLogin&&  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    id="rap-full-name"
                                    label="Nome"
                                    variant="brownrap"
                                    autoComplete="off"
                                    placeholder="Digite seu nome"
                                    icon={<ContactRound size={25} />}
                                    left={true}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />}
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
                                    icon={openEye ? <Eye onClick={() => setOpenEye(!openEye)} size={20} color="black" className="cursor-pointer" /> : <EyeClosed onClick={() => setOpenEye(!openEye)} size={20} color="black" className="cursor-pointer" />}
                                    left={true}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid} className={`${!form.formState.isValid ? `cursor-not-allowed` : ""} flex justify-center items-center`}>
                    {isAuthLoading ? <div className="flex relative" >
                        <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                        <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                    </div> : isLogin.isLogin?"Entrar":"Criar conta"}
                </AgenrapButton>
            </form>
        </Form>
    )
}