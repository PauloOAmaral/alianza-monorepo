import { env } from "cloudflare:workers"
import { R2FileStorage } from "./cloudflare-r2"
import type { FileStorage } from "./storage.types"

type Buckets = {
    IMAGES_BUCKET?: R2Bucket
    VIDEOS_BUCKET?: R2Bucket
    DOCUMENTS_BUCKET?: R2Bucket
}

const buckets = env as unknown as Buckets

export const getImagesBucket = (): FileStorage => {
    if (!buckets.IMAGES_BUCKET) {
        throw new Error("IMAGES_BUCKET binding is not configured in wrangler.jsonc")
    }

    return new R2FileStorage(buckets.IMAGES_BUCKET)
}

export const getVideosBucket = (): FileStorage => {
    if (!buckets.VIDEOS_BUCKET) {
        throw new Error("VIDEOS_BUCKET binding is not configured in wrangler.jsonc")
    }

    return new R2FileStorage(buckets.VIDEOS_BUCKET)
}

export const getDocumentsBucket = (): FileStorage => {
    if (!buckets.DOCUMENTS_BUCKET) {
        throw new Error("DOCUMENTS_BUCKET binding is not configured in wrangler.jsonc")
    }

    return new R2FileStorage(buckets.DOCUMENTS_BUCKET)
}

export type { FileStorage }
