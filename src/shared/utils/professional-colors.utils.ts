export const PROFESSIONAL_AVATAR_COLORS = [
  { key: "plum", label: "Ameixa", hex: "#7C5CBF", ring: "#E8DEFF" },
  { key: "rose", label: "Rosé", hex: "#C97B84", ring: "#F5E4E6" },
  { key: "gold", label: "Dourado", hex: "#C4A35A", ring: "#F5E9C8" },
  { key: "sage", label: "Sálvia", hex: "#6B8F71", ring: "#E2EDE4" },
  { key: "terracotta", label: "Terracota", hex: "#C47A5A", ring: "#F3E0D6" },
  { key: "ink", label: "Tinta", hex: "#3D3A4A", ring: "#E4E2EA" },
  { key: "blush", label: "Blush", hex: "#E8A0B0", ring: "#FCE8EE" },
  { key: "ocean", label: "Oceano", hex: "#5B7C99", ring: "#DCE6EF" },
] as const

export type ProfessionalAvatarColor = (typeof PROFESSIONAL_AVATAR_COLORS)[number]["key"]

const FALLBACK = PROFESSIONAL_AVATAR_COLORS[0]

export function getAvatarHex(color: string): string {
  const found = PROFESSIONAL_AVATAR_COLORS.find((c) => c.key === color)
  return found?.hex ?? FALLBACK.hex
}

export function getAvatarMeta(color: string) {
  return PROFESSIONAL_AVATAR_COLORS.find((c) => c.key === color) ?? FALLBACK
}

export function isAvatarColor(value: string): value is ProfessionalAvatarColor {
  return PROFESSIONAL_AVATAR_COLORS.some((c) => c.key === value)
}