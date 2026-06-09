import { Button } from "@/src/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/shared/components/ui/popover";
export type TriggerPopoverProps = {
    children: React.ReactNode,
    gun: React.ReactNode
}
export default function AgenrapPopover({ children, gun }: TriggerPopoverProps) {
    return (
        <Popover  >
            <PopoverTrigger  asChild>
                {gun}
            </PopoverTrigger>
            <PopoverContent className="border-2 border-(--agenrap-purple-500)" align="end">
                {children}
            </PopoverContent>
        </Popover>
    )
}