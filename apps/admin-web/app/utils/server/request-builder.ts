import type { UserSession } from "@alianza/application/auth/carrefour"
import { requireSession } from "~/middleware/session-middleware"

type BaseRequest = {
    request: Request
}

type WithData<T> = {
    data: T
}

type WithSession = {
    session: UserSession
}

class RequestBuilder<TContext extends BaseRequest> {
    private context: Partial<TContext & WithSession> = {}

    constructor(request: Request, data?: any) {
        this.context.request = request

        if (data !== undefined) {
            ; (this.context as any).data = data
        }
    }

    private createProxy<T>() {
        return new Proxy(this, {
            get: (target, prop) => {
                // métodos do builder
                if (prop in target && typeof (target as any)[prop] === "function") {
                    return (target as any)[prop].bind(target)
                }

                // propriedades do contexto
                return (target.context as any)[prop]
            },

            ownKeys: () => Object.keys(this.context),

            getOwnPropertyDescriptor: (_, prop) => {
                if (prop in this.context) {
                    return {
                        enumerable: true,
                        configurable: true,
                        value: (this.context as any)[prop],
                    }
                }
            },
        }) as unknown as T
    }

    /**
     * Add session to the request (EXPLÍCITO)
     */
    async withSession() {
        const request = this.context.request!
        this.context.session = await requireSession(request)

        return this.createProxy<
            TContext & WithSession & RequestBuilder<TContext & WithSession>
        >()
    }
}


export function createRequest<T>(
    request: Request,
    data: T,
): BaseRequest &
    WithData<T> &
    RequestBuilder<BaseRequest & WithData<T>>

export function createRequest(
    request: Request,
): BaseRequest & RequestBuilder<BaseRequest>

export function createRequest<T>(request: Request, data?: T) {
    const builder = new RequestBuilder(request, data)

    return builder["createProxy"]() as any
}
