'use client'
import { Slider } from "@/src/shared/components/ui/slider";
import { timeUtils } from "@/src/shared/utils/time.utils";
import { useState } from "react";

type DurationMode = "slider" | "precise"
type SliderStep = 5| 15 | 30

const STEP_MINUTES: Record<SliderStep, number> = { 5:5*60,15: 15 * 60, 30: 30 * 60 }
const MAX_DURATION_SECONDS = 86400
const MIN_HOURS = 0
const MAX_HOURS = 23

function buildMinuteOptions(step: SliderStep) {
    const options: number[] = []
    for (let m = 0; m < 60; m += step) options.push(m)
    return options
}

export default function DurationPicker({ value, onChange }: { value: number, onChange: (seconds: number) => void }) {
    const [mode, setMode] = useState<DurationMode>("slider")
    const [sliderStep, setSliderStep] = useState<SliderStep>(30)

    const hours = Math.floor(value / 3600)
    const minutes = Math.floor((value % 3600) / 60)

    function handleSliderChange(next: number[]) {
        onChange(next[0])
    }

    function handleHoursChange(nextHours: number) {
        const clamped = Math.min(Math.max(nextHours, MIN_HOURS), MAX_HOURS)
        onChange(clamped * 3600 + minutes * 60)
    }

    function handleMinutesChange(nextMinutes: number) {
        onChange(hours * 3600 + nextMinutes * 60)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <p className="font-tree text-[11px] font-semibold text-(--agenrap-brown-500)/50 uppercase tracking-widest">
                    Duração
                </p>
                <div className="flex gap-1 bg-(--agenrap-brown-500)/10 rounded-full p-0.5">
                    <button
                        type="button"
                        onClick={() => setMode("slider")}
                        className={`px-3 py-1 rounded-full font-tree text-xs transition-colors ${mode === "slider" ? "bg-(--agenrap-purple-500) text-white" : "text-(--agenrap-brown-500)/60"}`}
                    >
                        Rápido
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("precise")}
                        className={`px-3 py-1 rounded-full font-tree text-xs transition-colors ${mode === "precise" ? "bg-(--agenrap-purple-500) text-white" : "text-(--agenrap-brown-500)/60"}`}
                    >
                        Preciso
                    </button>
                </div>
            </div>

            <p className="font-tree font-semibold text-lg">
                {timeUtils.toHourString(value)}
            </p>

            {mode === "slider" ? (
                <div className="flex flex-col gap-3">
                    <Slider
                        value={[value]}
                        onValueChange={handleSliderChange}
                        className="bg-(--agenrap-purple-500)"
                        step={STEP_MINUTES[sliderStep]}
                        min={STEP_MINUTES[sliderStep]}
                        max={MAX_DURATION_SECONDS}
                    />
                    <div className="flex gap-2">
                        {([15, 30] as SliderStep[]).map((step) => (
                            <button
                                key={step}
                                type="button"
                                onClick={() => setSliderStep(step)}
                                className={`px-2.5 py-1 rounded border font-tree text-xs transition-colors ${sliderStep === step ? "border-(--agenrap-purple-500) bg-(--agenrap-purple-500)/10" : "border-(--agenrap-brown-500)/20 text-(--agenrap-brown-500)/60"}`}
                            >
                                {step} em {step} min
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <p className="font-tree text-[11px] text-(--agenrap-brown-500)/50">Horas</p>
                        <select
                            value={hours}
                            onChange={(e) => handleHoursChange(Number(e.target.value))}
                            className="border border-(--agenrap-brown-500)/20 rounded px-2 py-2 font-tree text-sm bg-transparent"
                        >
                            {Array.from({ length: MAX_HOURS + 1 }, (_, h) => (
                                <option key={h} value={h}>{h}h</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <p className="font-tree text-[11px] text-(--agenrap-brown-500)/50">Minutos</p>
                        <select
                            value={minutes}
                            onChange={(e) => handleMinutesChange(Number(e.target.value))}
                            className="border border-(--agenrap-brown-500)/20 rounded px-2 py-2 font-tree text-sm bg-transparent"
                        >
                            {buildMinuteOptions(5).map((m) => (
                                <option key={m} value={m}>{m}min</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}