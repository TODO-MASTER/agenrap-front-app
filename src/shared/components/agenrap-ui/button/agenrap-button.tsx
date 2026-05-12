import { AgenrapButtonProps } from "@/src/shared/components/agenrap-ui/button/agenrap-button-props";
import { agenrapButtonVariants } from "@/src/shared/components/agenrap-ui/button/agenrap-button-variants";
import { cn } from "@/src/shared/lib/utils";



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
}:AgenrapButtonProps){
    const Crate = "button"
    return(
        <Crate className={`${cn(agenrapButtonVariants({variant,size,className})) +`${isLoading && variant=="purplerap"?" animate-spin transition-all ":""}`}`} disabled={disabled || isLoading} {...props}>
            {children? isLoading && variant!="purplerap"?"Carregando...":children:icon?icon:children}
        </Crate>
    )
}