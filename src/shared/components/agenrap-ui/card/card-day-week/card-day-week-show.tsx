import { translateDayName } from "@/src/shared/utils/time.utils"

interface ICardDayWeekShowProps {
    name: string
    initial: string
    end: string
}

export function CardDayWeekShow({ name, initial, end }: ICardDayWeekShowProps) {
    return (
        <div className="flex flex-col w-full bg-(--agenrap-gray-800) rounded-md overflow-hidden border-l-4 border-(--agenrap-yellow-200)">
            <div className="px-4 pt-4 pb-1">
                <p className="text-(--agenrap-yellow-200) font-tree text-xl font-semibold">
                    {translateDayName(name)}
                </p>
            </div>
            <div className="flex items-center gap-x-2 px-4 pb-4 mt-2">
                <div className="flex flex-col">
                    <span className="text-white/40 text-xs font-tree uppercase tracking-wide">Início</span>
                    <span className="text-white font-semibold font-tree text-base">{initial.slice(0, 5)}</span>
                </div>
                <span className="text-white/30 mt-3">→</span>
                <div className="flex flex-col">
                    <span className="text-white/40 text-xs font-tree uppercase tracking-wide">Fim</span>
                    <span className="text-white font-semibold font-tree text-base">{end.slice(0, 5)}</span>
                </div>
            </div>
        </div>
    )
}