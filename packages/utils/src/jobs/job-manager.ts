import { type RetryConfig, withRetry } from './error-handler'
import { logger } from './logger'
import { metricsCollector } from './metrics'

interface JobConfig {
    handler: () => Promise<void>
    timeout?: number
    retry?: RetryConfig | boolean
}

function camelToKebab(str: string): string {
    return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
}

interface InternalJobConfig extends JobConfig {
    name: string
}

interface JobResult {
    jobName: string
    success: boolean
    duration: number
    error?: Error
}

export class JobManager {
    private jobs: Map<string, InternalJobConfig> = new Map()

    register(cronExpression: string, config: JobConfig) {
        const jobName = camelToKebab(config.handler.name)

        this.jobs.set(cronExpression, { ...config, name: jobName })
    }

    async execute(cronExpression: string, executionId: string): Promise<JobResult[]> {
        const config = this.jobs.get(cronExpression)

        if (!config) {
            logger.warn(`No job registered for cron expression: ${cronExpression}`)

            return []
        }

        const jobLogger = logger.child({
            jobName: config.name,
            cronExpression,
            executionId
        })

        jobLogger.info('Starting job execution')
        const startTime = Date.now()

        try {
            const timeout = config.timeout || 300000 // 5 minutes default
            const executeJob = async () => {
                const timeoutPromise = new Promise<never>((_, reject) => {
                    setTimeout(() => reject(new Error(`Job timeout after ${timeout}ms`)), timeout)
                })

                await Promise.race([config.handler(), timeoutPromise])
            }

            if (config.retry) {
                const retryConfig: RetryConfig = config.retry === true ? { maxRetries: 3, retryDelay: 1000, backoffMultiplier: 2 } : config.retry

                await withRetry(executeJob, retryConfig, { jobName: config.name })
            } else {
                await executeJob()
            }

            const duration = Date.now() - startTime

            jobLogger.info('Job completed successfully', { duration })

            metricsCollector.recordExecution(config.name, true, duration)

            return [
                {
                    jobName: config.name,
                    success: true,
                    duration
                }
            ]
        } catch (error) {
            const duration = Date.now() - startTime
            const err = error instanceof Error ? error : new Error(String(error))

            jobLogger.error('Job failed', err, { duration })

            metricsCollector.recordExecution(config.name, false, duration, err)

            return [
                {
                    jobName: config.name,
                    success: false,
                    duration,
                    error: err
                }
            ]
        }
    }
}

export const jobManager = new JobManager()
