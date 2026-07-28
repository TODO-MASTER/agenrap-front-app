import { environments } from "@/src/environments/environments";
import { useAtSignSuggestions } from "@/src/features/business/hooks/use-atsign-sugestions";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { FormControl, FormField, FormItem} from "@/src/shared/components/ui/form";
import { formatPublicHandle, normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
import { BriefcaseBusinessIcon, Sparkle } from "lucide-react";


export default function MountUrlName({ control, watch, setValue }: { control: any, watch: any, setValue: any }) {
    const name = watch('business.name')
    const selectedAtSign = watch('business.atSign')
    const { suggestions, isLoading } = useAtSignSuggestions(name)

    return (
        <div className="flex flex-col lg:w-[35%] md:w-[55%] w-[90%] my-2">
            <div className="flex flex-col gap-2">
                <h1 className="lg:text-4xl md:text-2xl text-xl text-center font-tree font-bold my-8">
                    Vamos configurar seu ambiente
                </h1>
                <div className="flex flex-col">
                    <p className="font-tree font-medium md:text-xl text-lg">1. Fornecer o nome do local</p>
                    <div className="flex gap-1 mt-2 h-full w-full">
                        <span className="flex min-h-max w-1.5 bg-(--agenrap-yellow-500)"></span>
                        <p className="font-tree md:text-sm text-xs">
                            O sistema vai gerar seu link público automaticamente.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
                <FormField
                    control={control}
                    name="business.name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    {...field}
                                    id="business-name"
                                    label="Nome do negócio"
                                    variant="brownrap"
                                    autoComplete="off"
                                    placeholder="Ex: Salão Agenrap"
                                    icon={<BriefcaseBusinessIcon size={25} />}
                                    left
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {name?.trim().length >= 2 && (
                    <div className="flex flex-col gap-2">
                        <p className="font-tree text-sm">Escolha seu link:</p>
                        {isLoading ? (
                            <p className="font-tree text-xs opacity-60">Gerando sugestões...</p>
                        ) : (
                            <div className="flex flex-col gap-1.5">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setValue('business.atSign', s, { shouldValidate: true })}
                                        className={`text-left px-3 py-2 rounded border font-tree text-sm transition-colors ${
                                            selectedAtSign === s
                                                ? "border-(--agenrap-purple-500) bg-(--agenrap-purple-500)/10"
                                                : "border-black border bg-(--agenrap-yellow-200)/25"
                                        }`}
                                    >
                                      <div className="w-full flex items-center  justify-between">
                                        <p>{formatPublicHandle(s)}</p>
                                        <Sparkle size={15}/>
                                      </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-1 py-1 h-full items-center min-w-0">
                <span className="flex h-2.5 w-2.5 rounded-full bg-(--agenrap-blue-500)"></span>
                <p className="font-tree font-semi-bold text-sm shrink-0">Link</p>
                <p className="font-tree font-semi-bold text-sm truncate min-w-0">
                    {process.env.NEXT_PUBLIC_APP_URL}/{formatPublicHandle(selectedAtSign || suggestions[0] || "")}
                </p>
            </div>
        </div>
    )
}