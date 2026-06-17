export default function ClosedTodayBanner({ statusMessage }: { statusMessage?: string }) {
    return (
        <div className="w-full bg-(--agenrap-gray-800) border-l-4 border-(--agenrap-purple-500) px-4 py-3">
            <p className="font-tree text-(--agenrap-yellow-200) text-sm italic">
                {statusMessage ?? "Estamos fechados hoje"} — você ainda pode agendar para outros dias.
            </p>
        </div>
    )
}