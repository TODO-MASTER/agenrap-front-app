'use client'

import { InitialBusinessWeeksSchema } from "@/src/shared/types/Business/InitialBusinessWeeksSchema";
import { FormControl, FormField, FormItem } from "../../../ui/form";
import AgenrapInput from "../../input/AgenrapInput";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { translateDayName } from "@/src/shared/utils/timeUtils";
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
        <div className="flex flex-col  w-full bg-(--agenrap-gray-800) rounded-xl p-2 pl-4 pb-4">
            <div className="flex w-full justify-end">

                <button type="button" className=" border-0 hover:animate-pulse h-full   cursor-pointer" onClick={() => remove(index)}><X color="red" /></button>
            </div>
                        <div className="flex flex-col w-full">
            <p className="text-white font-tree text-lg ">Dia</p>
            <p className="text-(--agenrap-yellow-200) font-tree text-lg font-medium">{translateDayName(form.getValues(`business.weeks.${index}.name`))}</p>
            </div>
            {isShow ? (
             
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
            ) : (
            <div className="flex gap-x-1">
                <FormField
                    control={form.control}
                    name={`business.weeks.${index}.initial`}

                    render={({ field }) => (
                        <FormItem className="">
                            <FormControl>
                                <AgenrapInput
                                    id={`${index}`}
                                    type="time"

                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        form.trigger(`business.weeks.${index}.end`);
                                    }}
                                    label="De"
                                    variant="cyberYellowRap"
                                    autoComplete="off"
                                    placeholder="nome do seu negócio ex:salao-agenrap"
                                    allErrors={"calyBlackInputError"}
                                    className="[&::-webkit-calendar-picker-indicator]:hidden"

                                    removeFormMessage={true}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`business.weeks.${index}.end`}

                    render={({ field }) => (
                        <div className="flex items-center gap-x-1">
                            <FormItem className="">
                                <FormControl >

                                    <AgenrapInput
                                        id={`${index}`}
                                        type="time"

                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            form.trigger(`business.weeks.${index}.initial`);
                                        }}
                                        label="Fim"
                                        variant="cyberYellowRap"
                                        autoComplete="off"
                                        placeholder="nome do seu negócio ex:salao-agenrap"
                                        allErrors={"calyBlackInputError"}
                                        className="[&::-webkit-calendar-picker-indicator]:hidden"

                                        removeFormMessage={true}
                                    />



                                </FormControl>

                            </FormItem>

                        </div>

                    )}
                />
                
            </div>
            )}
        </div>
    )
}