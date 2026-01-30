import type { FileUpload } from "@mjackson/form-data-parser"
import { getDocumentsBucket, getImagesBucket } from "@alianza/services/storage"
import { sanitizeFileName } from "@alianza/utils/io"

type Storage =
    | "images:avatars"
    | "documents:cet"
    | "documents:sac-option"
    | "documents:regulatory-responsible"
    | "documents:quality-policy"
    | "documents:factory-info"

type BucketName = Storage extends `${infer B}:${string}` ? B : never
type FolderName = Storage extends `${string}:${infer F}` ? F : never

interface UploadHandlerOptions {
    fieldMappings: {
        field: string
        storage: Storage
    }[]
}

function getBucketAndFolder(bucket: Storage) {
    const [bucketName, folderName] = bucket.split(":") as [BucketName, FolderName]

    if (!bucketName) {
        throw new Error(`Bucket ${bucketName} not found`)
    }

    if (!folderName) {
        throw new Error(`Folder ${folderName} not found`)
    }

    return {
        bucketName,
        folderName,
    }
}

const getBucket = (bucketName: BucketName) => {
    switch (bucketName) {
        case "images":
            return getImagesBucket()
        case "documents":
            return getDocumentsBucket()
        default:
            throw new Error(`Bucket ${bucketName} not found`)
    }
}

export const uploadHandler = async (fileUpload: FileUpload, options: UploadHandlerOptions) => {
    const { fieldMappings } = options

    if (!fileUpload.fieldName) {
        throw new Error("Field name is required for file upload")
    }

    // Some fields may have array notation (e.g., "files[0]")
    const fieldName = fileUpload.fieldName.replace(/\[\d+\]$/, "")
    const mapping = fieldMappings.find((m) => m.field === fieldName)

    if (!mapping) {
        throw new Error(`No field mapping found for field: ${fileUpload.fieldName}`)
    }

    const { storage } = mapping
    const { bucketName, folderName } = getBucketAndFolder(storage)

    const key = `${folderName}/${Date.now()}-${sanitizeFileName(fileUpload.name)}`

    //@ts-expect-error - FileUpload is not a File
    const file = await getBucket(bucketName).put(key, fileUpload)

    return file
}
