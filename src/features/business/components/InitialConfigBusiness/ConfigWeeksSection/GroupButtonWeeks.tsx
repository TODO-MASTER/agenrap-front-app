import AgenrapButton from "@/src/shared/components/agenrap-ui/button/AgenrapButton";
import { IGroupWeeksProps } from "../../../../../shared/interfaces/business/IGroupWeeksProps";

export default function GroupButtonWeeks({ fields, append, form }: IGroupWeeksProps) {
    return (
        <>
         
            <div className="flex flex-wrap w-fit justify-center  gap-1   rounded-xs    md:px-0">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map(wk => (
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