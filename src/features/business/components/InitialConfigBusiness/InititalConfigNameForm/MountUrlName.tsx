import AgenrapInput from "@/src/shared/components/agenrap-ui/input/AgenrapInput";
import { FormControl, FormField, FormItem, FormMessage } from "@/src/shared/components/ui/form";
import { InitialBusinessNameSchema } from "@/src/shared/types/Business/InitialBuinessNameSchema";
import { BriefcaseBusinessIcon, ContactRound } from "lucide-react";
import { UseFormReturn } from "react-hook-form";


export default function MountUrlName({ control, watch }: { control: any, watch: any }) {
    const name = watch(`business.name`)
    return (
        <div className="flex flex-col lg:w-[35%] md:w-[55%] w-[90%] my-2">
            <div className="flex flex-col gap-2">
                <h1 className=" lg:text-4xl md:text-2xl text-xl text-center  font-tree font-bold my-8">Vamos configurar seu ambiente</h1>
                <div className="flex flex-col">
                    <p className=" font-tree font-medium md:text-xl text-lg ">1. Fornecer o nome do local</p>
                    <div className="flex gap-1 mt-2  h-full w-full">
                        <span className="flex min-h-max w-1.5 bg-(--agenrap-yellow-500)"></span>
                        <div className="flex flex-col ">
                            <p className="font-tree md:text-sm text-xs">O nome fornecido será o nome  que vamos utlizar para montar o</p>
                            <p className="font-tree md:text-sm text-xs">link que seus clientes poderão acessar</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">

                <FormField
                    control={control}
                    name={`business.name`}
                    render={({ field }) => (
                        <FormItem className="">
                            <FormControl>
                                <AgenrapInput
                                    {...field}
                                    id="rap-full-name"
                                    label="Nome"
                                    variant="brownrap"
                                    autoComplete="off"
                                    placeholder="nome do seu negócio ex:salao-agenrap"
                                    icon={<BriefcaseBusinessIcon size={25} />}
                                    left={true}
                                    value={"@" + (field.value?.replace(/^@/, "") ?? "")}
                                    onChange={(e) => {
                                        const raw = e.target.value
                                            .replace(/^@/, "")
                                            .replace(/\s+/g, "-")
                                            .replace(/[^a-zA-Z0-9-]/g, "")
                                        field.onChange("@" + raw)
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

            </div>

            <div className="flex gap-1 py-1 h-full items-center min-w-0">
                <span className="flex  h-2.5 w-2.5 rounded-full bg-(--agenrap-blue-500)"></span>
                <p className="font-tree font-semi-bold text-sm shrink-0">Link</p>
                <p className="font-tree font-semi-bold text-sm truncate  min-w-0">
                    http://localhost:8080/{name}
                </p>
            </div>
        </div>
    )
}