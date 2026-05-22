import { VariantProps } from "class-variance-authority";
import { agenrapInputVariants } from "./agenrap-input-variants";
import React from "react";

export type  AgenrapInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,"size"> & VariantProps<typeof agenrapInputVariants>&{
    label?:string,
    error?:string,
    icon?:React.ReactNode,
    left?:boolean,
    removeFormMessage?:boolean,
    labelIcon?:React.ReactNode
    
}