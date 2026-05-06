import { IApiResponse } from "./IApiResponse"

export type IWkPeriodRes = {
    id?: number,
    week: string,
    initial: string,
    end: string
}

export type ICreateWkRes = IApiResponse<{ alreadyInitial: boolean, weeks: IWkPeriodRes[] }>
export type IWkActionRes = IApiResponse<{ alreadyInitial: boolean, week: IWkPeriodRes }>
export type IDeleteWkpRes = IApiResponse<{ alreadyInitial: boolean }>