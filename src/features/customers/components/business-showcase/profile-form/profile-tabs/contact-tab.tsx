'use client'
 
import { UserProfile } from "@/src/features/customers/components/business-showcase/profile-form/profile-tabs/profile-tabs"

import { contactSchema, ContactSchema } from "@/src/features/customers/schemas/customer-profile.schema"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"
import { Badge } from "@/src/shared/components/ui/badge"
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, Mail, Phone } from "lucide-react"
import { macroLogo } from "@/src/assets/images"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { useCustomerActions } from "@/src/features/customers/hooks/use-customer-actions"
import { getOne, UserAuthRes } from "@/src/shared/services/user.service"
import { useRouter } from "next/navigation"
import { BusinessCustomer } from "@/src/features/business/types"
import { useUserStore } from "@/src/shared/store/use-user-store"
 

type OrchestredContactTabType={
    user:UserAuthRes|BusinessCustomer
    userGuest?:BusinessCustomer
    open:boolean
    setOpen:(open: boolean) => void

}

export default function ContactTab({user,userGuest,setOpen,open}:OrchestredContactTabType) {
    const setUser = useUserStore(s => s.setUser)
    const { handleUpdateProfile, isPhonePending } = useCustomerActions()
    const router = useRouter()
    const [phoneDisplay, setPhoneDisplay] = useState(
        user.telephone ? maskPhone(user.telephone) : ''
    )

    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: userGuest? {
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            email:userGuest.email??'',
            telephone: user.telephone ?? '',
        }:{
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            telephone: user.telephone ?? '',
        },
        mode: 'onChange',
    })

    function onSubmit(values: ContactSchema) {
        handleUpdateProfile(values,userGuest?.customerId??null, async() => {
        if (!userGuest) {
            const updated = await getOne()
            if (updated) setUser(updated)
        }
            router.refresh()
            form.reset(userGuest? {
     firstName: values.firstName,
                lastName: values.lastName,
                email:values.email,
                telephone: values.telephone,

            }:{
                firstName: values.firstName,
                lastName: values.lastName,
                telephone: values.telephone,
            })
            setOpen(false)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <AgenrapInput
                                        id="firstName"
                                        label="Nome"
                                        variant="cyberYellowRap"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.firstName && (
                                    <p className="text-xs text-red-400 font-tree mt-0.5">
                                        {form.formState.errors.firstName.message}
                                    </p>
                                )}
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
                                        id="lastName"
                                        label="Sobrenome"
                                        variant="cyberYellowRap"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.lastName && (
                                    <p className="text-xs text-red-400 font-tree mt-0.5">
                                        {form.formState.errors.lastName.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>


                <div className="flex flex-col gap-1">
                                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <AgenrapInput
                                        id="email"
                                        label="E-mail"
                                        variant="cyberYellowRap"
                                        removeFormMessage
                                        placeholder="ex:teste@gmail.com"
                                         icon={<Mail size={24} style={{ color: 'var(--agenrap-brown-200)' }} />}
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.email && (
                                    <p className="text-xs text-red-400 font-tree mt-0.5">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />
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
                                            form.setValue('telephone', masked.replace(/\D/g, ''), {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })
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
                    disabled={isPhonePending || !form.formState.isValid || !form.formState.isDirty}
                    className={`w-full justify-center items-center ${(!form.formState.isValid || !form.formState.isDirty) && "transition-all cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"}`}
                >
                    {isPhonePending ? (
                        <div className="flex w-full justify-center items-center relative">
                            <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />
                        </div>
                    ) : 'Salvar perfil'}
                </AgenrapButton>
            </form>
        </Form>
    )
}
 