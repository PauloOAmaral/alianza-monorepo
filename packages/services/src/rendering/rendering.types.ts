export interface GeneratePdfOptions {
    cookies?: string | null
}

export interface GeneratePdfResponse {
    success: boolean
    data?: ReadableStream<Uint8Array>
    error?: string
}
