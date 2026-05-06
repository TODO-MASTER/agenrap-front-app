import { translateDayName } from "@/src/shared/utils/timeUtils"

interface ICardDayWeekShowProps {
    name: string
    initial: string
    end: string
}

export function CardDayWeekShow({ name, initial, end }: ICardDayWeekShowProps) {
    return (
        <div className="flex flex-col w-full bg-(--agenrap-gray-800) rounded-md p-2 pl-4 pb-4">
            <div className="flex flex-col w-full">
                <p className="text-white font-tree text-lg">Dia</p>
                <p className="text-(--agenrap-yellow-200) font-tree text-lg font-medium">
                    {translateDayName(name)}
                </p>
            </div>
            <div className="flex gap-x-4 mt-1">
                <div className="flex flex-col">
                    <span className="text-white text-sm font-tree">De</span>
                    <span className="text-(--agenrap-yellow-200) font-medium font-tree">{initial.slice(0,5)}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-sm font-tree">Fim</span>
                    <span className="text-(--agenrap-yellow-200) font-medium font-tree">{end.slice(0,5)}</span>
                </div>
            </div>
        </div>
    )
}