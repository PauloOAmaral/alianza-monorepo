import { Slot as ReactSlot } from "@radix-ui/react-slot"

export interface SlotProps extends React.AllHTMLAttributes<HTMLElement> {
    children?: React.ReactNode
}

const Slot = ReactSlot as React.ForwardRefExoticComponent<
    SlotProps &
        React.RefAttributes<HTMLElement> & {
            [key: string]: any
        }
>

export { Slot }
