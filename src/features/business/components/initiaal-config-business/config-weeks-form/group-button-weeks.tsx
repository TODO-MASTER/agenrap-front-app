
import { InitialBusinessWeeksSchema } from "@/src/features/business/schemas";
import { WorkingPeriod } from "@/src/features/business/types";
import AgenrapButton from "@/src/shared/components/agenrap-ui/button/agenrap-button";
import { NormalizedWeek } from "@/src/shared/utils/normalize-week.utils";
import { FieldArrayWithId, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
export type GroupWeeksProps={
    fields:FieldArrayWithId<InitialBusinessWeeksSchema,"business.weeks">[],
    append:UseFieldArrayAppend<InitialBusinessWeeksSchema,"business.weeks">,
    form:UseFormReturn<InitialBusinessWeeksSchema>,
    weeks:WorkingPeriod[]|null,
    normalizedWeeks?:NormalizedWeek[]|null
}
export default function GroupButtonWeeks({ fields, append, form, normalizedWeeks }: GroupWeeksProps) {

    return (
        <>

            <div className="flex flex-wrap md:flex-nowrap  w-full justify-center  gap-1   rounded-xs    md:px-0">
                {normalizedWeeks != null ? normalizedWeeks.map((wk, index) => (
                    <AgenrapButton
                        type="button"
                        key={index}
                        variant={"purplerap"}
                        className={`rounded-lg w-fit p-3 text-center flex justify-center lg:w-auto h-fit hover:opacity-50 md:text-sm text-xs ${normalizedWeeks!.find(w => w.week === wk.week)!.active ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => {
                            if (fields.length < 7 && !normalizedWeeks!.find(w => w.week === wk.week)!.active) {
                                append({ name: wk.week, initial: wk.initial, end: wk.end });
                                setTimeout(() => form.trigger("business.weeks"), 0);
                            }
                        }}
                    >
                        {wk.week}
                    </AgenrapButton>
                )) : ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map(wk => (
                    <AgenrapButton type="button" key={wk} variant={"purplerap"} className=" md:w-auto w-fit   text-center flex justify-center lg:w-auto h-fit hover:opacity-50 md:text-sm text-xs  rounded-xs" onClick={() => {
                        if (fields.length < 9) {
                            append({ name: wk, initial: "08:00", end: "18:00" });
                            setTimeout(() => form.trigger("business.weeks"), 0);
                        }
                    }}
                    >
                        {wk}
                    </AgenrapButton>
                ))}
            </div>
        </>
    )
}