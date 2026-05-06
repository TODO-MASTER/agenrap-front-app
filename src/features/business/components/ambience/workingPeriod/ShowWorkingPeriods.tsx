'use client'

import { useFieldArray, useForm } from "react-hook-form";
import { initialBusinessWeeksSchema, InitialBusinessWeeksSchema } from "../../../../../shared/types/Business/InitialBusinessWeeksSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/src/shared/components/ui/field";
import { Form, FormControl, FormField, FormItem } from "@/src/shared/components/ui/form";
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/AgenrapInput";
import { BadgePlus, DeleteIcon, LoaderCircle, LucideGalleryVerticalEnd, Pencil, Watch, X } from "lucide-react";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import Image from "next/image";
import { macroLogo } from "@/src/assets/images";
import { useBusinessActions } from "../../../hooks/useBusinessActions";
import GroupButtonWeeks from "../../InitialConfigBusiness/ConfigWeeksForm/GroupButtonWeeks";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/AgenrapLinkButton/AgenrapLinkButton";
import CardDayWeek from "@/src/shared/components/agenrap-ui/card/CardsDayWeek/CardDayWeek";
import { IWkPeriodRes } from "@/src/shared/interfaces/responses/IWkRes";
import { INormalizedWeek } from "@/src/shared/utils/normalizeWeek";
import { useEffect, useState } from "react";
import { CardDayWeekShow } from "@/src/shared/components/agenrap-ui/card/CardsDayWeek/CardDayWeekShow";
import { useBusinessStore } from "@/src/shared/store/useBusinessStore";
import EditWorkingPeriodDialog from "@/src/shared/components/agenrap-ui/dialog/EditWorkingPeriodDialog";
import DeleteWorkingPeriodDialog from "@/src/shared/components/agenrap-ui/dialog/DeleteWorkingPeriodDialog";

interface ICtnCreateWkpProps {
    tgBns: string,
    weeks: INormalizedWeek[]
}

export default function ShowWorkingPeriods({ tgBns, weeks }: ICtnCreateWkpProps) {
    const business = useBusinessStore(bsCtx => bsCtx.business)
    const setSelectWorkingPeriod = useBusinessStore(bsCtx => bsCtx.setSelectedWorkingPeriod)
    const [editWkpOpen, setEditWkpOpen] = useState<boolean>(false)
    const [deleteWkpOpen, setDeleteWkpOpen] = useState<boolean>(false)
        const storeWeeks = useBusinessStore(bsCtx => bsCtx.weeks)
    const setWeeks = useBusinessStore(bsCtx => bsCtx.setWeeks)
    const linkButtonResponsive = "md:w-fit  md:rounded-none md:h-21.25 md:px-3  md:gap-x-1 md:items-center md:self-auto  md:justify-center " +
        " items-center   justify-start  w-full  flex  w-fit self-end px-4 py-2 h-fit gap-x-2"

    useEffect(() => {
        setWeeks(weeks) 
    }, [])
    return (
        <main>
            <EditWorkingPeriodDialog setOpen={setEditWkpOpen} open={editWkpOpen}/>
            <DeleteWorkingPeriodDialog setOpen={setDeleteWkpOpen} open={deleteWkpOpen}/>
            <div
                className="flex flex-col gap-y-8 md:gap-y-16 lg:py-6 lg:px-8 md:py-4 px-2 items-center "
            >
                <div className="flex w-full  items-center justify-between  gap-y-2 md:flex-nowrap flex-wrap">
                    <h1 className="lg:text-4xl md:text-3xl text-2xl font-tree font-medium">Sua semana</h1>
                    <div className="md:w-fit w-full  flex justify-end">

                        <AgenrapLinkButton variant={"minBrownRap"} hrefLink={`/dashboard/journey/new?bns=${tgBns}`} className={`${linkButtonResponsive} `}   >
                            <BadgePlus color="#fff" size={25} />
                            <p className="font-tree md:text-2xl text-lg ">Adicionar</p></AgenrapLinkButton>
                    </div>

                </div>

                <section className="flex flex-col lg:w-[55%] md:w-[75%]">

                    <div className="flex flex-col  w-full   ">
                        <div className=" flex ">

                            <p className="text-2xl font-tree my-2 text-start ">Todos os dias</p>

                        </div>
                        <div className="flex flex-wrap gap-4 gap-y-8 mt-12">
                            {storeWeeks.filter(w => w.active).map((wk) => (
                                <div key={wk.id} className="flex flex-col relative">


                                    <div className="flex  justify-end w-full -mt-6 -mr-2 absolute z-10">
                                        <div className="border-2 border-(--agenrap-purple-500) bg-(--agenrap-gray-800) rounded-md px-2 py-1 flex justify-end gap-x-2">
                                            <button type="button" className="cursor-pointer" onClick={() => {
                                                setEditWkpOpen(!editWkpOpen)
                                                setDeleteWkpOpen(false)
                                                setSelectWorkingPeriod({
                                                    id: wk.id!,
                                                    week: wk.week!,
                                                    initial: wk.initial,
                                                    end: wk.end,
                                                })
                                            }}><Pencil color="blue" size={22} /></button>
                                            <button type="button" className="cursor-pointer"><X color="red" size={24} onClick={() => {
                                                setDeleteWkpOpen(!deleteWkpOpen)
                                                setEditWkpOpen(false)
                                                setSelectWorkingPeriod({
                                                    id: wk.id!,
                                                    week: wk.week,
                                                    initial: wk.initial,
                                                    end: wk.end,
                                                })
                                            }} /></button>
                                        </div>
                                    </div>
                                    <div>
                                        <CardDayWeekShow
                                            key={wk.week}
                                            name={wk.week}
                                            initial={wk.initial}
                                            end={wk.end}
                                        />
                                    </div>
                                </div>

                            ))}



                        </div>
                        </div>

                </section>


            </div>
        </main >
    )
}