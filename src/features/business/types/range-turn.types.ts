export type DayOffRes = {
  id: number
  start: string
  end: string
  reason?: string
  professionalId?: number | null
}

export type TimeBlockRes = {
  id: number
  start: string
  end: string
  reason?: string
  professionalId?: number | null
}

export type DayOffReq = {
  start: string
  end: string
  reason?: string
  professionalId?: number | null
}

export type TimeBlockReq = {
  start: string
  end: string
  reason?: string
  professionalId?: number | null
}