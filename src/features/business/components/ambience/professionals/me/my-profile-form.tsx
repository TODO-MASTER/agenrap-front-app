'use client'

import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { LoaderCircle, Sparkles, Phone, User } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { PROFESSIONAL_AVATAR_COLORS } from "@/src/shared/utils/professional-colors.utils"
import { useTransition, useMemo, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { UpdateMyProfessionalProfile } from "@/src/features/business/services/professional.service"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import { selfEditProfessionalSchema, SelfEditProfessionalSchema } from "@/src/features/business/schemas/professional.schema"

type Props = {
  professionalId: number
  name: string
  telephone?: string | null
  avatarColor?: string | null
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: "", lastName: "" }
  if (parts.length === 1) return { firstName: parts[0], lastName: "" }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

export default function MyProfileForm({ professionalId, name, telephone, avatarColor }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const split = useMemo(() => splitName(name), [name])
  const [phoneDisplay, setPhoneDisplay] = useState(telephone ? maskPhone(telephone) : "")

  const form = useForm<SelfEditProfessionalSchema>({
    resolver: zodResolver(selfEditProfessionalSchema),
    defaultValues: {
      firstName: split.firstName,
      lastName: split.lastName,
      telephone: telephone ?? "",
      avatarColor: avatarColor ?? "plum",
    },
    mode: "onChange",
  })

  const watchColor = form.watch("avatarColor")
  const watchFirst = form.watch("firstName")
  const watchLast = form.watch("lastName")
  const previewName = `${watchFirst || ""} ${watchLast || ""}`.trim() || "Você"

  const onSubmit = (values: SelfEditProfessionalSchema) => {
    startTransition(async () => {
      try {
        const payload = {
          name: `${values.firstName} ${values.lastName}`.trim(),
          telephone: values.telephone?.replace(/\D/g, "") || null,
          avatarColor: values.avatarColor,
        }
        const data = await UpdateMyProfessionalProfile(professionalId, payload)
        if (data.data == null) {
          toast.error(data.message || "Algo deu errado!")
        } else {
          toast.success(data.message || "Perfil atualizado!")
          router.refresh()
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Erro ao salvar perfil")
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full rounded-xl overflow-hidden border border-(--agenrap-brown-500)/15 shadow-lg shadow-black/5"
      >
        <div className="flex flex-col lg:flex-row w-full">
          {/* Coluna esquerda: identidade visual */}
          <div className="lg:w-[34%] w-full bg-(--agenrap-gray-800) flex flex-col items-center justify-center gap-4 px-6 py-10 relative">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${
                  PROFESSIONAL_AVATAR_COLORS.find((c) => c.key === watchColor)?.hex ?? "#7C5CBF"
                }55, transparent 60%)`,
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <ProfessionalAvatar name={previewName} color={watchColor} size="xl" showRing />
              <p className="font-tree font-bold text-white text-xl tracking-tight text-center">{previewName}</p>

              <div className="flex flex-col items-center gap-2.5 w-full">
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-(--agenrap-yellow-200)" />
                  <p className="font-tree text-xs font-semibold text-white/70 uppercase tracking-wide">
                    Identidade visual
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {PROFESSIONAL_AVATAR_COLORS.map((c) => {
                    const active = watchColor === c.key
                    return (
                      <button
                        key={c.key}
                        type="button"
                        title={c.label}
                        onClick={() =>
                          form.setValue("avatarColor", c.key, { shouldValidate: true, shouldDirty: true })
                        }
                        className={`flex items-center justify-center p-1.5 rounded-lg transition-all ${
                          active ? "bg-white/10 ring-1 ring-white/20" : "hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full transition-transform ${
                            active ? "scale-110 ring-2 ring-offset-2 ring-offset-(--agenrap-gray-800) ring-white/30" : ""
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita: dados */}
                  <div className="lg:w-[66%] w-full bg-(--agenrap-brown-200) flex flex-col p-8">
            <div className="flex items-center gap-2 mb-6">
              <User size={15} className="text-(--agenrap-brown-500)" />
              <p className="font-tree text-sm font-semibold text-black/80">Seus dados</p>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AgenrapInput
                          id="firstName"
                          label="Nome"
                          variant="brownrap"
                          placeholder="Ex. Ana"
                          autoComplete="off"
                          removeFormMessage
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.firstName && (
                        <p className="text-xs text-red-500 font-tree mt-0.5">
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
                    <FormItem>
                      <FormControl>
                        <AgenrapInput
                          id="lastName"
                          label="Sobrenome"
                          variant="brownrap"
                          placeholder="Ex. Silva"
                          autoComplete="off"
                          removeFormMessage
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.lastName && (
                        <p className="text-xs text-red-500 font-tree mt-0.5">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
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
                          autoComplete="off"
                          value={phoneDisplay}
                          left
                          icon={<Phone size={18} />}
                          onChange={(e) => {
                            const masked = maskPhone(e.target.value)
                            setPhoneDisplay(masked)
                            form.setValue("telephone", masked.replace(/\D/g, ""), {
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
                <div className="flex items-center rounded-lg border border-(--agenrap-brown-500)/15 bg-white/40 px-4 py-3">
                  <p className="font-tree text-xs text-black/45 leading-snug">
                    Seu nome e telefone aparecem para o dono e para clientes ao agendar com você.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 mt-6 border-t border-(--agenrap-brown-500)/15">
              <AgenrapButton
                type="submit"
                variant="purplerap"
                disabled={!form.formState.isValid || isPending}
                className={`${
                  !form.formState.isValid || isPending ? "cursor-not-allowed opacity-50" : ""
                } flex justify-center sm:w-auto w-full px-10 items-center h-auto py-3.5 text-base`}
              >
                {isPending ? (
                  <div className="flex relative">
                    <Image src={macroLogo} alt="" className="w-7 h-7 opacity-15 animate-pulse" />
                    <LoaderCircle className="animate-spin absolute w-7 h-7" color="#F5E6CC" />
                  </div>
                ) : (
                  <p>Salvar alterações</p>
                )}
              </AgenrapButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}