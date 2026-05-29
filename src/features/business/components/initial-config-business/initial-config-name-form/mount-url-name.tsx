import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { FormControl, FormField, FormItem} from "@/src/shared/components/ui/form";
import { formatPublicHandle, normalizePublicHandle } from "@/src/shared/utils/formatters.utils";
import { BriefcaseBusinessIcon } from "lucide-react";


export default function MountUrlName({ control, watch }: { control: any, watch: any }) {
    const atSign = watch('business.atSign')

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
                        <div className="flex flex-col">
                            <p className="font-tree md:text-sm text-xs">
                                O arroba será o link público do seu negócio. O nome será exibido para seus clientes.
                            </p>
                        </div>
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

<FormField
  control={control}
  name="business.atSign"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <AgenrapInput
          {...field}
          id="business-at-sign"
          label="Arroba (link público)"
          variant="brownrap"
          autoComplete="off"
          placeholder="ex: salao-agenrap"
          icon={
            <BriefcaseBusinessIcon size={25} />
          }
          left
          value={normalizePublicHandle(
            field.value
          )}
          onChange={(e) => {
            field.onChange(
              normalizePublicHandle(
                e.target.value
              )
            )
          }}
        />
      </FormControl>
    </FormItem>
  )}
/>
            </div>

            <div className="flex gap-1 py-1 h-full items-center min-w-0">
                <span className="flex h-2.5 w-2.5 rounded-full bg-(--agenrap-blue-500)"></span>
                <p className="font-tree font-semi-bold text-sm shrink-0">Link</p>
<p className="font-tree font-semi-bold text-sm truncate min-w-0">
  http://localhost:8080/
  {formatPublicHandle(atSign)}
</p>
            </div>
        </div>
    )
}