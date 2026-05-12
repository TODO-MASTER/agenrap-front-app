"use client"
import { agenrapInputVariants } from "./agenrap-input-variants";

import { cn } from "@/src/shared/lib/utils";

import { labelErrorStyles } from "@/src/shared/components/agenrap-ui/input/agenrap-input";
import { AgenrapInputProps } from "@/src/shared/components/agenrap-ui/input/agenrap-input-props.type";


export default function AgenrapNfmInput({ className, size, variant,error, allErrors, id, icon, label, left,removeFormMessage, ...props }: AgenrapInputProps) {
    
    const hasError = error 

  

    const styles = labelErrorStyles[variant || 'brownrap']

    return (
        <div className="flex flex-col gap-y-2">
            {label && <label htmlFor={`${id}`} className={styles.label}>{label}</label>}
            <div className={`${!hasError 
                ? cn(agenrapInputVariants({ variant, size, className })) 
                : cn(agenrapInputVariants({ allErrors}))} rounded-[2px] pr-2`}
            >
                {icon && !left ? icon : null}
                <input id={`${id}`} className="border-0 outline-0 p-1 pl-2 w-full h-8.75 bg-transparent [&::-webkit-calendar-picker-indicator]:hidden  font-tree font-medium text-sm" {...props} />
                {icon && left ? icon : null}
            </div>
            {removeFormMessage?null:   <p className={styles.error}> </p>}
         
        </div>
    )
}