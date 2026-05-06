import { IWkPeriodRes } from "../interfaces/responses/IWkRes"

const WEEK_DAYS = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]

export interface INormalizedWeek {
  week: string
  initial: string
  end: string
  id: number | null
  active: boolean
}

export function normalizeWeek(fromApi: IWkPeriodRes[]): INormalizedWeek[] {
  return WEEK_DAYS.map((week) => {
    const existing = fromApi.find((w) => w.week === week)
    return existing
      ? { week, initial: existing.initial, end: existing.end, id: existing.id??null, active: true }
      : { week, initial: "08:00", end: "18:00", id: null, active: false }
  })
}