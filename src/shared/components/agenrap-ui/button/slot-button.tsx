export type SlotButtonProps = {
    time: string;
    available: boolean;
    blockReason?: string | null;
    selected?: boolean;
    onClick?: () => void;
}

export default function SlotButton({ 
    time, 
    available, 
    blockReason, 
    selected, 
    onClick 
}: SlotButtonProps) {
    
    return (
        <button
            type="button"
            disabled={!available}
            onClick={onClick}
            className={`px-2 py-3.5 flex flex-col justify-center items-center rounded-xs transition-all w-full min-h-16 h-auto ${
                !available
                    // Estado Impossibilitado: Visual "frio" e opaco, deixando claro o bloqueio
                    ? "bg-(--agenrap-brown-200)/30 cursor-not-allowed opacity-50"
                    : selected
                        ? "bg-(--agenrap-purple-500) cursor-pointer"
                        : "bg-(--agenrap-brown-200) hover:bg-(--agenrap-purple-500) cursor-pointer"
            }`}
        >
            {/* Horário */}
            <p 
                className={`text-center text-base font-semibold tracking-wide ${
                    !available
                        ? "text-black/50 line-through decoration-1" 
                        : selected
                            ? "text-white"
                            : "text-black transition-colors"
                }`}
            >
                {time}
            </p>

            {/* Motivo visível direto no botão (Perfeito para Mobile) */}
            {!available && blockReason && (
                <span className="font-tree text-[9px] text-black/75 font-bold mt-0.5 text-center leading-none uppercase tracking-wider max-w-full truncate px-1">
                    {blockReason}
                </span>
            )}
        </button>
    )
}