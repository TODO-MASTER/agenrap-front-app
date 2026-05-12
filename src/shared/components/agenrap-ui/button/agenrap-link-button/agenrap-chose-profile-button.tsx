import Link from "next/link"
import { cn } from "@/src/shared/lib/utils"
import { AgenrapButtonProps } from "@/src/shared/components/agenrap-ui/button/agenrap-button-props"
import { agenrapButtonVariants } from "@/src/shared/components/agenrap-ui/button/agenrap-button-variants"
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
}:AgenrapButtonProps){
   
    return(
      
        <Link href={hrefLink!} className={cn(agenrapButtonVariants({variant,size,className}))}>
            {children? isLoading && variant!="purplerap"?"Carregando...":children:icon?icon:children}
        </Link>
       
    )
}