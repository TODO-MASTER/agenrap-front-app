export default function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <div
      className="flex items-center justify-center w-20 h-20 rounded-full rounded-tl-sm rounded-br-sm text-2xl font-bold text-white shadow-lg select-none"
      style={{ background: 'var(--agenrap-brown-500)' }}
    >
      {initials}
    </div>
  )
}