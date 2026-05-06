import { FieldArrayWithId, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import { InitialBusinessWeeksSchema } from "../../types/Business/InitialBusinessWeeksSchema";
import { IWkPeriodRes } from "../responses/IWkRes";
import { INormalizedWeek } from "../../utils/normalizeWeek";

export interface IGroupWeeksProps{
    fields:FieldArrayWithId<InitialBusinessWeeksSchema,"business.weeks">[],
    append:UseFieldArrayAppend<InitialBusinessWeeksSchema,"business.weeks">,
    form:UseFormReturn<InitialBusinessWeeksSchema>,
    weeks:IWkPeriodRes[]|null,
    normalizedWeeks?:INormalizedWeek[]|null
}