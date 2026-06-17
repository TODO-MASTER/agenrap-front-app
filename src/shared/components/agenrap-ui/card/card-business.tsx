export type BusinessCardProps = {
    name: string;
    atSign?: string;
    init: string;
    end: string;
    qtdService: number;
    isOpenToday?: boolean;
    statusMessage?: string;
}

export default function CardBusiness({
    name,
    atSign,
    init,
    end,
    qtdService,
    isOpenToday,
    statusMessage
}: BusinessCardProps) {

    return (
        <div className="flex flex-col w-full relative bg-(--agenrap-gray-800) overflow-hidden">
            <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
                <div className="flex flex-col min-w-0">
                    <p className="font-tree lg:text-2xl md:text-xl text-xl break-words text-white italic leading-tight">
                        {name}
                    </p>
                    {atSign && (
                        <p className="font-tree text-sm text-(--agenrap-purple-500) mt-0.5">
                            {atSign}
                        </p>
                    )}
                </div>

                <span
                    className={`font-tree text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 mt-1 ${
                        isOpenToday
                            ? "bg-(--agenrap-yellow-200)/15 text-(--agenrap-yellow-200)"
                            : "bg-(--agenrap-purple-500)/20 text-(--agenrap-purple-500)"
                    }`}
                >
                    {isOpenToday ? "Aberto" : "Fechado"}
                </span>
            </div>

            <div
                className={`flex flex-col justify-center px-6 py-6 rounded-tl-[3rem] ${
                    isOpenToday ? "bg-(--agenrap-yellow-200)" : "bg-(--agenrap-brown-200)"
                }`}
            >
                <p className="font-tree text-(--agenrap-gray-800) font-bold text-2xl md:text-3xl">
                    {isOpenToday ? `${init} às ${end}` : "Fechado hoje"}
                </p>
                <p className="font-tree text-(--agenrap-gray-800)/70 text-sm mt-1">
                    {isOpenToday
                        ? `${qtdService} ${qtdService === 1 ? "serviço disponível" : "serviços disponíveis"}`
                        : (statusMessage ?? "Não trabalhamos hoje")}
                </p>
            </div>
        </div>
    )
}