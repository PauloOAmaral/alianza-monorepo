import sanitize from "sanitize-filename"

export function sanitizeFileName(fileName: string) {
    return sanitize(fileName)
}

export function getReadableFileSize(file: File): string
export function getReadableFileSize(size: number): string
export function getReadableFileSize(input: File | number): string {
    const size = typeof input === "number" ? input : input.size
    const i = Math.floor(Math.log(size) / Math.log(1024))
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    return `${Math.round(size / 1024 ** i)} ${sizes[i]}`
}
