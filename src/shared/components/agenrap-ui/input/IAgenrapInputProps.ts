import { VariantProps } from "class-variance-authority";
import { agenrapInputVariants } from "./AgenrapInputVariants";
import React from "react";

export interface IAgenrapInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,"size">,VariantProps<typeof agenrapInputVariants>{
    label?:string,
    error?:string,
    icon?:React.ReactNode,
    left?:boolean
}