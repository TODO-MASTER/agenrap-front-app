import { FieldArrayWithId, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import { InitialBusinessFormSchema } from "../../types/InititalBusinessFormSchema";

export interface IGroupWeeksProps{
    fields:FieldArrayWithId<InitialBusinessFormSchema,"business.weeks">[],
    append:UseFieldArrayAppend<InitialBusinessFormSchema,"business.weeks">,
    form:UseFormReturn<InitialBusinessFormSchema>
}