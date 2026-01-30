import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerProps = {
    onSelect: (date: Date | undefined) => void
    selected: Date | undefined
    required?: boolean
    disabled?: boolean
}

export function DatePicker({ onSelect, selected, required, disabled }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal' data-empty={!selected} variant='outline'>
                    <CalendarIcon />
                    {selected ? format(selected, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar disabled={disabled} mode='single' onSelect={onSelect} required={required} selected={selected} />
            </PopoverContent>
        </Popover>
    )
}
