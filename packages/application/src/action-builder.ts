import type { DatabaseClient, DatabaseTransaction } from '@alianza/database/types/common'
import type * as z from 'zod'
import type { BaseUserSession } from './auth/base'
import { ApplicationError } from './error'

interface RequestActionContext {
    request: Request
}

interface DataActionRequest<TData> {
    data: TData
}

interface AuthenticatedActionRequest<TSession = BaseUserSession> {
    session: TSession
}

interface DatabaseActionRequest<TClient, TTransaction> {
    dbClient?: TClient
    dbTransaction?: TTransaction
}

interface ActionResponse<T> {
    data: T
}

type TriggerHandler<TResult, TData> = (result: TResult, data: TData) => Promise<void>

interface ActionWithTrigger<TResult, TContext, TData> {
    (request: TContext): Promise<ActionResponse<TResult>>
    trigger: (handler: TriggerHandler<TResult, TData>) => ActionWithTrigger<TResult, TContext, TData>
}

interface CreateActionOptions<TSchema extends z.ZodType = any> {
    schema?: TSchema
}

class ActionBuilder<TPublicContext = unknown, TPrivateContext = unknown, TSchema extends z.ZodType = any> {
    private validationSchema?: TSchema

    constructor(options?: CreateActionOptions<TSchema>) {
        this.validationSchema = options?.schema
    }

    withRequest() {
        return this as unknown as ActionBuilder<TPublicContext & RequestActionContext, TPrivateContext & RequestActionContext, TSchema>
    }

    withData<TData = TSchema extends z.ZodType ? z.infer<TSchema> : never>(): ActionBuilder<TPublicContext & DataActionRequest<TData>, TPrivateContext & DataActionRequest<TData>, TSchema> {
        return this as unknown as ActionBuilder<TPublicContext & DataActionRequest<TData>, TPrivateContext & DataActionRequest<TData>, TSchema>
    }

    withSession<TSession = BaseUserSession>() {
        return this as unknown as ActionBuilder<TPublicContext & AuthenticatedActionRequest<TSession>, TPrivateContext & AuthenticatedActionRequest<TSession>, TSchema>
    }

    withDatabase<TClient extends DatabaseClient, TTransaction extends DatabaseTransaction>() {
        return this as unknown as ActionBuilder<TPublicContext & DatabaseActionRequest<DatabaseClient, DatabaseTransaction>, TPrivateContext & DatabaseActionRequest<TClient, TTransaction>, TSchema>
    }

    build<TResult>(
        actionFn: (request: TPrivateContext) => Promise<TResult>
    ): ActionWithTrigger<TResult, TPublicContext, TPrivateContext extends DataActionRequest<infer TData> ? TData : Record<string, never>> {
        type TriggerHandlerType = TriggerHandler<TResult, TPrivateContext extends DataActionRequest<infer TData> ? TData : Record<string, never>>

        const triggers: TriggerHandlerType[] = []

        const executeAction = async (request: TPublicContext): Promise<ActionResponse<TResult>> => {
            try {
                let req = request as any

                if (this.validationSchema && req.data) {
                    const validationResult = await this.validationSchema.safeParseAsync(req.data)

                    if (!validationResult.success) {
                        throw new ApplicationError('commonValidationError', validationResult.error.issues.map(issue => issue.message).join('; '))
                    }

                    req = { ...req, data: validationResult.data }
                }

                const result = await actionFn(req as unknown as TPrivateContext)

                for (const trigger of triggers) {
                    await trigger(result, req.data)
                }

                return { data: result }
            } catch (error) {
                if (error instanceof ApplicationError) {
                    throw error
                }

                console.error(error)

                throw new ApplicationError(['unexpectedError'])
            }
        }

        const actionWithTrigger = executeAction as ActionWithTrigger<TResult, TPublicContext, TPrivateContext extends DataActionRequest<infer TData> ? TData : Record<string, never>>

        actionWithTrigger.trigger = (handler: TriggerHandlerType) => {
            triggers.push(handler)
            return actionWithTrigger
        }

        return actionWithTrigger
    }
}

export function createAction<TSchema extends z.ZodType = never>(options?: CreateActionOptions<TSchema>): ActionBuilder<unknown, unknown, TSchema> {
    return new ActionBuilder(options)
}
