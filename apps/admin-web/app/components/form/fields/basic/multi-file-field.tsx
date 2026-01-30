import { Button } from "@alianza/ui/button"
import { FileDropZone, FileUpload, FileUploadTrigger } from "@alianza/ui/file-upload"
import { FormControl, FormError, FormField, FormItem } from "@alianza/ui/form-control"
import { Eye, FileText, Trash2, UploadIcon } from "@alianza/ui/icons"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface MultiFileFieldProps {
    name: string
    maxNumberOfFiles?: number
}

const MultiFileField = ({ name, maxNumberOfFiles }: MultiFileFieldProps) => {
    const { t } = useTranslation()
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const files = field.value || []

                function getFileUniqueId(file: File): string {
                    return `${file.name}-${file.size}-${file.lastModified}-${file.type}`
                }

                function handleRemoveFile(fileToRemove: File) {
                    const fileId = getFileUniqueId(fileToRemove)
                    const updatedFiles = files.filter(
                        (file: File) => getFileUniqueId(file) !== fileId,
                    )

                    field.onChange(updatedFiles)
                }

                function handlePreviewFile(file: File) {
                    const url = URL.createObjectURL(file)

                    window.open(url, "_blank")

                    setTimeout(() => URL.revokeObjectURL(url), 100)
                }

                return (
                    <FormItem>
                        <FormControl>
                            <div className="flex flex-col gap-4">
                                {files.length > 0 && (
                                    <div className="grid grid-cols-3 gap-4">
                                        {files.map((file: File) => (
                                            <div
                                                className="border rounded p-3 flex items-center justify-between bg-white"
                                                key={getFileUniqueId(file)}
                                            >
                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                    <FileText className="h-5 w-5 text-red-500 shrink-0" />
                                                    <span className="text-sm text-gray-700 truncate">
                                                        {file.name}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2 shrink-0">
                                                    <button
                                                        className="text-gray-400 hover:text-gray-600"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handlePreviewFile(file)
                                                        }}
                                                        type="button"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="text-gray-400 hover:text-red-500"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleRemoveFile(file)
                                                        }}
                                                        type="button"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                    allowsMultiple
                                    maxNumberOfFiles={maxNumberOfFiles ?? 100}
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    onSelect={(selectedFiles) => {
                                        field.onChange(selectedFiles || [])
                                    }}
                                    value={files}
                                >
                                    <FileDropZone className="border-primary">
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
                            </div>
                        </FormControl>
                        <FormError />
                    </FormItem>
                )
            }}
        />
    )
}

MultiFileField.displayName = "MultiFileField"

export { MultiFileField }
