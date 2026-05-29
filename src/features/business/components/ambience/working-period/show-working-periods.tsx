'use client'
import { BadgePlus,Pencil,X } from "lucide-react";
import AgenrapLinkButton from "@/src/shared/components/agenrap-ui/button/agenrap-link-button/agenrap-link-button";
import { useEffect, useState } from "react";
import { CardDayWeekShow } from "@/src/shared/components/agenrap-ui/card/card-day-week/card-day-week-show";
import { useBusinessStore } from "@/src/shared/store/use-business.store";
import EditWorkingPeriodDialog from "@/src/shared/components/agenrap-ui/dialog/edit-working-period-dialog";
import DeleteWorkingPeriodDialog from "@/src/shared/components/agenrap-ui/dialog/delete-working-period-dialog";
import { NormalizedWeek } from "@/src/shared/utils/normalize-week.utils";

export type RapWorkingPeriodProps= {
    tgrap: string,
    weeks: NormalizedWeek[]
}

export default function ShowWorkingPeriods({ tgrap, weeks }: RapWorkingPeriodProps) {
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

                        <AgenrapLinkButton variant={"minBrownRap"} hrefLink={`/dashboard/journey/new?rap=${tgrap}`} className={`${linkButtonResponsive} `}   >
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