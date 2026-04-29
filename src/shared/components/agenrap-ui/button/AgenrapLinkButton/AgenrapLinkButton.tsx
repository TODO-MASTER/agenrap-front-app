import { cn } from "@/src/shared/lib/utils";
import { agenrapButtonVariants } from "../AgenrapButtonVariants";
import { IAgenrapButtonProps } from "../IAgenrapButtonProps";
import Link from "next/link";



export default function AgenrapLinkButton({
    className,
    variant,
    size,
    isLoading,
    asThouched,
    asChild,
    icon,
    hrefLink,
    children,
    disabled,
    ...props
}:IAgenrapButtonProps){
    const Crate = "button"
    return(
        <Link href={hrefLink!}>
        <Crate className={`${cn(agenrapButtonVariants({variant,size,className})) +`${isLoading && variant=="purplerap"?" animate-spin transition-all w-full":""}`}`} disabled={disabled || isLoading} {...props}>
            {children? isLoading && variant!="purplerap"?"Carregando...":children:icon?icon:children}
        </Crate>
        </Link>
    )
}