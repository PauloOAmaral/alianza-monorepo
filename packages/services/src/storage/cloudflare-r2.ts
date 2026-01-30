import type {
    FileKey,
    FileMetadata,
    FileStorage,
    ListOptions,
    ListResult,
} from "@mjackson/file-storage"
import { type LazyContent, LazyFile } from "@mjackson/lazy-file"

export namespace R2FileStorage {
    export interface CustomMetadata extends Record<string, string> {
        name: string
        type: string
    }
}

/**
 * A file storage implementation for Cloudflare R2.
 *
 * Follows the (RR's M Jackson) FileStorage interface.
 *
 */
export class R2FileStorage implements FileStorage {
    constructor(protected r2: R2Bucket) {}

    async has(key: string) {
        const object = await this.r2.get(key)

        return object !== null
    }

    async set(key: string, file: File) {
        await this.put(key, file)
    }

    async put(key: string, file: File) {
        const customMetadata = {
            name: key,
            type: file.type,
        } satisfies R2FileStorage.CustomMetadata

        // Always use multipart upload since we don't know the size
        const multipartUpload = await this.r2.createMultipartUpload(key, {
            httpMetadata: { contentType: file.type },
            customMetadata,
        })

        const parts = []
        let partNumber = 1

        // Fixed 5MB buffer to limit memory usage
        const PART_SIZE = 5 * 1024 * 1024
        let buffer = new Uint8Array(PART_SIZE)
        let bufferOffset = 0

        try {
            const stream = file.stream()
            const reader = stream.getReader()

            while (true) {
                const { done, value } = await reader.read()

                if (value) {
                    let valueOffset = 0

                    while (valueOffset < value.length) {
                        // Copy data into buffer
                        const bytesToCopy = Math.min(
                            PART_SIZE - bufferOffset,
                            value.length - valueOffset,
                        )

                        buffer.set(
                            value.subarray(valueOffset, valueOffset + bytesToCopy),
                            bufferOffset,
                        )

                        bufferOffset += bytesToCopy
                        valueOffset += bytesToCopy

                        // Upload when buffer is full
                        if (bufferOffset === PART_SIZE) {
                            const uploadedPart = await multipartUpload.uploadPart(
                                partNumber,
                                buffer,
                            )

                            parts.push(uploadedPart)
                            partNumber++

                            // Reset buffer offset (reuse same buffer)
                            bufferOffset = 0
                        }
                    }
                }

                // Handle final part when stream ends
                if (done) {
                    if (bufferOffset > 0) {
                        // Upload remaining data
                        const finalPart = buffer.slice(0, bufferOffset)
                        const uploadedPart = await multipartUpload.uploadPart(partNumber, finalPart)

                        parts.push(uploadedPart)
                    } else if (parts.length === 0) {
                        // Handle empty file case
                        const uploadedPart = await multipartUpload.uploadPart(1, new Uint8Array(0))

                        parts.push(uploadedPart)
                    }
                    break
                }
            }

            await multipartUpload.complete(parts)
        } catch (error) {
            await multipartUpload.abort()

            throw error
        }

        const object = await this.get(key)

        if (!object) {
            throw new Error("failed to create file")
        }

        return object
    }

    async get(key: string) {
        const object = await this.r2.get(key)

        if (!object) {
            return null
        }

        const metadata = object.customMetadata as unknown as R2FileStorage.CustomMetadata

        const lazyContent: LazyContent = {
            byteLength: object.size,
            stream: () => object.body as unknown as ReadableStream<Uint8Array>,
        }

        const lazyFile = new LazyFile(lazyContent, metadata?.name ?? key, {
            type: object.httpMetadata?.contentType ?? metadata?.type,
            lastModified: object.uploaded.getTime(),
        })

        return lazyFile as unknown as File
    }

    async remove(key: string) {
        await this.r2.delete(key)
    }

    async list<T extends ListOptions>(options?: T): Promise<ListResult<T>> {
        const result = await this.r2.list({
            cursor: options?.cursor,
            limit: options?.limit,
            prefix: options?.prefix,
        })

        return {
            files: result.objects.map((object) => {
                const metadata = object.customMetadata as unknown as R2FileStorage.CustomMetadata

                if (options?.includeMetadata === true) {
                    return {
                        key: object.key,
                        lastModified: object.uploaded.getTime(),
                        size: object.size,
                        name: metadata?.name ?? object.key,
                        type: object.httpMetadata?.contentType ?? metadata?.type,
                    } satisfies FileMetadata
                }

                return { key: object.key } satisfies FileKey
            }) as ListResult<T>["files"],
            cursor: result.truncated ? result.cursor : undefined,
        }
    }
}
