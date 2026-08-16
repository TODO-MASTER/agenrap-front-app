export const PROFESSIONAL_AVATAR_COLORS = [
    { key: "purple", hex: "#BB77EE" },
    { key: "gold", hex: "#FFE082" },
    { key: "brown", hex: "#C46210" },
    { key: "cream", hex: "#F5E6CC" },
] as const

export function getAvatarHex(key: string) {
    return PROFESSIONAL_AVATAR_COLORS.find(c => c.key === key)?.hex ?? "#BB77EE"
}