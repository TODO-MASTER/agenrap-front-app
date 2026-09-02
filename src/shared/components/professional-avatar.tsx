import { getAvatarHex, getAvatarMeta } from "@/src/shared/utils/professional-colors.utils"

type Props = {
  name: string
  color: string
  size?: "sm" | "md" | "lg" | "xl"
  showRing?: boolean
}

export default function ProfessionalAvatar({
  name,
  color,
  size = "md",
  showRing = false,
}: Props) {
  const sizeClass =
    size === "sm"
      ? "w-8 h-8 text-xs"
      : size === "lg"
        ? "w-16 h-16 text-2xl"
        : size === "xl"
          ? "w-24 h-24 text-3xl"
          : "w-11 h-11 text-base"

  const parts = name.trim().split(/\s+/).filter(Boolean)
  const initial =
    parts.length >= 2
      ? `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
      : (parts[0]?.charAt(0) ?? "?").toUpperCase()

  const meta = getAvatarMeta(color)
  const hex = getAvatarHex(color)

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-tree font-bold shrink-0 select-none ${
        showRing ? "ring-2 ring-offset-2" : ""
      }`}
      style={{
        backgroundColor: hex,
        color: hex === "#3D3A4A" ? "#F5F2EB" : "#1A1814",
        ...(showRing ? { boxShadow: `0 0 0 2px ${meta.ring}` } : {}),
      }}
    >
      {initial}
    </div>
  )
}