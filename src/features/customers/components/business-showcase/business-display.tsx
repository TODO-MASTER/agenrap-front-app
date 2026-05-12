'use client'
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import CardBusiness from "@/src/shared/components/agenrap-ui/card/card-business";
import { BusinessCtx } from "@/src/shared/types";


export default function BusinessDisplay({ business }: { business: BusinessCtx[] }) {

    return (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  gap-8 ">

            {business!.map(bs => (
                <div className="flex flex-col" key={bs.id}>
                    <CardBusiness name={bs.mnrName!}  init={bs.weeks[0]?.initial?.slice(0,5)??""} end={bs.weeks[0]?.end?.slice(0,5)??""} qtdService={bs.qtdServices!} />
                    <AgenrapLinkButton hrefLink={`/${bs.name}`}>
                        Ver serviços
                    </AgenrapLinkButton>
                </div>
            ))
            
        }
        </div>


       
    )
}