import { AlertCircle, CheckCircle2 } from "lucide-react";

 
export function Feedback({ type, message }: { type: 'success' | 'error'; message: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 ${
        type === 'success'
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-600 border border-red-200'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
      {message}
    </div>
  )
}