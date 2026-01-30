import { ENV } from '../utils/env'
import type { GeneratePdfOptions, GeneratePdfResponse } from './rendering.types'

export async function generatePdf(url: string, options?: GeneratePdfOptions): Promise<GeneratePdfResponse> {
    try {
        const accountId = ENV.CLOUDFLARE_ACCOUNT_ID
        const apiToken = ENV.CLOUDFLARE_ACCOUNT_TOKEN

        if (!accountId || !apiToken) {
            return {
                success: false,
                error: 'Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_ACCOUNT_TOKEN environment variables'
            }
        }

        const requestBody: Record<string, any> = {
            url: url
        }

        if (options?.cookies) {
            requestBody.setExtraHTTPHeaders = {
                Cookie: options.cookies
            }
        }

        requestBody.pdfOptions = {
            printBackground: true
        }

        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/pdf`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            const errorText = await response.text()
            return {
                success: false,
                error: `HTTP ${response.status}: ${errorText}`
            }
        }

        if (!response.body) {
            return {
                success: false,
                error: 'Response body is null'
            }
        }

        return {
            success: true,
            data: response.body
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}
