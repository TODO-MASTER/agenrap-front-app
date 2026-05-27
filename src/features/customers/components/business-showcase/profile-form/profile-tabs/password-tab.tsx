'use client'

import { macroLogo } from "@/src/assets/images";
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions";
import { passwordSchema, PasswordSchema } from "@/src/features/customers/schemas/customer-profile.schema";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import { Separator } from "@/src/shared/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PasswordTab() {
    const { handleChangePassword, isPasswordPending } = useCustomerActions()
    const router = useRouter()
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const form = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
        mode: 'onChange',
    })


    async function onSubmit(values: PasswordSchema) {
        handleChangePassword(
            values,
            () => {
                router.refresh()
                form.reset()
            },
        )
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="currentPassword"
                                        type={showCurrent ? "text" : "password"}
                                        label="Senha atual"
                                        variant="cyberYellowRap"
                                        placeholder="Ex. m1nh@s#nha123"
                                        left
                                        icon={<EyeToggle show={showCurrent} onToggle={() => setShowCurrent(p => !p)} />}
                                        autoComplete="current-password"
                                        removeFormMessage
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.currentPassword && (
                        <p className="text-xs text-red-400 font-tree mt-0.5">
                            {form.formState.errors.currentPassword.message}
                        </p>
                    )}
                </div>

                <Separator />

                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="newPassword"
                                        type={showNew ? "text" : "password"}
                                        label="Nova senha"
                                        variant="cyberYellowRap"
                                        left
                                        autoComplete="new-password"
                                        icon={<EyeToggle show={showNew} onToggle={() => setShowNew(p => !p)} />}
                                        placeholder="Mínimo 6 caracteres"
                                        removeFormMessage
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.newPassword && (
                        <p className="text-xs text-red-400 font-tree mt-0.5">
                            {form.formState.errors.newPassword.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="confirmPassword"
                                        type={showConfirm ? "text" : "password"}
                                        label="Repita a senha"
                                        variant="cyberYellowRap"
                                        autoComplete="new-password"
                                        left
                                        placeholder="Repita a nova senha"
                                        icon={<EyeToggle show={showConfirm} onToggle={() => setShowConfirm(p => !p)} />}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-xs text-red-400 font-tree mt-0.5">
                            {form.formState.errors.confirmPassword.message}
                        </p>
                    )}
                </div>


                <AgenrapButton
                    type="submit"
                    variant="purplerap"
                    disabled={form.formState.isSubmitting || !form.formState.isValid || !form.formState.isDirty || isPasswordPending }
                    className={`w-full justify-center  items-center    ${(!form.formState.isValid || !form.formState.isDirty) && "transition-all cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"}`}
                >
                    {isPasswordPending ? (
                        <div className="flex w-full justify-center items-center relative">
                            <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                        </div>
                    ) : 'Salvar nova senha'}
                </AgenrapButton>
            </form>
        </Form>
    )
}