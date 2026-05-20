import { Plus } from "lucide-react";

export function AddDayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-(--agenrap-brown-500)/20 py-3 flex items-center justify-center gap-2 text-sm font-tree font-semibold text-(--agenrap-brown-500)/45 hover:bg-(--agenrap-brown-500)/5 hover:text-(--agenrap-brown-500)/70 transition-colors cursor-pointer"
    >
      <Plus size={14} />
      {label}
    </button>
  )
}