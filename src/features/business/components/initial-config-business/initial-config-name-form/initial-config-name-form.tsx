"use client"
import { macroLogo } from "@/src/assets/images";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import { Form } from "@/src/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { useBusinessActions } from "../../../hooks/use-business-actions";
import MountUrlName from "./mount-url-name";
import { initialBusinessNameSchema, InitialBusinessNameSchema } from "@/src/features/business/schemas";
export default function InitialConfigNameForm() {
    const { handleCreateBusinessAction, isPending } = useBusinessActions()
    const form = useForm<InitialBusinessNameSchema>({

        resolver: zodResolver(initialBusinessNameSchema),
        defaultValues: {
            business: {
                name: ""
            },



        },
        mode: "onChange"
    });



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => handleCreateBusinessAction(values))}
                className="flex flex-col gap-y-2    items-center  "
            >
                <div className="w-full h-full flex flex-col items-center">
                    <MountUrlName control={form.control} watch={form.watch}/>
                </div>
                <div className="flex flex-col items-start lg:w-[35%] md:w-[55%] w-[90%] ">
                    <AgenrapButton type="submit" variant={"purplerap"} disabled={!form.formState.isValid} className={`${!form.formState.isValid ? `cursor-not-allowed` : ""} flex justify-center w-full items-center`}>
                        {isPending ? <div className="flex relative" >
                            <Image src={macroLogo} alt="" className="w-10 h-10 opacity-15 animate-pulse" />
                            <LoaderCircle className="animate-spin absolute w-10 h-10" color="#F5E6CC" />

                        </div> : <p className="flex items-center gap-1"><Link width={25} height={25} /> Salvar Link</p>}
                    </AgenrapButton>
                </div>
            </form>
        </Form>



    )
}