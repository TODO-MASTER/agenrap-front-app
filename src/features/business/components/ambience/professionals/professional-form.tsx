'use client'

import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form"
import { professionalSchema, ProfessionalSchema } from "@/src/features/business/schemas/professional.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button"
import { LoaderCircle, Check, Sparkles, Phone, Mail, ShieldCheck, Crown, CalendarClock, BadgePlus, X } from "lucide-react"
import Image from "next/image"
import { macroLogo } from "@/src/assets/images"
import { PROFESSIONAL_AVATAR_COLORS } from "@/src/shared/utils/professional-colors.utils"
import { Service } from "@/src/features/business/types"
import { useTransition, useMemo, useState } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CreateProfessionalService,
  EditProfessionalService,
} from "@/src/features/business/services/professional.service"
import { Professional } from "@/src/features/business/types/professional.types"
import ProfessionalAvatar from "@/src/shared/components/professional-avatar"
import { Badge } from "@/src/shared/components/ui/badge"
import { maskPhone } from "@/src/shared/utils/formatters.utils"
import { PERMISSION_GROUPS, togglePermissionCode } from "@/src/shared/lib/profissional-constraints"
import { translateDayName } from "@/src/shared/utils/time.utils"

type Props = {
  services: Service[]
  editingProfessional?: Professional | null
  onSuccess?: () => void
}

const WEEK_OPTIONS = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"] as const

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: "", lastName: "" }
  if (parts.length === 1) return { firstName: parts[0], lastName: "" }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

export default function ProfessionalForm({ services, editingProfessional, onSuccess }: Props) {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const router = useRouter()
  const atSign = searchParams.get("rap")

  const isManagerProfile = editingProfessional?.isManagerProfile ?? false
  const isCreating = !editingProfessional

  const split = useMemo(
    () => splitName(editingProfessional?.name ?? ""),
    [editingProfessional?.name]
  )

  const [phoneDisplay, setPhoneDisplay] = useState(
    editingProfessional?.telephone ? maskPhone(editingProfessional.telephone) : ""
  )

  const form = useForm<ProfessionalSchema>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      firstName: split.firstName,
      lastName: split.lastName,
      telephone: editingProfessional?.telephone ?? "",
      email: editingProfessional?.email ?? "",
      avatarColor: editingProfessional?.avatarColor ?? "plum",
      serviceIds: editingProfessional?.serviceIds ?? [],
      permissionCodes: editingProfessional?.permissionCodes ?? [],
      weeks: [],
    },
    mode: "onChange",
  })

  const { fields: weekFields, append: appendWeek, remove: removeWeek } = useFieldArray({
    control: form.control,
    name: "weeks",
  })

  const watchColor = form.watch("avatarColor")
  const watchFirst = form.watch("firstName")
  const watchLast = form.watch("lastName")
  const watchServiceIds = form.watch("serviceIds")
  const watchPermissions = form.watch("permissionCodes") ?? []
  const watchWeeks = form.watch("weeks") ?? []
  const previewName = `${watchFirst || ""} ${watchLast || ""}`.trim() || "Novo profissional"

  const usedWeekDays = new Set(watchWeeks.map((w) => w.week))
  const availableWeekDays = WEEK_OPTIONS.filter((w) => !usedWeekDays.has(w))

  const onSubmit = (values: ProfessionalSchema) => {
    startTransition(async () => {
      try {
        if (!atSign) {
          toast.error("Negócio não identificado!")
          return
        }
        const payload = {
          name: `${values.firstName} ${values.lastName}`.trim(),
          telephone: values.telephone?.replace(/\D/g, "") || null,
          email: values.email?.trim() ? values.email.trim().toLowerCase() : null,
          avatarColor: values.avatarColor,
          serviceIds: values.serviceIds,
          permissionCodes: isManagerProfile ? [] : values.permissionCodes ?? [],
          ...(isCreating && values.weeks.length > 0
            ? { weeks: values.weeks }
            : {}),
        }
        const data = editingProfessional
          ? await EditProfessionalService(editingProfessional.id, payload)
          : await CreateProfessionalService(payload, atSign)
        if (data.data == null) {
          toast.error(data.message || "Algo deu errado!")
        } else {
          toast.success(
            data.message || (editingProfessional ? "Profissional atualizado!" : "Profissional cadastrado!")
          )
          onSuccess?.()
          router.refresh()
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Erro ao salvar profissional")
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
          {/* Coluna esquerda: identidade */}
          <div className="lg:w-[38%] w-full bg-(--agenrap-gray-800) flex flex-col">
            <div className="relative px-6 pt-8 pb-6 flex flex-col items-center gap-3">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, ${
                    PROFESSIONAL_AVATAR_COLORS.find((c) => c.key === watchColor)?.hex ?? "#7C5CBF"
                  }55, transparent 60%)`,
                }}
              />
              <div className="relative flex flex-col items-center gap-3">
                <ProfessionalAvatar name={previewName} color={watchColor} size="xl" showRing />
                <div className="text-center">
                  <p className="font-tree font-bold text-white text-xl tracking-tight">{previewName}</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    {isManagerProfile && (
                      <span className="flex items-center gap-1 text-(--agenrap-yellow-200) text-[10px] font-tree font-bold uppercase tracking-wide bg-(--agenrap-yellow-200)/10 px-2 py-0.5 rounded-full">
                        <Crown size={10} />
                        Dono da casa
                      </span>
                    )}
                    {!isManagerProfile && (
                      <p className="font-tree text-white/50 text-xs">
                        {editingProfessional ? "Editando profissional" : "Novo membro da equipe"}
                      </p>
                    )}
                  </div>
                  {editingProfessional?.isLinked && (
                    <p className="font-tree text-(--agenrap-yellow-200) text-xs mt-1">Conta vinculada</p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex flex-col gap-4 relative z-10">
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
                          placeholder="Ex. Ana"
                          autoComplete="off"
                          removeFormMessage
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
                          placeholder="Ex. Silva"
                          autoComplete="off"
                          removeFormMessage
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AgenrapInput
                        id="email"
                        type="email"
                        label="E-mail de acesso"
                        variant="cyberYellowRap"
                        removeFormMessage
                        labelIcon={
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 leading-4 border-white/20 text-white/70">
                            convite
                          </Badge>
                        }
                        autoComplete="off"
                        left
                        icon={<Mail size={18} />}
                        placeholder="ana@email.com"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <p className="font-tree text-[11px] text-white/40 mt-1">
                      Quando essa pessoa criar conta / logar com este e-mail, entra na equipe.
                    </p>
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
                        variant="cyberYellowRap"
                        removeFormMessage
                        labelIcon={
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 leading-4 border-white/20 text-white/70">
                            opcional
                          </Badge>
                        }
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

              <div className="flex flex-col gap-2.5">
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
                        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
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

          {/* Coluna direita: serviços + permissões + expediente */}
          <div className="lg:w-[62%] w-full bg-(--agenrap-brown-200) flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2.5">
              <p className="font-tree text-sm font-semibold text-black/80">Serviços que realiza</p>
              {services.length === 0 ? (
                <p className="font-tree text-xs text-black/45 py-2">
                  Cadastre serviços na casa antes de vincular
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((svs) => {
                    const checked = watchServiceIds.includes(svs.id!)
                    return (
                      <button
                        key={svs.id}
                        type="button"
                        onClick={() => {
                          const next = checked
                            ? watchServiceIds.filter((id) => id !== svs.id)
                            : [...watchServiceIds, svs.id!]
                          form.setValue("serviceIds", next, { shouldValidate: true })
                        }}
                        className={`flex items-center gap-x-2.5 px-3 py-3 rounded-xl text-left transition-colors border ${
                          checked
                            ? "bg-(--agenrap-purple-500)/15 border-(--agenrap-purple-500)/50"
                            : "bg-white/50 border-transparent hover:bg-white/80"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded shrink-0 flex items-center justify-center ${
                            checked ? "bg-(--agenrap-purple-500)" : "bg-black/15"
                          }`}
                        >
                          {checked && <Check size={11} className="text-white" />}
                        </div>
                        <span className="font-tree text-sm text-black/90 truncate">{svs.name}</span>
                      </button>
                    )
                  })}
                </div>
              )}
              {form.formState.errors.serviceIds && (
                <span className="text-xs text-red-500 font-tree">
                  {form.formState.errors.serviceIds.message}
                </span>
              )}
            </div>

            {isCreating && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <CalendarClock size={15} className="text-(--agenrap-brown-500)" />
                  <div>
                    <p className="font-tree text-sm font-semibold text-black/80">Expediente inicial</p>
                    <p className="font-tree text-xs text-black/45">
                      Opcional. Se não configurar, ele nasce com a jornada atual da casa — você pode ajustar depois na aba Expediente.
                    </p>
                  </div>
                </div>

                {weekFields.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {weekFields.map((wk, index) => (
                      <div key={wk.id} className="flex items-center gap-2 bg-white/50 rounded-xl px-3 py-2.5">
                        <span className="font-tree text-sm font-semibold text-black/80 w-10 shrink-0">
                          {translateDayName(watchWeeks[index]?.week ?? "")}
                        </span>
                        <FormField
                          control={form.control}
                          name={`weeks.${index}.initial`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <input
                                  type="time"
                                  {...field}
                                  className="w-full bg-white rounded-md px-2 py-1.5 font-tree text-sm outline-none border border-black/10"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <span className="text-black/30 text-xs">→</span>
                        <FormField
                          control={form.control}
                          name={`weeks.${index}.end`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <input
                                  type="time"
                                  {...field}
                                  className="w-full bg-white rounded-md px-2 py-1.5 font-tree text-sm outline-none border border-black/10"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => removeWeek(index)}
                          className="p-1.5 rounded-md hover:bg-black/5 shrink-0"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    {form.formState.errors.weeks && (
                      <span className="text-xs text-red-500 font-tree">
                        Verifique os horários informados
                      </span>
                    )}
                  </div>
                )}

                {availableWeekDays.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {availableWeekDays.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => appendWeek({ week: w, initial: "08:00", end: "18:00" })}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-tree font-semibold bg-black/5 text-black/60 hover:bg-black/10 transition-colors"
                      >
                        <BadgePlus size={12} />
                        {translateDayName(w)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isManagerProfile ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-(--agenrap-brown-500)" />
                  <div>
                    <p className="font-tree text-sm font-semibold text-black/80">Permissões na casa</p>
                    <p className="font-tree text-xs text-black/45">
                      Expediente e bloqueios dele são sempre dele. Abaixo é o que ele pode fazer na casa.
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PERMISSION_GROUPS.map((g) => (
                    <div
                      key={g.group}
                      className="rounded-xl border border-(--agenrap-brown-500)/15 p-3 bg-white/50"
                    >
                      <p className="font-tree text-sm font-semibold text-black mb-2">{g.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {g.items.map((item) => {
                          const on = watchPermissions.includes(item.code)
                          return (
                            <button
                              key={item.code}
                              type="button"
                              onClick={() =>
                                form.setValue(
                                  "permissionCodes",
                                  togglePermissionCode(watchPermissions, item.code),
                                  { shouldDirty: true }
                                )
                              }
                              className={`px-3 py-1.5 rounded-md text-xs font-tree font-semibold transition-colors ${
                                on
                                  ? "bg-(--agenrap-purple-500) text-white"
                                  : "bg-black/5 text-black/60 hover:bg-black/10"
                              }`}
                            >
                              {item.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 rounded-xl border border-(--agenrap-yellow-500)/25 bg-(--agenrap-yellow-200)/20 px-4 py-3">
                <Crown size={16} className="text-(--agenrap-brown-500) shrink-0" />
                <p className="font-tree text-xs text-black/60">
                  Você é o dono da casa e já tem acesso total — não é necessário configurar permissões.
                </p>
              </div>
            )}

            <AgenrapButton
              type="submit"
              variant="purplerap"
              disabled={!form.formState.isValid || isPending}
              className={`${
                !form.formState.isValid || isPending ? "cursor-not-allowed opacity-50" : ""
              } flex justify-center w-full items-center mt-1 h-auto py-3.5 text-base`}
            >
              {isPending ? (
                <div className="flex relative">
                  <Image src={macroLogo} alt="" className="w-8 h-8 opacity-15 animate-pulse" />
                  <LoaderCircle className="animate-spin absolute w-8 h-8" color="#F5E6CC" />
                </div>
              ) : (
                <p>{editingProfessional ? "Salvar alterações" : "Cadastrar profissional"}</p>
              )}
            </AgenrapButton>
          </div>
        </div>
      </form>
    </Form>
  )
}