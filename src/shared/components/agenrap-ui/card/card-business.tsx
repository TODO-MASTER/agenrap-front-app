export type BusinessCardProps={
    name:string,
    init:string,
    end:string,
    qtdService:number
}

export default function CardBusiness({ name, init, end, qtdService }: BusinessCardProps) {
    return (
        <div className="w-full min-h-50 h-fit flex  bg-(--agenrap-brown-500) px-4">
            <div className="w-full flex-col bg-(--agenrap-brown-500) ">
                <p className="font-tree  px-1  py-2 text-white text-2xl italic">Agenda do {name}</p>
                <div className="w-full">
                    <div className="flex w-[95%] rounded-md bg-(--agenrap-purple-500)/15 relative z-0 md:mb-8 mb-4 h-fit">
                        
                            <div className="bg-(--agenrap-brown-500)/80 p-2   rounded-br-[15px] rounded-tl-[15px] flex flex-col gap-1 w-full h-full min-h-22">
                                <div className="rounded-md bg-(--agenrap-gray-800) w-[95%] flex h-fit p-2">
                                    <p className="font-tree text-white font-medium text-sm">{init&&end?`Hoje funcionamos das ${init} até as ${end}`:"Não trabalhamos hoje"} </p>
                                </div>
                                <div className="rounded-md bg-(--agenrap-gray-800) w-[95%] flex h-fit p-2">
                                    <p className="font-tree text-white font-medium text-sm">Serviços totais: {qtdService}</p>

                                </div>
                            </div>
                        

                    </div>
                </div>
            </div>
            <div className="min-h-full w-2.25 bg-(--agenrap-yellow-200) flex"></div>
        </div>
    )
}