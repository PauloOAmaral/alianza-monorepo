import type { BaseUserSession } from "./auth/base"

interface BaseTriggerRequest {
    // Base trigger request interface - keeping this interface for future extensibility
    [key: string]: unknown
}

interface DataTriggerRequest<TData> {
    data: TData
}

interface AuthenticatedTriggerRequest<TSession = BaseUserSession> {
    session: TSession
}

class TriggerBuilder<TContext = BaseTriggerRequest> {
    /**
     * Add data payload to the trigger context
     */
    withData<TData>() {
        return this as unknown as TriggerBuilder<TContext & DataTriggerRequest<TData>>
    }

    /**
     * Add authentication context (session) to the trigger
     */
    withSession<TSession = BaseUserSession>() {
        return this as unknown as TriggerBuilder<TContext & AuthenticatedTriggerRequest<TSession>>
    }

    /**
     * Build the final trigger function
     */
    build<TResult>(
        triggerFn: TContext extends DataTriggerRequest<any>
            ? (request: TContext) => Promise<TResult>
            : (request: TContext) => Promise<TResult>,
    ) {
        return async (request: TContext): Promise<TResult | undefined> => {
            try {
                return await triggerFn(request)
            } catch (error) {
                // Ignore errors - triggers should not fail main operations
                console.warn("Application trigger error:", error)

                return undefined
            }
        }
    }
}

export const createTrigger = () => new TriggerBuilder()
