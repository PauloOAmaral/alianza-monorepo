import { Button } from "@alianza/ui/button"
import {
    FileDropZone,
    FileUpload,
    FileUploadDocument,
    FileUploadTrigger,
} from "@alianza/ui/file-upload"
import { FormControl, FormError, FormField, FormItem } from "@alianza/ui/form-control"
import { UploadIcon } from "@alianza/ui/icons"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface UploadDocumentFieldsProps {
    name: string
}

const UploadDocumentField = ({ name }: UploadDocumentFieldsProps) => {
    const { t } = useTranslation()
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const fileArray = field.value ? [field.value] : undefined

                return (
                    <FormItem>
                        <FormControl>
                            <FileUpload
                                acceptedFileTypes={[
                                    "application/pdf",
                                    "image/jpeg",
                                    "image/png",
                                    "image/webp",
                                    "application/msword",
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                    "application/vnd.ms-excel",
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                    "application/vnd.ms-powerpoint",
                                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                    "text/plain",
                                ]}
                                maxNumberOfFiles={1}
                                {...field}
                                onSelect={(files) => {
                                    field.onChange(files?.[0] ?? undefined)
                                }}
                                value={fileArray}
                            >
                                <FileDropZone className="border-primary">
                                    <FileUploadDocument />
                                    <FileUploadTrigger>
                                        <div className="flex flex-col items-center gap-2">
                                            <UploadIcon className="w-8 h-8 text-primary font-bold" />
                                            <Button className="text-primary" variant="link">
                                                {t("buttons.selectDocuments")}
                                            </Button>
                                        </div>
                                    </FileUploadTrigger>
                                </FileDropZone>
                            </FileUpload>
                        </FormControl>
                        <FormError />
                    </FormItem>
                )
            }}
        />
    )
}

export { UploadDocumentField }
