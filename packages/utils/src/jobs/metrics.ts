import { logger } from "./logger"

interface JobMetrics {
    jobName: string
    executionCount: number
    successCount: number
    failureCount: number
    averageDuration: number
    lastExecution?: Date
    lastError?: string
}

class MetricsCollector {
    private metrics: Map<string, JobMetrics> = new Map()

    recordExecution(jobName: string, success: boolean, duration: number, error?: Error) {
        const existing = this.metrics.get(jobName) || {
            jobName,
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            averageDuration: 0,
        }

        existing.executionCount++

        if (success) {
            existing.successCount++
        } else {
            existing.failureCount++

            if (error) {
                existing.lastError = error.message
            }
        }

        existing.averageDuration =
            (existing.averageDuration * (existing.executionCount - 1) + duration) /
            existing.executionCount

        existing.lastExecution = new Date()

        this.metrics.set(jobName, existing)
    }

    getMetrics(jobName?: string): JobMetrics | JobMetrics[] | undefined {
        if (jobName) {
            return this.metrics.get(jobName)
        }

        return Array.from(this.metrics.values())
    }

    logMetrics() {
        const allMetrics = this.getMetrics() as JobMetrics[]

        logger.info("Job execution metrics", {
            metrics: allMetrics.map((m) => ({
                jobName: m.jobName,
                executionCount: m.executionCount,
                successRate:
                    m.executionCount > 0
                        ? `${((m.successCount / m.executionCount) * 100).toFixed(2)}%`
                        : "N/A",
                averageDuration: Math.round(m.averageDuration),
                lastExecution: m.lastExecution?.toISOString(),
                lastError: m.lastError,
            })),
        })
    }

    reset() {
        this.metrics.clear()
    }
}

export const metricsCollector = new MetricsCollector()
