import { logger } from './logger'

export interface RetryConfig {
    maxRetries: number
    retryDelay: number
    backoffMultiplier?: number
}

export class JobError extends Error {
    public readonly jobName: string
    public override readonly cause?: unknown
    public readonly retryable: boolean

    constructor(message: string, jobName: string, cause?: unknown, retryable = true) {
        super(message)

        this.name = 'JobError'
        this.jobName = jobName
        this.cause = cause
        this.retryable = retryable
    }
}

export async function withRetry<T>(fn: () => Promise<T>, config: RetryConfig, context: { jobName: string }): Promise<T> {
    const { maxRetries, retryDelay, backoffMultiplier = 2 } = config
    let lastError: unknown

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error

            if (error instanceof JobError && !error.retryable) {
                throw error
            }

            if (attempt < maxRetries) {
                const delay = retryDelay * backoffMultiplier ** attempt

                logger.warn('Retrying job after error', {
                    jobName: context.jobName,
                    attempt: attempt + 1,
                    maxRetries,
                    retryDelay: delay,
                    error: error instanceof Error ? error.message : String(error)
                })

                await new Promise(resolve => setTimeout(resolve, delay))
            }
        }
    }

    throw new JobError(`Job failed after ${maxRetries + 1} attempts`, context.jobName, lastError, false)
}
