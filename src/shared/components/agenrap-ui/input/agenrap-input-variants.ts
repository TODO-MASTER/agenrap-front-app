import { cva } from "class-variance-authority";

export const agenrapInputVariants = cva("flex gap-y-1 items-center",
    {
        variants:{
            variant:{
                brownrap:"border w-full p-0  rounded-[2px] border border-(--agenrap-brown-500)/75 bg-(--agenrap-brown-500)/25 font-tree font-medium text-xs ",
                brownraplight:"text-white border w-full p-0  rounded-[2px] border border-(--agenrap-brown-200)  font-tree font-medium text-xs",
                cyberYellowRap:"border w-full text-white p-0  rounded-[2px] border-1 border-(--agenrap-yellow-200)/85 bg-(--agenrap-yellow-200)/25 font-tree font-medium text-xs",
                calyBlack:"border border-black  rounded-lg ",
                calyGhost:"border-0 border-b border-black/50  rounded-none ",
            },
            size:{
                full:"w-full"
            },
    
                
            
            allErrors:{
                variantLightBrownRapError:"text-white border w-full p-0   rounded-[2px] border border-(--agenrap-brown-200) bg-(--agenrap-brown-500) placeholder:text-white font-figtree font-medium text-xs",
                calyBlackInputError:"border border-red-500 rounded-md "
            }
        },
        defaultVariants:{
            variant:'brownrap',
            size:'full'
        }
        
    },
    
)