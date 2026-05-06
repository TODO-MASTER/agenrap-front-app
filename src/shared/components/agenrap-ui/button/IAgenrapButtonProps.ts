import { VariantProps } from "class-variance-authority";
import { agenrapButtonVariants } from "./AgenrapButtonVariants";

export interface IAgenrapButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof agenrapButtonVariants>{
    asChild?:boolean
    asThouched?:boolean
    isLoading?:boolean
    icon?:boolean
    hrefLink?:string
    plusClassName?:string
    
}