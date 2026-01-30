type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
    jobName?: string
    cronExpression?: string
    executionId?: string
    duration?: number
    [key: string]: unknown
}

class Logger {
    private context: LogContext = {}

    setContext(context: LogContext) {
        this.context = { ...this.context, ...context }
    }

    private log(level: LogLevel, message: string, extra?: LogContext) {
        const timestamp = new Date().toISOString()
        const logEntry = {
            timestamp,
            level,
            message,
            ...this.context,
            ...extra
        }

        switch (level) {
            case 'debug':
                console.debug(JSON.stringify(logEntry))
                break
            case 'info':
                console.info(JSON.stringify(logEntry))
                break
            case 'warn':
                console.warn(JSON.stringify(logEntry))
                break
            case 'error':
                console.error(JSON.stringify(logEntry))
                break
        }
    }

    debug(message: string, extra?: LogContext) {
        this.log('debug', message, extra)
    }

    info(message: string, extra?: LogContext) {
        this.log('info', message, extra)
    }

    warn(message: string, extra?: LogContext) {
        this.log('warn', message, extra)
    }

    error(message: string, error?: Error | unknown, extra?: LogContext) {
        const errorDetails: LogContext = { ...extra }

        if (error instanceof Error) {
            errorDetails.errorMessage = error.message
            errorDetails.errorStack = error.stack
            errorDetails.errorName = error.name
        } else if (error) {
            errorDetails.errorDetails = error
        }

        this.log('error', message, errorDetails)
    }

    child(context: LogContext): Logger {
        const childLogger = new Logger()

        childLogger.setContext({ ...this.context, ...context })

        return childLogger
    }
}

export const logger = new Logger()
