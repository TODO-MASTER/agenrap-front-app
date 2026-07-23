'use client'
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import CardServiceMax from "@/src/shared/components/agenrap-ui/card/card-service-max";
import { currencyUtils } from "@/src/shared/utils/currency.utils";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import { redirect } from "next/navigation";
import Link from "next/link";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";

export default function ServicesDisplay({ rap }: { rap: string }) {
    const business = useBusinessStore(bsnCtx => bsnCtx.business)
    return (
        <>
            
            <div className="bg-(--agenrap-yellow-200)/5 p-4   no-scrollbar  rounded-md w-full  py-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 gap-x-10    ">

                {business?.services.map((oc, index) => (
                    <div key={index} className="flex flex-col ">
                        <CardServiceMax name={oc.name} duration={oc.duration} value={currencyUtils.fromCents(oc.value, "BRL")} />
                        <AgenrapLinkButton hrefLink={`/${rap}/schedule?svs=${oc.id}`}>
                            Agendamento
                        </AgenrapLinkButton>
                    </div>
                ))

                }
            </div>
        </>
    )
}