type Currency = "BRL" | "USD" | "EUR"
export const currencyUtils = {
    toDisplay: (value: number, currency: Currency = "BRL") => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency,
        }).format(value).replace("\u00A0", " ")
    },

    toNumber: (value: string) => {
        const digits = value.replace(/\D/g, "")
        return Number(digits) / 100
    },

    toCents: (value: number) => {
        return Math.round(value * 100)
    },

    fromCents: (cents: number, currency: Currency = "BRL") => {
        return currencyUtils.toDisplay(cents / 100, currency)
    },

    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, "")
        if (digits.length > 10) return {
            display: currencyUtils.toDisplay(Number(digits.slice(0, 10)) / 100),
            value: Number(digits.slice(0, 10)) / 100,
            cents: Number(digits.slice(0, 10))
        }

        const numeric = Number(digits) / 100
        return {
            display: numeric > 0 ? currencyUtils.toDisplay(numeric) : "",
            value: numeric,
            cents: currencyUtils.toCents(numeric)
        }
    }
}

