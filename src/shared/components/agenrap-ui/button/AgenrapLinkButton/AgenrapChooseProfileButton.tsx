import Link from "next/link"
import { IAgenrapButtonProps } from "../IAgenrapButtonProps"
import { cn } from "@/src/shared/lib/utils"
import { agenrapButtonVariants } from "../AgenrapButtonVariants"

export default function AgenrapChooseProfileButton({
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
   
    return(
      
        <Link href={hrefLink!} className={cn(agenrapButtonVariants({variant,size,className}))}>
            {children? isLoading && variant!="purplerap"?"Carregando...":children:icon?icon:children}
        </Link>
       
    )
}