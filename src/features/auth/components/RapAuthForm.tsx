"use client"

import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/AgenrapInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod'
export default function RapAuthForm() {

    const formSchema = z.object({
        todoName: z.string().min(2, {
            message: "*Deve contêr pelo menos 2 letras.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            todoName: "",

        },
          mode: "onChange"
    });
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(() => console.log(form.getValues("todoName")))}
                className="flex flex-col gap-6  "
            >
                <FormField
                    control={form.control}
                    name="todoName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    id="rap-full-name"
                                    label="Nome completo"
                                    variant="brownrap"
                                    autoComplete="off"
                                    placeholder="Digite seu nome completo"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid}  className={!form.formState.isValid?`cursor-not-allowed`:""}>
                    Criar conta
                </AgenrapButton>
            </form>
        </Form>
    )
}