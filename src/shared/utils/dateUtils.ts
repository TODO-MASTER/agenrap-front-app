
const WEEK_DAYS: Record<number, string> = {
    0: "DOM",
    1: "SEG",
    2: "TER",
    3: "QUA",
    4: "QUI",
    5: "SEX",
    6: "SAB",
}

export const dateUtils = {
    toDateString: (date: Date): string => {
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, "0")
        const d = String(date.getDate()).padStart(2, "0")
        return `${y}-${m}-${d}`
    },

    getWeekDay: (date: Date): string => WEEK_DAYS[date.getDay()],

    getDay: (date: Date): number => date.getDate(),

    getMonth: (date: Date): number => date.getMonth() + 1,

    getYear: (date: Date): number => date.getFullYear(),

    fromDateString: (str: string): Date => {
        const [y, m, d] = str.split("-").map(Number)
        return new Date(y, m - 1, d)
    },
}