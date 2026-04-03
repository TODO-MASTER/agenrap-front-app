export const timeUtils = {
  toMinutes: (time: string) => {
    const [h, m] = time.split(":")
    return Number(h) * 60 + Number(m)
  },
   toHours: (time: number) => {
    let convertion = time.toString()
    const [h, m] = convertion.split(":")
    return Number(h) / 60 + Number(m)
  },

  toString: (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  },
toHourString: (value: number) => {
    const h = Math.floor(value / 3600)
    const m = Math.floor((value % 3600) / 60)
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}
}