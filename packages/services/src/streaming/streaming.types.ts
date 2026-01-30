// Cloudflare Stream API Types
// Based on: https://developers.cloudflare.com/api/operations/stream-videos-list-videos

export type CloudflareStreamResponse<T> =
    | {
        success: true
        data: T
    }
    | {
        success: false
        error: string | null
    }

export interface CloudflareStreamConfig {
    r2Region: string
    r2AccessKeyId: string
    r2SecretAccessKey: string
    accountId: string
    accountToken: string
}

// Common API Response Structure
export interface CloudflareAPIResponse<T = any> {
    success: boolean
    errors?: Array<{
        code: number
        message: string
    }>
    messages?: Array<{
        code: number
        message: string
    }>
    result: T
}

// Video Import/Copy API
export interface ImportVideoRequest {
    url: string
    meta?: {
        name?: string
        [key: string]: any
    }
    requireSignedURLs?: boolean
    allowedOrigins?: string[]
    thumbnailTimestampPct?: number
}

export interface ImportVideoResponse {
    uid: string
    status: {
        state: "pending" | "downloading" | "queued" | "inprogress" | "ready" | "error"
        pctComplete: string
        errorReasonCode: string
        errorReasonText: string
    }
    thumbnail?: string
    preview?: string
    duration?: number
    created: string
    modified: string
    meta: Record<string, any>
}

// Video Status API
export interface VideoStatusResponse {
    uid: string
    status: {
        state: "pending" | "downloading" | "queued" | "inprogress" | "ready" | "error"
        pctComplete: string
        errorReasonCode: string
        errorReasonText: string
    }
    thumbnail?: string
    preview?: string
    duration?: number
    created: string
    modified: string
    meta: Record<string, any>
    input?: {
        width: number
        height: number
        duration: number
    }
    playback?: {
        hls: string
        dash: string
    }
    playbook?: Record<string, any>
}

// Signed URL Options
export interface SignedUrlOptions {
    expiresInHours?: number
    userId?: string
    allowedIPs?: string[]
    customClaims?: Record<string, any>
}

// Signed URL Result
export interface SignedUrlResult {
    signedUrl: string
    token: string
    expiresAt: string
    expiresIn: number
}

// Service Result Types using discriminated unions
export interface ImportVideoResult {
    videoId: string
    status: string
    created: string
    meta: Record<string, any>
    thumbnail?: string
    preview?: string
    duration?: number
}

export interface VideoStatus {
    status: "pending" | "downloading" | "queued" | "inprogress" | "ready" | "error"
    duration?: number
    thumbnail?: string
    preview?: string
    playbook?: Record<string, any>
    meta: Record<string, any>
}

export interface CreateStreamTokenResult {
    token: string
}

export interface FindVideoResult extends VideoStatusResponse { }
