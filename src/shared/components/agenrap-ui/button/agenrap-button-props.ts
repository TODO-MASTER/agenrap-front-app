import { agenrapButtonVariants } from "@/src/shared/components/agenrap-ui/button/agenrap-button-variants";
import { VariantProps } from "class-variance-authority";


export type AgenrapButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof agenrapButtonVariants> & {
    asChild?: boolean
    asThouched?: boolean
    isLoading?: boolean
    icon?: boolean
    hrefLink?: string
    plusClassName?: string
  }