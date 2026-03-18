import { cva } from "class-variance-authority";

export const agenrapButtonVariants = cva(
    "  "
    , {
        variants: {
            variant: {
                purplerap: "lg:w-[100%] h-[100px] text-white bg-(--agenrap-purple-500) hover:opacity-90 cursor-pointer font-figtree font-medium text-2xl",
                rapblue:"bg-red-200"
            },
            size: {
                empty:"p-2",
                sm: "py-1 px-2",
                md: "py-2 px-4",
                lg: "py-4 px-6"
            }
        },
        defaultVariants: {
            variant: "purplerap",
            size: 'md'
        }
    }

)