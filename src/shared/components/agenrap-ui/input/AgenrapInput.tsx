
"use client"
import { agenrapInputVariants } from "./AgenrapInputVariants";

import { Mail } from "lucide-react";
import { cn } from "@/src/shared/lib/utils";
import { IAgenrapInputProps } from "../input/IAgenrapInputProps";
import { FormLabel, FormMessage, useFormField } from "../../ui/form";

export default function AgenrapInput({ className, size, variant, allErrors, id, icon, label, left,removeFormMessage, ...props }: IAgenrapInputProps) {
    
    const { error } = useFormField()
    const hasError = !!error 

    const labelErrorStyles = {
        brownrap: { label: "text-black font-tree  text-sm font-medium placeholder:text-black/50", error: "" },
        brownraplight:{ label: "text-white font-tree md:text-lg text-sm font-medium  placeholder:text-white/50", error: "" },
        calyBlack: { label: "text-black", error: "bg-black/5 p-2" },
        calyGhost: { label: "text-black", error: "bg-black/5 p-2" }
    };

    const styles = labelErrorStyles[variant || 'brownrap']

    return (
        <div className="flex flex-col gap-y-2">
            {label && <FormLabel htmlFor={`${id}`} className={styles.label}>{label}</FormLabel>}
            <div className={`${!hasError 
                ? cn(agenrapInputVariants({ variant, size, className })) 
                : cn(agenrapInputVariants({ allErrors}))} rounded-[2px] pr-2`}
            >
                {icon && !left ? icon : null}
                <input id={`${id}`} className="border-0 outline-0 p-1 pl-2 w-full h-8.75 bg-transparent [&::-webkit-calendar-picker-indicator]:hidden  font-tree font-medium text-xs" {...props} />
                {icon && left ? icon : null}
            </div>
            {removeFormMessage?null:   <FormMessage className={styles.error} />}
         
        </div>
    )
}