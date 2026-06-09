'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { Form, FormControl, FormField, FormItem } from '@/src/shared/components/ui/form'
import AgenrapInput from '@/src/shared/components/agenrap-ui/input/agenrap-input'
import AgenrapButton from '@/src/shared/components/agenrap-ui/button/agenrap-button'
import { AgenrapSegmentedControl } from '@/src/shared/components/agenrap-ui/button/agenrap-segment-button'
import { Badge } from '@/src/shared/components/ui/badge'
import { Phone, LoaderCircle, Mail } from 'lucide-react'
import Image from 'next/image'
import { macroLogo } from '@/src/assets/images'
import { maskPhone } from '@/src/shared/utils/formatters.utils'
import { CreateCustomerSchema, createCustomerSchema } from '@/src/features/business/schemas/customer.schema'
import { createCustomerAction } from '@/src/features/business/services/customer.service'

export default function CreateCustomerForm({ rap }: { rap: string }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [phoneDisplay, setPhoneDisplay] = useState('')

    const form = useForm<CreateCustomerSchema>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: { firstName: '', lastName: '', telephone: '', email: '' },
        mode: 'onChange',
    })

    function onSubmit(values: CreateCustomerSchema) {
        startTransition(async () => {
            try {
                const res = await createCustomerAction(values, rap)
                toast.success(res.message ?? 'Cliente cadastrado!')
                router.push(`/dashboard/customers?rap=${rap}`)
            } catch (e) {
                if (isRedirectError(e)) throw e
                toast.error(e instanceof Error ? e.message : 'Erro ao cadastrar cliente')
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:w-[40%] md:w-[60%] S gap-5">
                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <AgenrapInput id="firstName" removeFormMessage label="Nome" placeholder='Ex. Primeiro Nome' variant="brownrap" autoComplete="off" {...field} />
                                </FormControl>
                                {form.formState.errors.firstName && (
                                    <p className="text-xs text-red-400 font-tree mt-0.5">{form.formState.errors.firstName.message}</p>
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
                                    <AgenrapInput id="lastName" removeFormMessage placeholder='Ex. Ultimo Nome' label="Sobrenome" variant="brownrap" autoComplete="off" {...field} />
                                </FormControl>
                                {form.formState.errors.lastName && (
                                    <p className="text-xs text-red-400 font-tree mt-0.5">{form.formState.errors.lastName.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <AgenrapInput 
                                id="email" 
                                placeholder='example@gmail.com' 
                                                                    labelIcon={
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 leading-4">
                                            opcional
                                        </Badge>
                                    }
                                label="E-mail" 
                                variant="brownrap" 
                                autoComplete="off"
                                removeFormMessage
                                left
                                icon={<Mail size={20} />}
                                {...field} />
                            </FormControl>
                            {form.formState.errors.email && (
                                <p className="text-xs text-red-400 font-tree mt-0.5">{form.formState.errors.email.message}</p>
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
                                    id="telephone"
                                    type="tel"
                                    label="Telefone"
                                    variant="brownrap"
                                    removeFormMessage
                                    labelIcon={
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 leading-4">
                                            opcional
                                        </Badge>
                                    }
                                    autoComplete="off"
                                    value={phoneDisplay}
                                    left
                                    icon={<Phone size={20} />}
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
                            {form.formState.errors.telephone && (
                                <p className="text-xs text-red-400 font-tree mt-0.5">{form.formState.errors.telephone.message}</p>
                            )}
                        </FormItem>
                    )}
                />

                <AgenrapButton
                    type="submit"
                    variant="purplerap"
                    disabled={isPending || !form.formState.isValid}
                    className={`w-full justify-center ${(!form.formState.isValid) && 'cursor-not-allowed opacity-50'}`}
                >
                    {isPending ? (
                        <div className="flex relative">
                            <Image src={macroLogo} alt="" className="w-6 h-6 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-6 h-6" color="#F5E6CC" />
                        </div>
                    ) : 'Cadastrar cliente'}
                </AgenrapButton>
            </form>
        </Form>
    )
}