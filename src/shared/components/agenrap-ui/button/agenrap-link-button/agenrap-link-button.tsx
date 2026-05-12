import { AgenrapButtonProps } from "@/src/shared/components/agenrap-ui/button/agenrap-button-props";
import { agenrapButtonVariants } from "@/src/shared/components/agenrap-ui/button/agenrap-button-variants";
import { cn } from "@/src/shared/lib/utils";

import Link from "next/link";



export default function AgenrapLinkButton({
    className,
    variant,
    size,
    isLoading,
    asThouched,
    asChild,
    plusClassName,
    icon,
    hrefLink,
    children,
    disabled,
    ...props
}:AgenrapButtonProps){
    const Crate = "button"
    return(
        <Link className={`${plusClassName} `} href={hrefLink!}>
        <Crate className={`${cn(agenrapButtonVariants({variant,size,className})) +`${isLoading && variant=="purplerap"?" animate-spin transition-all  w-full":""} ${plusClassName}`} `} disabled={disabled || isLoading} {...props}>
            {children? isLoading && variant!="purplerap"?"Carregando...":children:icon?icon:children}
        </Crate>
        </Link>
    )
}