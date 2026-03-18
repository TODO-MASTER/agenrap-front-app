import { cva } from "class-variance-authority";

export const agenrapInputVariants = cva("flex gap-y-1 items-center",
    {
        variants:{
            variant:{
                brownrap:"border w-full p-0  rounded-[2px] border border-(--agenrap-brown-500)/75 bg-(--agenrap-brown-500)/25 font-figtree font-medium text-xs ",
                calyBlack:"border border-black  rounded-lg ",
                calyGhost:"border-0 border-b border-black/50  rounded-none ",
            },
            size:{
                full:"w-full"
            },
            calyInputError:{
                calyBlackInputError:"border border-red-500 rounded-md "
            }
        },
        defaultVariants:{
            variant:'brownrap',
            size:'full'
        }
        
    },
    
)