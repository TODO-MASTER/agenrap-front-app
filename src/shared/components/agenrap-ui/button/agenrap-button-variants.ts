import { cva } from "class-variance-authority";

export const agenrapButtonVariants = cva(
    "  "
    , {
        variants: {
            variant: {
                purplerap: "w-full h-[100px] outline-none text-white bg-(--agenrap-purple-500) hover:opacity-90 cursor-pointer font-figtree font-medium text-2xl",
                calendrap: "data-[selected=true]:rounded-none data-[selected=true]:bg-pink-600",
                brownlinkrap: "text-black bg-(--agenrap-brown-400) outline-none hover:bg-(--agenrap-brown-500)/15 hover:text-black/50 rounded-md cursor-pointer font-figtree font-medium text-sm",
                brownLogoutrap: "text-black md:bg-(--agenrap-brown-400) bg-(--agenrap-brown-500)/15 outline-none md:hover:bg-(--agenrap-brown-500)/15 hover:text-black/50 md:rounded-md cursor-pointer font-figtree font-medium text-sm",
                pictureHangerRap:"border-4 font-tree  border-(--agenrap-yellow-200)/85 rounded-xs bg-(--agenrap-pure-white)  justify-center flex flex-col gap-2 items-center",
                minBrownRap:"w-full h-[100px] outline-none text-white  hover:opacity-90 cursor-pointer font-figtree font-medium text-2xl bg-(--agenrap-brown-500) border-l-4 border-(--agenrap-brown-200)/75",
                rapblue:"bg-red-200",
                linkBrownRap: [
    "outline-none text-white hover:opacity-90 cursor-pointer font-figtree font-medium",
    "bg-(--agenrap-brown-500) border-l-4 border-(--agenrap-brown-200)/75",
    "md:w-fit md:rounded-none md:h-21.25 md:px-3 md:gap-x-1 md:items-center md:self-auto md:justify-center",
    "items-center justify-start w-full flex self-end px-4 py-2 h-fit gap-x-2"
].join(" ")
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