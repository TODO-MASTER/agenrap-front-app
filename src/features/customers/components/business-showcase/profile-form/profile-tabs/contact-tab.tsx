'use client'
 
import { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs"

import { contactSchema, ContactSchema } from "@/src/features/customers/schemas/customer-profile.schema"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"
import { Badge } from "@/src/shared/components/ui/badge"
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Phone } from "lucide-react"
import { macroLogo } from "@/src/assets/images"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
 
export default function ContactTab({ user }: { user: UserProfile }) {
    const [phoneDisplay, setPhoneDisplay] = useState(
        user.phone ? maskPhone(user.phone) : ''
    )
 
    const { handleUpdatePhone, isPhonePending } = useCustomerActions()
 
    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: { telephone: user.phone ?? '' },
        mode: 'onChange',
    })
 
    function onSubmit(values: ContactSchema) {
        handleUpdatePhone(
            values,
            () => form.reset({ telephone: values.telephone }),
            () => {}
        )
    }
 
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
 
                <div className="flex flex-col gap-1">
                    <FormField
                        control={form.control}
                        name="telephone"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput
                                        id="phone"
                                        type="tel"
                                        label="Telefone"
                                        variant="cyberYellowRap"
                                        removeFormMessage
                                        labelIcon={
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] px-1.5 py-0 leading-4"
                                                style={{ borderColor: 'var(--agenrap-yellow-500)', color: 'var(--agenrap-yellow-500)' }}
                                            >
                                                opcional
                                            </Badge>
                                        }
                                        autoComplete="off"
                                        value={phoneDisplay}
                                        left
                                        icon={<Phone size={24} style={{ color: 'var(--agenrap-brown-200)' }} />}
                                        onChange={e => {
                                            const masked = maskPhone(e.target.value)
                                            setPhoneDisplay(masked)
                                            form.setValue('telephone', masked.replace(/\D/g, ''), { shouldValidate: true })
                                        }}
                                        placeholder="(11) 99999-9999"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.telephone && (
                        <p className="text-xs text-red-400 font-tree mt-0.5">
                            {form.formState.errors.telephone.message}
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground font-tree mt-0.5">
                        O estabelecimento pode precisar do seu número para confirmar agendamentos.
                    </p>
                </div>
 
                <AgenrapButton
                    type="submit"
                    variant="purplerap"
                    disabled={isPhonePending || !form.formState.isValid}
                    className="w-full flex justify-center items-center"
                >
                    {isPhonePending ? (
                        <div className="flex relative">
                            <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-6 h-6" color="#F5E6CC" />
                        </div>
                    ) : 'Salvar telefone'}
                </AgenrapButton>
 
            </form>
        </Form>
    )
}
 