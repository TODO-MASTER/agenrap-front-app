export type DayOffRes = {
  id: number
  start: string
  end: string
  reason?: string
}
 
export type TimeBlockRes = {
  id: number
  start: string
  end: string
  reason?: string
}
 
export type DayOffReq = {
  start: string
  end: string
  reason?: string
}
 
export type TimeBlockReq = {
  start: string
  end: string
  reason?: string
}