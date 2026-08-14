

export type BusinessCardProps = {
    name: string;
    atSign?: string;
    init: string;
    end: string;
    qtdService: number;
    isOpenToday?: boolean;
    statusMessage?: string;
    linkJoin:React.ReactNode
}

export default function CardBusiness({
    name,
    atSign,
    init,
    end,
    qtdService,
    isOpenToday,
    statusMessage,
    linkJoin
}: BusinessCardProps) {

    return (
        <div className="flex flex-col w-full rounded-md relative bg-(--agenrap-gray-800) overflow-hidden shadow-lg shadow-black/10">
            <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
                <div className="flex flex-col min-w-0 gap-y-0.5">
                    <p className="font-tree lg:text-2xl md:text-xl text-xl break-words text-white italic leading-tight">
                        {name}
                    </p>
                    {atSign && (
                        <p className="font-tree text-sm text-(--agenrap-purple-500)">
                            {atSign}
                        </p>
                    )}
                </div>

                <span
                    className={`font-tree text-[11px] font-semibold px-2.5 py-1 whitespace-nowrap shrink-0 mt-1 border ${
                        isOpenToday
                            ? "border-(--agenrap-yellow-200)/40 text-(--agenrap-yellow-200)"
                            : "border-(--agenrap-purple-500)/40 text-(--agenrap-purple-500)"
                    }`}
                >
                    {isOpenToday ? "ABERTO" : "FECHADO"}
                </span>
            </div>

            <div className=" w-full   p-2 flex flex-col gap-y-2 " >

            <div
                className={`flex flex-col justify-center px-6 py-7  rounded-md relative ${
                    isOpenToday ? "bg-(--agenrap-yellow-200)" : "bg-(--agenrap-brown-200)"
                }`}
            >
                <div className="absolute top-3 right-4 flex gap-1">
                    <span className="h-1 w-1 rounded-full bg-(--agenrap-gray-800)/20" />
                    <span className="h-1 w-1 rounded-full bg-(--agenrap-gray-800)/20" />
                    <span className="h-1 w-1 rounded-full bg-(--agenrap-gray-800)/20" />
                </div>
                <p className="font-tree text-(--agenrap-gray-800) font-bold text-2xl md:text-3xl">
                    {isOpenToday ? `${init} às ${end}` : "Fechado hoje"}
                </p>
                <p className="font-tree text-(--agenrap-gray-800)/70 text-sm mt-1">
                    {isOpenToday
                        ? `${qtdService} ${qtdService === 1 ? "serviço disponível" : "serviços disponíveis"}`
                        : (statusMessage ?? "Não trabalhamos hoje")}
                </p>
            </div>
                {linkJoin}
                </div>
        </div>
    )
}