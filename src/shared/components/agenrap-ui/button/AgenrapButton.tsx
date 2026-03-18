import { cn } from "@/src/shared/lib/utils";
import { IAgenrapButtonProps } from "./IAgenrapButtonProps";
import { agenrapButtonVariants } from "./AgenrapButtonVariants";


export default function AgenrapButton({
    className,
    variant,
    size,
    isLoading,
    asThouched,
    asChild,
    icon,
    children,
    disabled,
    ...props
}:IAgenrapButtonProps){
    const Crate = "button"
    return(
        <Crate className={`${cn(agenrapButtonVariants({variant,size,className})) +`${isLoading && variant=="purplerap"?" animate-spin transition-all ":""}`}`} disabled={disabled || isLoading} {...props}>
            {children? isLoading && variant!="purplerap"?"Carregando...":children:icon?icon:children}
        </Crate>
    )
}