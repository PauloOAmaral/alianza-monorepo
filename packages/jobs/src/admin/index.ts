import { jobManager, logger, metricsCollector } from "@alianza/utils/jobs"

export default {
    async scheduled(controller: ScheduledController) {
        const executionId = crypto.randomUUID()
        const startTime = Date.now()

        logger.setContext({
            cronExpression: controller.cron,
            executionId,
            scheduledTime: controller.scheduledTime,
        })

        logger.info("Cron job triggered")

        try {
            const results = await jobManager.execute(controller.cron, executionId)
            const duration = Date.now() - startTime
            const successCount = results.filter((r) => r.success).length
            const failureCount = results.filter((r) => !r.success).length

            logger.info("Cron job execution completed", {
                totalDuration: duration,
                totalJobs: results.length,
                successCount,
                failureCount,
                results: results.map((r) => ({
                    jobName: r.jobName,
                    success: r.success,
                    duration: r.duration,
                    error: r.error?.message,
                })),
            })

            metricsCollector.logMetrics()
        } catch (error) {
            const duration = Date.now() - startTime

            logger.error("Cron job execution failed", error, { duration })
        }
    },
}
