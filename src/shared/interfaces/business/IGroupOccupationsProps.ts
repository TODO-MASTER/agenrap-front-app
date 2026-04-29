import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";

import { Dispatch, SetStateAction } from "react";
import { InitialBusinessServiceSchema } from "../../types/Business/InitialBusinessServiceSchema";

export interface IGroupOccupationsProps{
    fields:FieldArrayWithId<InitialBusinessServiceSchema,"business.occupations">[],
    append:UseFieldArrayAppend<InitialBusinessServiceSchema,"business.occupations">,
    form:UseFormReturn<InitialBusinessServiceSchema>,
    timectx:{
        timeService:number[],
        setTimeService:Dispatch<SetStateAction<number[]>>
    },
    remove: UseFieldArrayRemove
}