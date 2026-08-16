'use client'
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form"
import { professionalSchema, ProfessionalSchema } from "@/src/features/business/schemas/professional.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { LoaderCircle, Check } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { PROFESSIONAL_AVATAR_COLORS } from "@/src/shared/utils/professional-colors.utils"
import { Service } from "@/src/features/business/types"
import { useTransition } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { CreateProfessionalService, EditProfessionalService } from "@/src/features/business/services/professional.service"
import { Professional } from "@/src/features/business/types/professional.types"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"


type Props = {
    services: Service[]
    editingProfessional?: Professional | null
    onSuccess?: () => void
}

export default function ProfessionalForm({ services, editingProfessional, onSuccess }: Props) {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const router = useRouter()
    const atSign = searchParams.get("rap")

    const form = useForm<ProfessionalSchema>({
        resolver: zodResolver(professionalSchema),
        defaultValues: {
            name: editingProfessional?.name ?? "",
            telephone: editingProfessional?.telephone ?? "",
            avatarColor: editingProfessional?.avatarColor ?? "purple",
            serviceIds: editingProfessional?.serviceIds ?? [],
        },
        mode: "onChange"
    })

    const onSubmit = (values: ProfessionalSchema) => {
        startTransition(async () => {
            try {
                if (!atSign) {
                    toast.error("Negócio não identificado!")
                    return
                }
                const data = editingProfessional
                    ? await EditProfessionalService(editingProfessional.id, values)
                    : await CreateProfessionalService(values, atSign)

                if (data.data == null) {
                    toast.error(data.message || "Algo deu errado!")
                } else {
                    toast.success(data.message || "Profissional salvo!")
                    onSuccess?.()
                    router.refresh()
                }
            } catch (e) {
                toast.error(e instanceof Error ? e.message : "Erro ao salvar profissional")
            }
        })
    }

    const watchColor = form.watch("avatarColor")
    const watchName = form.watch("name")
    const watchServiceIds = form.watch("serviceIds")

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full rounded-md overflow-hidden">
                <div className="bg-(--agenrap-gray-800) px-4 py-3 flex items-center gap-2">
                    <p className="font-tree font-bold text-sm text-white flex-1">
                        {editingProfessional ? "Editar profissional" : "Novo profissional"}
                    </p>
                </div>

                <div className="bg-(--agenrap-brown-500)/75 p-5 flex flex-col gap-y-4">
                    <div className="flex justify-center py-2">
                        <ProfessionalAvatar name={watchName || "?"} color={watchColor} size="lg" />
                    </div>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput variant="brownrap" placeholder="Nome do profissional" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <AgenrapInput variant="brownrap" placeholder="Telefone (opcional)" {...field} value={field.value ?? ""} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-y-2">
                        <p className="font-tree text-sm font-semibold text-white">Cor</p>
                        <div className="flex gap-2">
                            {PROFESSIONAL_AVATAR_COLORS.map(c => (
                                <button
                                    key={c.key}
                                    type="button"
                                    onClick={() => form.setValue("avatarColor", c.key, { shouldValidate: true })}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${watchColor === c.key ? "ring-2 ring-offset-2 ring-offset-(--agenrap-brown-500) ring-white" : ""}`}
                                    style={{ backgroundColor: c.hex }}
                                >
                                    {watchColor === c.key && <Check size={16} className="text-black" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <p className="font-tree text-sm font-semibold text-white">Serviços que este profissional realiza</p>
                        <div className="flex flex-col gap-y-1.5">
                            {services.map(svs => {
                                const checked = watchServiceIds.includes(svs.id!)
                                return (
                                    <button
                                        key={svs.id}
                                        type="button"
                                        onClick={() => {
                                            const next = checked
                                                ? watchServiceIds.filter(id => id !== svs.id)
                                                : [...watchServiceIds, svs.id!]
                                            form.setValue("serviceIds", next, { shouldValidate: true })
                                        }}
                                        className={`flex items-center gap-x-2.5 px-3 py-2 rounded-md text-left transition-colors ${checked ? "bg-(--agenrap-purple-500)/25 border border-(--agenrap-purple-500)/60" : "bg-white/5 border border-transparent hover:bg-white/10"}`}
                                    >
                                        <div className={`w-4 h-4 rounded shrink-0 flex items-center justify-center ${checked ? "bg-(--agenrap-purple-500)" : "bg-white/20"}`}>
                                            {checked && <Check size={11} className="text-white" />}
                                        </div>
                                        <span className="font-tree text-sm text-white">{svs.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                        {form.formState.errors.serviceIds && (
                            <span className="text-xs text-red-300">{form.formState.errors.serviceIds.message}</span>
                        )}
                    </div>

                    <AgenrapButton type="submit" variant="purplerap" disabled={!form.formState.isValid} className={`${!form.formState.isValid ? "cursor-not-allowed opacity-50" : ""} flex justify-center w-full items-center mt-2`}>
                        {isPending
                            ? <div className="flex relative">
                                <Image src={macroLogo} alt="" className="w-8 h-8 opacity-15 animate-pulse" />
                                <LoaderCircle className="animate-spin absolute w-8 h-8" color="#F5E6CC" />
                            </div>
                            : <p>{editingProfessional ? "Salvar alterações" : "Cadastrar profissional"}</p>
                        }
                    </AgenrapButton>
                </div>
            </form>
        </Form>
    )
}