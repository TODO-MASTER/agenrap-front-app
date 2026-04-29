import { FieldArrayWithId, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import { InitialBusinessWeeksSchema } from "../../types/Business/InitialBusinessWeeksSchema";

export interface IGroupWeeksProps{
    fields:FieldArrayWithId<InitialBusinessWeeksSchema,"business.weeks">[],
    append:UseFieldArrayAppend<InitialBusinessWeeksSchema,"business.weeks">,
    form:UseFormReturn<InitialBusinessWeeksSchema>
}