import { dateUtils } from "@/src/shared/utils/date.utils"
import { timeUtils } from "@/src/shared/utils/time.utils"

export function formatDate(str: string) {
  const d = dateUtils.fromDateString(str)
  return `${String(dateUtils.getDay(d)).padStart(2, '0')}/${String(dateUtils.getMonth(d)).padStart(2, '0')}/${dateUtils.getYear(d)}`
}

export function formatHour(str: string) {
  const [h, m] = str.split(':')
  return timeUtils.toString(Number(h) * 60 + Number(m))
}

export function formatPhone(value: string | null) {
  return value?.trim() ? value : 'Sem telefone'
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2)  return `(${digits}`
  if (digits.length <= 6)  return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}