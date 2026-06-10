'use client'

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { CalendarClock, CalendarDays, CheckCircle2 } from "lucide-react"
import { AgenrapSegmentedControl } from "@/src/shared/components/agenrap-ui/button/agenrap-segment-button"

import { BusinessRes } from "@/src/features/business/types/business.types"
import { SaveDayOff } from "@/src/features/business/services/range-turn.service"
import AgenrapCalendar from "@/src/shared/components/agenrap-ui/calendar/agenrap-calendar"
import { useBusinessStore } from "@/src/shared/store/use-business.store"

export type RangeTurnManagerProps = {
    tgrap: string

}

export default function RangeTurnManager({ tgrap }: RangeTurnManagerProps) {
    // Estado para alternar o modo interno do calendário
    const business = useBusinessStore(bsn=>bsn.business)
    const [selectionMode, setSelectionMode] = useState<"single" | "range">("range")
    
    // Estados para capturar os inputs do react-day-picker
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined
    })
    
    // Estado para a justificativa da folga/bloqueio (DayOffReqDTO do C#)
    const [reason, setReason] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleConfirmBlock = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading) return

        let startString = ""
        let endString = ""

        if (selectionMode === "single" && date) {
            startString = date.toISOString().split('T')[0]
            endString = startString // Início e fim iguais no modo a dedo
        } else if (selectionMode === "range" && range?.from) {
            startString = range.from.toISOString().split('T')[0]
            endString = (range.to || range.from).toISOString().split('T')[0]
        }

        if (!startString || !endString) {
            alert("Por favor, selecione os dias no calendário.")
            return
        }

        try {
            setLoading(true)
            
            // Dispara para a sua API Route / Server Action que consome o back em C#
            await SaveDayOff(tgrap, {
                start: startString,
                end: endString,
                reason: reason || "Bloqueio de Agenda"
            })

            alert("Folga/Bloqueio salvo com sucesso!")
            
            // Limpa o formulário
            setReason("")
            setRange({ from: new Date(), to: undefined })
            setDate(new Date())
        } catch (error) {
            console.error(error)
            alert("Erro ao salvar o bloqueio de turno.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex flex-col gap-y-8 md:gap-y-12 lg:py-6 lg:px-8 md:py-4 px-2 items-center w-full">
            {/* Header com os Segmented Controls de Abas padrão do seu app */}
            <div className="flex w-full items-center justify-between gap-y-2 md:flex-nowrap flex-wrap border-b border-[#FFE082]/20 pb-4">
                <div className="flex items-center gap-x-2">
                    <CalendarClock className="text-(--agenrap-purple-500)" size={32} />
                    <h1 className="lg:text-4xl md:text-3xl text-2xl font-tree font-medium text-white">Bloqueio de Turnos</h1>
                </div>
                
                <div className="hidden md:flex">
                    <AgenrapSegmentedControl segments={[
                        { label: 'Adicionar', href: `/dashboard/journey/new?rap=${tgrap}`, active: false },
                        { label: 'Ver Todos', href: `/dashboard/journey/list?rap=${tgrap}`, active: false },
                        { label: 'Bloqueios/Faixa', href: `/dashboard/journey/range-turn?rap=${tgrap}`, active: true },
                    ]} />
                </div>
            </div>

            {/* Grid Principal da Tela */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mt-4">
                
                {/* Coluna Esquerda: O Calendário Dinâmico */}
                <div className="lg:col-span-7 flex flex-col gap-y-4 bg-(--agenrap-gray-800)/40 p-4 rounded-xl border border-[#FFE082]/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-tree text-zinc-400">Selecione o método de bloqueio:</span>
                        
                        {/* Mini-switchers internos da tela para ditar o comportamento do calendário */}
                        <div className="bg-zinc-950 p-1 rounded-lg flex gap-x-1 border border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setSelectionMode("range")}
                                className={`flex items-center gap-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectionMode === "range" ? "bg-(--agenrap-purple-500) text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                            >
                                <CalendarDays size={14} /> Modo Faixa
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectionMode("single")}
                                className={`flex items-center gap-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectionMode === "single" ? "bg-(--agenrap-purple-500) text-black font-bold" : "text-zinc-400 hover:text-white"}`}
                            >
                                <CalendarClock size={14} /> A Dedo
                            </button>
                        </div>
                    </div>

                    {/* O seu componente de calendário já com as props opcionais e retrocompatíveis */}
                    <AgenrapCalendar 
                        business={business as any}
                        className="w-full border-none shadow-xl"
                        selectionMode={selectionMode}
                        date={date}
                        setDate={setDate}
                        range={range}
                        setRange={setRange}
                        fullDays={[]}
                        setFullDays={() => {}}
                        isOwner={true} // Força a liberação dos dias não-úteis para o dono poder bloquear
                    />
                </div>

                {/* Coluna Direita: O Formulário de Confirmação do Bloqueio */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-(--agenrap-gray-800)/60 p-6 rounded-xl border border-[#FFE082]/20 shadow-2xl">
                    <form onSubmit={handleConfirmBlock} className="flex flex-col gap-y-6 h-full justify-between">
                        <div className="flex flex-col gap-y-4">
                            <h2 className="text-xl font-tree font-semibold text-[#FFE082]">Detalhes da Folga</h2>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Selecione os dias ao lado. O sistema irá suspender temporariamente novos agendamentos de clientes no período selecionado.
                            </p>
                            
                            {/* Input do Motivo */}
                            <div className="flex flex-col gap-y-2 mt-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Motivo do Bloqueio / Nome da Folga</label>
                                <input 
                                    type="text"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Ex: Recesso de Fim de Ano, Casamento, etc."
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-md p-3 text-sm focus:border-(--agenrap-purple-500) outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Botão de Ação de Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 flex items-center justify-center gap-x-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-black font-tree font-bold py-3.5 px-4 rounded-md shadow-lg transition-all transform active:scale-[0.98]"
                        >
                            <CheckCircle2 size={20} />
                            {loading ? "Salvando Folga..." : "Confirmar e Bloquear Agenda"}
                        </button>
                    </form>
                </div>

            </section>
        </main>
    )
}