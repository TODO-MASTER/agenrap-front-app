import { VariantProps } from "class-variance-authority"
import { agenrapButtonVariants } from "../button/AgenrapButtonVariants"

export interface IAgenrapCalendarProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof agenrapButtonVariants>{
    asChild?:boolean
    asThouched?:boolean
    isLoading?:boolean
    icon?:boolean
    hrefLink?:string
    
    
}