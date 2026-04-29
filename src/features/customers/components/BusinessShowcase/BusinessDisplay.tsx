'use client'
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import CardBusiness from "@/src/shared/components/agenrap-ui/card/CardBusiness";
import { useBusinessStore } from "@/src/shared/store/useBusinessStore";
import { IBusinessCtx } from "@/src/shared/types/Business/IBusinessCtx";

export default function BusinessDisplay({ business }: { business: IBusinessCtx[] }) {

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