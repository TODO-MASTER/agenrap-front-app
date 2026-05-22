'use client'
import { Feedback } from "@/src/features/customers/components/business-showcase/profile-form/profile-feedback";
import { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs";
import { contactSchema, ContactSchema } from "@/src/features/customers/schemas/customer-profile.schema";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { Badge } from "@/src/shared/components/ui/badge";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import { maskPhone } from "@/src/shared/utils/formatters.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactTab({ user }: { user: UserProfile }) {
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
    const [phoneDisplay, setPhoneDisplay] = useState(
        user.phone ? maskPhone(user.phone) : ''
    )

    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: user.email,
            phone: user.phone ?? '',
        },
        mode: 'onChange',
    })

    async function onSubmit(values: ContactSchema) {
        setFeedback(null)
        try {
            await new Promise(r => setTimeout(r, 700))
            setFeedback({ type: 'success', msg: 'Informações salvas com sucesso!' })
        } catch {
            setFeedback({ type: 'error', msg: 'Erro ao salvar. Tente novamente.' })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="email"
                                        type="email"
                                        removeFormMessage
                                        label="E-mail"
                                        left
                                        icon={<Mail size={24} style={{ color: 'var(--agenrap-brown-200)' }} />}
                                        variant="cyberYellowRap"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs text-red-400 font-tree mt-0.5">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">



                    </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="phone"
                                        type="tel"
                                        label="Telefone"
                                        variant="cyberYellowRap"
                                        removeFormMessage
                                        labelIcon={<Badge
                                            variant="outline"
                                            className="text-[10px] px-1.5 py-0 leading-4"
                                            style={{ borderColor: 'var(--agenrap-yellow-500)', color: 'var(--agenrap-yellow-500)' }}
                                        >
                                            opcional
                                        </Badge>}
                                        autoComplete="off"
                                        value={phoneDisplay}
                                        left
                                        icon={<Phone size={24} style={{ color: 'var(--agenrap-brown-200)' }} />}
                                        onChange={e => {
                                            const masked = maskPhone(e.target.value)
                                            setPhoneDisplay(masked)
                                            form.setValue('phone', masked.replace(/\D/g, ''), { shouldValidate: true })
                                        }}
                                        placeholder="(11) 99999-9999"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.phone && (
                        <p className="text-xs text-red-400 font-tree mt-0.5">
                            {form.formState.errors.phone.message}
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground font-tree mt-0.5">
                        O estabelecimento pode precisar do seu número para confirmar agendamentos.
                    </p>
                </div>

                {feedback && <Feedback type={feedback.type} message={feedback.msg} />}

                <AgenrapButton
                    type="submit"
                    variant="purplerap"
                    disabled={form.formState.isSubmitting || !form.formState.isValid}
                    className="w-full"
                >
                    {form.formState.isSubmitting ? 'Salvando…' : 'Salvar alterações'}
                </AgenrapButton>
            </form>
        </Form>
    )
}