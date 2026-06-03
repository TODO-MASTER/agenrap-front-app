'use client'

import { InitialBusinessWeeksSchema } from "@/src/features/business/schemas/business-week.schema";
import { FormControl, FormField, FormItem } from "../../../ui/form";
import AgenrapInput from "../../input/agenrap-input";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { translateDayName } from "@/src/shared/utils/time.utils";
interface ICardDayWeeksProps {
    form: UseFormReturn<InitialBusinessWeeksSchema>
    index: number,
    remove: UseFieldArrayRemove,
    mode?:'edit'|'show'
}
export default function CardDayWeek({ form, index, remove,mode='edit' }: ICardDayWeeksProps) {
        const isShow = mode === 'show';
    const initial = form.getValues(`business.weeks.${index}.initial`);
    const end = form.getValues(`business.weeks.${index}.end`);
return (
    <div className="flex flex-col w-full bg-(--agenrap-gray-800) rounded-md overflow-hidden border-l-4 border-(--agenrap-yellow-200)">
        <div className="flex w-full justify-between items-center px-4 pt-3 pb-1">
            <p className="text-(--agenrap-yellow-200) font-tree text-xl font-semibold">
                {translateDayName(form.getValues(`business.weeks.${index}.name`))}
            </p>
            <button type="button" className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => remove(index)}>
                <X color="red" size={18} />
            </button>
        </div>
        {isShow ? (
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
        ) : (
            <div className="flex gap-x-1 px-4 pb-4">
                <FormField
                    control={form.control}
                    name={`business.weeks.${index}.initial`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    id={`${index}`}
                                    type="time"
                                    value={field.value}
                                    onChange={(e) => { field.onChange(e); form.trigger(`business.weeks.${index}.end`) }}
                                    label="Início"
                                    variant="cyberYellowRap"
                                    autoComplete="off"
                                    allErrors="calyBlackInputError"
                                    className="[&::-webkit-calendar-picker-indicator]:hidden"
                                    removeFormMessage
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`business.weeks.${index}.end`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AgenrapInput
                                    id={`${index}`}
                                    type="time"
                                    value={field.value}
                                    onChange={(e) => { field.onChange(e); form.trigger(`business.weeks.${index}.initial`) }}
                                    label="Fim"
                                    variant="cyberYellowRap"
                                    autoComplete="off"
                                    allErrors="calyBlackInputError"
                                    className="[&::-webkit-calendar-picker-indicator]:hidden"
                                    removeFormMessage
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        )}
    </div>
)
}