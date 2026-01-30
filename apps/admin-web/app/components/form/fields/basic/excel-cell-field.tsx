import { FormControl, FormField, FormItem, FormLabel } from "@alianza/ui/form-control"
import { Input } from "@alianza/ui/input"
import { type FieldPath, type FieldValues, useFormContext } from "react-hook-form"

interface ExcelCellFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>
}

function ExcelCellField<TFieldValues extends FieldValues = FieldValues>({
    name,
}: ExcelCellFieldProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">{String(name)}</FormLabel>
                    <FormControl className="border-0">
                        <Input
                            {...field}
                            className="border-0 shadow-0 h-full focus-visible:ring-0 focus-visible:border-0 focus:outline-0 focus:border-none w-full px-1 py-2 rounded-none text-sm"
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

ExcelCellField.displayName = "ExcelCellField"

export { ExcelCellField }
export type { ExcelCellFieldProps }
