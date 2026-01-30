import { FormControl, FormField } from "@alianza/ui/form-control"
import { type FieldPath, type FieldValues, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface ExcelBooleanFieldProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>
}

function ExcelBooleanField<TFieldValues extends FieldValues = FieldValues>({
    name,
}: ExcelBooleanFieldProps<TFieldValues>) {
    const { control } = useFormContext<TFieldValues>()
    const { t } = useTranslation()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormControl className="border-0">
                    <div className="border-0 shadow-0 h-full focus-visible:ring-0 focus-visible:border-0 focus:outline-0 focus:border-none w-full px-2 py-2 rounded-none text-sm flex items-center">
                        {field.value === true
                            ? t("common.yes")
                            : field.value === false
                                ? t("common.no")
                                : ""}
                    </div>
                </FormControl>
            )}
        />
    )
}

ExcelBooleanField.displayName = "ExcelBooleanField"

export { ExcelBooleanField }
export type { ExcelBooleanFieldProps }
