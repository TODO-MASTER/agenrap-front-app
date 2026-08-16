import { getAvatarHex } from "@/src/shared/utils/professional-colors.utils"

type Props = {
    name: string
    color: string
    size?: "sm" | "md" | "lg"
}

export default function ProfessionalAvatar({ name, color, size = "md" }: Props) {
    const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-16 h-16 text-2xl" : "w-11 h-11 text-base"
    const initial = name.trim().charAt(0).toUpperCase()

    return (
        <div
            className={`${sizeClass} rounded-full flex items-center justify-center font-tree font-bold text-black shrink-0`}
            style={{ backgroundColor: getAvatarHex(color) }}
        >
            {initial}
        </div>
    )
}