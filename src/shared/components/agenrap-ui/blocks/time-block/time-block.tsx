import { DayConfig } from "@/src/features/business/components/initial-config-business/config-weeks-form/config-weeks-form"
import AgenrapInput from "@/src/shared/components/agenrap-ui/input/agenrap-input"


interface TimeBlockProps {
  prefix: string
  value: DayConfig
  onChange: (next: DayConfig) => void
  headerRight: React.ReactNode
  title: string
  errors?: { initial?: { message?: string }; end?: { message?: string } }
}

export function TimeBlock({ prefix, value, onChange, headerRight, title, errors }: TimeBlockProps) {
  return (
    <div className="flex flex-col">
      <div className="bg-(--agenrap-brown-500) px-4 py-2.5 flex items-center justify-between">
        <p className="font-tree font-bold text-sm text-white">{title}</p>
        <div className="font-tree text-xs text-(--agenrap-yellow-200)">{headerRight}</div>
      </div>

      <div className="border border-(--agenrap-brown-500)/20 border-t-0 p-4 flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <AgenrapInput
              id={`${prefix}-initial`}
              type="time"
              label="Início"
              variant="brownrap"
              value={value.initial}
              onChange={e => onChange({ ...value, initial: e.target.value })}
              autoComplete="off"
              className="[&::-webkit-calendar-picker-indicator]:hidden w-full"
              removeFormMessage={true}
            />
            {errors?.initial?.message && (
              <p className="text-xs text-red-400 font-tree mt-1">{errors.initial.message}</p>
            )}
          </div>

          <div className="pb-3 shrink-0">
            <div className="w-4 h-px bg-(--agenrap-brown-500)/30" />
          </div>

          <div className="flex-1">
            <AgenrapInput
              id={`${prefix}-end`}
              type="time"
              label="Término"
              variant="brownrap"
              value={value.end}
              onChange={e => onChange({ ...value, end: e.target.value })}
              autoComplete="off"
              className="[&::-webkit-calendar-picker-indicator]:hidden w-full"
              removeFormMessage={true}
            />
            {errors?.end?.message && (
              <p className="text-xs text-red-400 font-tree mt-1">{errors.end.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}