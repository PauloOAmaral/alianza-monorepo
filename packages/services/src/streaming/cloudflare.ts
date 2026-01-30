import { AwsClient } from 'aws4fetch'
import { ENV } from '~/utils/env'
import type {
    CloudflareAPIResponse,
    CloudflareStreamConfig,
    CloudflareStreamResponse,
    ImportVideoRequest,
    ImportVideoResponse,
    ImportVideoResult,
    SignedUrlOptions,
    SignedUrlResult,
    VideoStatus,
    VideoStatusResponse
} from './streaming.types'

// Get configuration from environment variables
function getConfig(): CloudflareStreamConfig {
    const requiredEnvVars = {
        r2Region: ENV.CLOUDFLARE_R2_REGION,
        r2AccessKeyId: ENV.CLOUDFLARE_R2_ACCESS_KEY_ID,
        r2SecretAccessKey: ENV.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        accountId: ENV.CLOUDFLARE_ACCOUNT_ID,
        accountToken: ENV.CLOUDFLARE_ACCOUNT_TOKEN
    }

    // Check for missing environment variables
    const missingVars = Object.entries(requiredEnvVars)
        .filter(([_, value]) => !value)
        .map(([key, _]) => key)

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    }

    return requiredEnvVars as CloudflareStreamConfig
}

/**
 * Generate a signed URL for R2 object access using aws4fetch
 */
async function generateR2SignedUrl(bucketName: string, objectKey: string, expiresInSeconds = 3600): Promise<string> {
    const config = getConfig()

    const client = new AwsClient({
        service: 's3',
        region: config.r2Region,
        accessKeyId: config.r2AccessKeyId,
        secretAccessKey: config.r2SecretAccessKey
    })

    const r2Url = `https://${config.accountId}.r2.cloudflarestorage.com`
    const requestUrl = `${r2Url}/${bucketName}/${objectKey}?X-Amz-Expires=${expiresInSeconds}`

    const signed = await client.sign(new Request(requestUrl), { aws: { signQuery: true } })

    return signed.url.toString()
}

/**
 * Generate a signed URL for Stream video access
 */
function arrayBufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
    const uint8Array = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer
    return btoa(String.fromCharCode(...uint8Array))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}

function objectToBase64url(payload: any): string {
    return arrayBufferToBase64Url(new TextEncoder().encode(JSON.stringify(payload)))
}

/**
 * Import a video from private R2 bucket to Cloudflare Stream
 */
export async function importVideoFromR2(bucketName: string, objectKey: string, metadata: ImportVideoRequest['meta'] = {}): Promise<CloudflareStreamResponse<ImportVideoResult>> {
    try {
        const config = getConfig()

        // Generate signed URL for R2 object (valid for 1 hour)
        const signedR2Url = await generateR2SignedUrl(bucketName, objectKey, 3600)

        // Import video to Stream using the signed URL
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.accountId}/stream/copy`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${config.accountToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: signedR2Url,
                meta: {
                    name: metadata.name || objectKey,
                    ...metadata
                },
                requireSignedURLs: false, // Enable signed URLs for the imported video
                allowedOrigins: metadata.allowedOrigins || [], // Optional: restrict origins
                thumbnailTimestampPct: metadata.thumbnailTimestampPct || 0.5 // Generate thumbnail at 50%
            })
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const result = (await response.json()) as CloudflareAPIResponse<ImportVideoResponse>

        if (!result.success) {
            throw new Error(`Failed to import video: ${result.errors?.[0]?.message || 'Unknown error'}`)
        }

        return {
            success: true,
            data: {
                videoId: result.result.uid,
                status: result.result.status.state,
                thumbnail: result.result.thumbnail,
                preview: result.result.preview,
                duration: result.result.duration,
                created: result.result.created,
                meta: result.result.meta
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Generate signed URLs for different Stream endpoints
 */
export async function createStreamToken(videoId: string, options: SignedUrlOptions = {}): Promise<CloudflareStreamResponse<string>> {
    try {
        const result = await generateStreamSignedUrl(videoId, options)

        return {
            success: true,
            data: result.token
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Check video processing status
 */
export async function getVideoStatus(videoId: string): Promise<CloudflareStreamResponse<VideoStatus>> {
    try {
        const config = getConfig()

        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.accountId}/stream/${videoId}`, {
            headers: {
                Authorization: `Bearer ${config.accountToken}`
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result = (await response.json()) as CloudflareAPIResponse<VideoStatusResponse>

        if (!result.success) {
            throw new Error(`Failed to get video status: ${result.errors?.[0]?.message || 'Unknown error'}`)
        }

        return {
            success: true,
            data: {
                status: result.result.status.state,
                duration: result.result.duration,
                thumbnail: result.result.thumbnail,
                preview: result.result.preview,
                playbook: result.result.playbook,
                meta: result.result.meta
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Delete a video from Cloudflare Stream
 */
export async function deleteVideo(videoId: string): Promise<CloudflareStreamResponse<null>> {
    try {
        const config = getConfig()

        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.accountId}/stream/${videoId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${config.accountToken}`
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result = (await response.json()) as CloudflareAPIResponse<{ uid: string }>

        if (!result.success) {
            throw new Error(`Failed to delete video: ${result.errors?.[0]?.message || 'Unknown error'}`)
        }

        return {
            success: true,
            data: null
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Find videos by filename in metadata
 */
export async function findVideosByFilename(filename: string): Promise<CloudflareStreamResponse<VideoStatusResponse[]>> {
    try {
        const config = getConfig()

        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.accountId}/stream?search=${filename}`, {
            headers: {
                Authorization: `Bearer ${config.accountToken}`
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result = (await response.json()) as CloudflareAPIResponse<VideoStatusResponse[]>

        if (!result.success) {
            throw new Error(`Failed to search videos: ${result.errors?.[0]?.message || 'Unknown error'}`)
        }

        // Filter videos that have the exact filename in their metadata
        return {
            success: true,
            data: result.result.filter(video => {
                return video.meta?.name === filename || video.meta?.filename === filename
            })
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Find a single video by filename (returns the first match)
 */
export async function findVideoByFilename(filename: string): Promise<CloudflareStreamResponse<VideoStatusResponse>> {
    try {
        const videos = await findVideosByFilename(filename)

        if (!videos.success || !videos.data?.[0]) {
            throw new Error(`No video found with filename: ${filename}`)
        }

        return {
            success: true,
            data: videos.data?.[0]
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}
