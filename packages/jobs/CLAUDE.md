# Jobs Package - Cloudflare Workers Cron Jobs

## Overview
The jobs package implements automated background tasks and cron jobs that run on Cloudflare Workers. It provides a robust job management system with logging, error handling, metrics collection, and retry mechanisms for processing queued tasks.

## Technology Stack
- **Runtime**: Cloudflare Workers
- **Deployment**: Wrangler CLI
- **Scheduling**: Cloudflare Workers Cron Triggers
- **Database**: `@alianza/database` for data persistence
- **Services**: `@alianza/services` for external integrations

## Architecture

### Job Manager System
The package implements a centralized job management system that handles:
- Job registration with cron expressions
- Execution orchestration
- Timeout management
- Retry mechanisms
- Error handling and logging
- Metrics collection

### Project Structure
```
src/
├── index.ts              # Main worker entry point
├── tasks/
│   ├── index.ts         # Task exports
└── utils/
    ├── index.ts         # Utility exports
    ├── job-manager.ts   # Job orchestration
    ├── logger.ts        # Structured logging
    ├── metrics.ts       # Performance metrics
    └── error-handler.ts # Error management
```

## Core Patterns

### 1. Job Registration
Jobs are registered in the main `index.ts` file using cron expressions:

```typescript
import { processStreamingVideoQueue } from "./tasks"
import { jobManager } from "./utils"

// Register job with cron expression
jobManager.register("*/5 * * * *", {
    handler: processStreamingVideoQueue,
    timeout: 120000, // 2 minutes
    retry: true,
})
```

### 2. Worker Entry Point
The main worker implements the `scheduled` event handler:

```typescript
export default {
    async scheduled(controller: ScheduledController) {
        const executionId = crypto.randomUUID()
        const startTime = Date.now()

        // Set logging context
        logger.setContext({
            cronExpression: controller.cron,
            executionId,
            scheduledTime: controller.scheduledTime,
        })

        logger.info("Cron job triggered")

        try {
            // Execute registered jobs
            const results = await jobManager.execute(controller.cron, executionId)

            // Log execution results
            const duration = Date.now() - startTime
            const successCount = results.filter((r) => r.success).length
            const failureCount = results.filter((r) => !r.success).length

            logger.info("Cron job execution completed", {
                totalDuration: duration,
                totalJobs: results.length,
                successCount,
                failureCount,
            })

            metricsCollector.logMetrics()
        } catch (error) {
            logger.error("Cron job execution failed", error)
        }
    },
}
```

## Task Implementation Patterns

### Basic Task Structure
```typescript
export const taskName = async () => {
    const jobLogger = logger.child({ task: "taskName" })
    const db = createMainDbClient()

    jobLogger.debug("Starting task execution")

    try {
        // Task implementation
        const items = await db.query.table.findMany({
            where: eq(table.status, "pending"),
        })

        jobLogger.info(`Found ${items.length} items to process`)

        const results = {
            processed: 0,
            success: 0,
            failed: 0,
        }

        for (const item of items) {
            const itemLogger = jobLogger.child({ itemId: item.id })

            try {
                // Process individual item
                await processItem(item)
                
                // Update database
                await db
                    .update(table)
                    .set({ status: "completed", processedAt: new Date() })
                    .where(eq(table.id, item.id))

                itemLogger.info("Item processed successfully")
                results.success++
            } catch (error) {
                itemLogger.error("Failed to process item", error)
                results.failed++
            }

            results.processed++
        }

        jobLogger.info("Task execution completed", results)
    } catch (error) {
        jobLogger.error("Task execution failed", error)
        throw error
    }
}
```

### Video Processing Task Example
```typescript
export const processStreamingVideoQueue = async () => {
    const jobLogger = logger.child({ task: "processStreamingVideoQueue" })
    const db = createMainDbClient()

    // Query videos in queued status
    const processingVideos = await db.query.streamings.findMany({
        columns: {
            id: true,
            externalId: true,
            status: true,
        },
        where: (streaming, { eq, and }) =>
            and(
                eq(streaming.status, "queued"), 
                eq(streaming.provider, "cloudflare")
            ),
    })

    jobLogger.info(`Found ${processingVideos.length} videos to process`)

    for (const video of processingVideos) {
        const videoLogger = jobLogger.child({
            videoId: video.id,
            externalId: video.externalId,
        })

        try {
            // Check external service status
            const videoResult = await getVideoStatus(video.externalId)

            if (!videoResult.success) {
                throw new Error(`Failed to get video status: ${videoResult.error}`)
            }

            // Update based on external status
            if (videoResult.data.status === "ready") {
                await db
                    .update(streamings)
                    .set({ 
                        status: "ready", 
                        duration: videoResult.data.duration?.toString() 
                    })
                    .where(eq(streamings.id, video.id))

                videoLogger.info("Video marked as ready")
            } else if (videoResult.data.status === "error") {
                await db
                    .update(streamings)
                    .set({ status: "error" })
                    .where(eq(streamings.id, video.id))

                videoLogger.warn("Video marked as error")
            }
        } catch (error) {
            videoLogger.error("Failed to process video", error)
        }
    }
}
```

## Logging Patterns

### Structured Logging
```typescript
import { logger } from "../utils"

// Create child logger with context
const jobLogger = logger.child({ 
    task: "taskName",
    jobId: "unique-id" 
})

// Different log levels
jobLogger.debug("Debug information", { additionalContext })
jobLogger.info("Information message", { data })
jobLogger.warn("Warning message", { context })
jobLogger.error("Error occurred", error, { context })

// Set global context
logger.setContext({
    cronExpression: "*/5 * * * *",
    executionId: "exec-123",
    scheduledTime: new Date(),
})
```

### Contextual Logging
```typescript
// Parent context
const taskLogger = logger.child({ task: "processItems" })

// Item-specific context
for (const item of items) {
    const itemLogger = taskLogger.child({ 
        itemId: item.id,
        itemType: item.type 
    })
    
    itemLogger.info("Processing item")
    
    try {
        await processItem(item)
        itemLogger.info("Item processed successfully")
    } catch (error) {
        itemLogger.error("Item processing failed", error)
    }
}
```

## Job Manager Configuration

### Job Registration Options
```typescript
interface JobConfig {
    handler: () => Promise<void>  // Task function
    timeout?: number             // Timeout in milliseconds
    retry?: boolean             // Enable retry on failure
    maxRetries?: number         // Maximum retry attempts
    retryDelay?: number         // Delay between retries
}

// Register with configuration
jobManager.register("0 */6 * * *", {
    handler: heavyProcessingTask,
    timeout: 300000,    // 5 minutes
    retry: true,
    maxRetries: 3,
    retryDelay: 30000,  // 30 seconds
})
```

### Execution Results
```typescript
interface JobResult {
    jobName: string
    success: boolean
    duration: number
    error?: Error
    retryCount?: number
}

// Job manager returns execution results
const results = await jobManager.execute(cronExpression, executionId)

// Process results
results.forEach(result => {
    if (result.success) {
        console.log(`Job ${result.jobName} completed in ${result.duration}ms`)
    } else {
        console.error(`Job ${result.jobName} failed: ${result.error?.message}`)
    }
})
```

## Error Handling Patterns

### Task-Level Error Handling
```typescript
export const robustTask = async () => {
    const jobLogger = logger.child({ task: "robustTask" })

    try {
        // Main task logic
        await performMainOperation()
        
        jobLogger.info("Task completed successfully")
    } catch (error) {
        // Log error with context
        jobLogger.error("Task failed", error)
        
        // Optionally perform cleanup
        await performCleanup()
        
        // Re-throw to trigger retry mechanism
        throw error
    }
}
```

### Item-Level Error Handling
```typescript
const results = { processed: 0, success: 0, failed: 0 }

for (const item of items) {
    try {
        await processItem(item)
        results.success++
    } catch (error) {
        // Log individual item failure
        logger.error("Item processing failed", error, { itemId: item.id })
        
        // Mark item as failed
        await markItemAsFailed(item.id, error.message)
        
        results.failed++
    } finally {
        results.processed++
    }
}

// Continue processing other items even if some fail
logger.info("Batch processing completed", results)
```

## Metrics and Monitoring

### Performance Metrics
```typescript
import { metricsCollector } from "../utils"

export const monitoredTask = async () => {
    const startTime = Date.now()
    
    try {
        // Task implementation
        await performTask()
        
        // Record success metrics
        metricsCollector.recordTaskDuration(
            "taskName", 
            Date.now() - startTime
        )
        metricsCollector.incrementTaskSuccess("taskName")
        
    } catch (error) {
        // Record failure metrics
        metricsCollector.incrementTaskFailure("taskName")
        throw error
    }
}
```

### Health Checks
```typescript
export const healthCheckTask = async () => {
    const checks = {
        database: false,
        externalService: false,
        storage: false,
    }

    try {
        // Database connectivity
        const db = createMainDbClient()
        await db.query.users.findFirst({ columns: { id: true } })
        checks.database = true

        // External service availability
        const serviceResult = await checkExternalService()
        checks.externalService = serviceResult.success

        // Storage accessibility
        const storageResult = await checkStorageHealth()
        checks.storage = storageResult.success

    } catch (error) {
        logger.error("Health check failed", error)
    }

    logger.info("Health check completed", checks)
    metricsCollector.recordHealthCheck(checks)
}
```

## Development and Deployment

### Development Scripts
```bash
# Local development with test scheduling
bun run dev                   # Start local dev server with test scheduled events

# View logs from deployed worker
bun run tail                  # Tail logs from Cloudflare Workers

# Code quality
bun run lint                  # Lint with Biome
bun run format                # Format with Biome
bun run typecheck             # TypeScript validation

# Cleanup
bun run clean                 # Remove generated files and dependencies
```

### Wrangler Configuration
Jobs are deployed using Wrangler with environment-specific configurations:

```toml
# wrangler.toml
[env.local]
compatibility_date = "2024-01-01"
crons = ["*/5 * * * *"]

[env.dev]  
compatibility_date = "2024-01-01"
crons = ["*/10 * * * *"]

[env.uat]
compatibility_date = "2024-01-01"
crons = ["*/15 * * * *"]
```

### Environment Variables
```bash
# Required environment variables
DATABASE_URL=...
CLOUDFLARE_STREAM_API_TOKEN=...
RESEND_API_KEY=...

# Optional configuration
LOG_LEVEL=info
METRICS_ENABLED=true
```

## Cron Expression Patterns

### Common Schedules
```typescript
// Every 5 minutes
"*/5 * * * *"

// Every hour at minute 0
"0 * * * *"

// Every 6 hours
"0 */6 * * *"

// Daily at 2:00 AM
"0 2 * * *"

// Weekly on Sundays at midnight
"0 0 * * 0"

// Monthly on the 1st at midnight
"0 0 1 * *"
```

### Task Scheduling Examples
```typescript
// High-frequency tasks
jobManager.register("*/1 * * * *", {  // Every minute
    handler: criticalMonitoringTask,
    timeout: 30000,
})

// Medium-frequency tasks  
jobManager.register("*/15 * * * *", { // Every 15 minutes
    handler: dataProcessingTask,
    timeout: 600000,
})

// Low-frequency tasks
jobManager.register("0 2 * * *", {    // Daily at 2 AM
    handler: dailyCleanupTask,
    timeout: 1800000, // 30 minutes
})
```

## Best Practices

### 1. Task Design
- **Idempotent Operations**: Tasks should be safe to run multiple times
- **Atomic Updates**: Use database transactions for consistency
- **Graceful Degradation**: Handle partial failures appropriately
- **Resource Limits**: Respect Cloudflare Workers CPU and memory limits

### 2. Error Handling
- **Comprehensive Logging**: Log all errors with sufficient context
- **Retry Strategy**: Implement appropriate retry mechanisms
- **Circuit Breakers**: Avoid cascading failures
- **Dead Letter Queues**: Handle permanently failed items

### 3. Performance
- **Batch Processing**: Process items in efficient batches
- **Parallel Execution**: Use Promise.all for independent operations
- **Resource Management**: Clean up database connections and resources
- **Timeout Management**: Set appropriate timeouts for operations

### 4. Monitoring
- **Structured Logging**: Use consistent log formats
- **Metrics Collection**: Track key performance indicators
- **Health Checks**: Implement system health monitoring
- **Alerting**: Set up alerts for critical failures

### 5. Database Operations
- **Connection Management**: Always create new database clients
- **Query Optimization**: Use efficient queries with proper indexing
- **Transaction Usage**: Use transactions for multi-table operations
- **Soft Deletes**: Prefer soft deletes for audit trails

## Common Task Types

### 1. Queue Processing
```typescript
export const processEmailQueue = async () => {
    const emails = await db.query.emailQueue.findMany({
        where: eq(emailQueue.status, "pending"),
        limit: 50, // Process in batches
    })

    for (const email of emails) {
        try {
            await sendEmail(email)
            await markEmailAsSent(email.id)
        } catch (error) {
            await markEmailAsFailed(email.id, error.message)
        }
    }
}
```

### 2. Data Synchronization
```typescript
export const syncExternalData = async () => {
    const lastSync = await getLastSyncTimestamp()
    const externalData = await fetchExternalData(lastSync)

    for (const item of externalData) {
        await upsertLocalData(item)
    }

    await updateLastSyncTimestamp(new Date())
}
```

### 3. Cleanup Tasks
```typescript
export const cleanupExpiredSessions = async () => {
    const expiredSessions = await db.query.userSessions.findMany({
        where: lt(userSessions.expiresAt, new Date()),
    })

    for (const session of expiredSessions) {
        await db.delete(userSessions).where(eq(userSessions.id, session.id))
    }
}
```

### 4. Report Generation
```typescript
export const generateDailyReports = async () => {
    const reportData = await aggregateReportData()
    const report = await generateReport(reportData)
    await storeReport(report)
    await notifyStakeholders(report)
}
```

## Dependencies

### Core Dependencies
- `@alianza/database` - Database operations
- `@alianza/services` - External service integrations

### Development Dependencies
- `wrangler` - Deployment and development tools

### Runtime Requirements
- Cloudflare Workers Runtime
- Scheduled event triggers
- Environment variable access
- Fetch API for external calls

## Testing Strategies

### Local Testing
```bash
# Test with scheduled events
bun run dev --test-scheduled

# Manual trigger for testing
wrangler dev --test-scheduled --local
```

### Integration Testing
```typescript
// Test individual tasks
await processStreamingVideoQueue()

// Test job manager
const results = await jobManager.execute("*/5 * * * *", "test-exec-id")
```

This jobs package provides a robust foundation for running automated tasks in a Cloudflare Workers environment, with comprehensive error handling, logging, and monitoring capabilities.
