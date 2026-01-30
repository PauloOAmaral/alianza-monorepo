import { ApplicationError } from "@alianza/application/error"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import type { ActionFunctionArgs, EntryContext, LoaderFunctionArgs } from "react-router"
import { isRouteErrorResponse, ServerRouter } from "react-router"
import { redirectWithError } from "remix-toast"
import { getI18nextServerInstance } from "./middleware/i18next-middleware"
import { parseApplicationError } from "./utils/server/errors"

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext,
) {
    let shellRendered = false
    let statusCode = responseStatusCode

    const i18n = await getI18nextServerInstance(request)
    const userAgent = request.headers.get("user-agent")

    const body = await renderToReadableStream(
        <I18nextProvider i18n={i18n}>
            <ServerRouter context={entryContext} url={request.url} />
        </I18nextProvider>,
        {
            onError(error) {
                statusCode = 500

                if (shellRendered) console.error(error)
            },
        },
    )

    shellRendered = true

    if ((userAgent && isbot(userAgent)) || entryContext.isSpaMode) {
        await body.allReady
    }

    responseHeaders.set("Content-Type", "text/html; charset=utf-8")

    return new Response(body, {
        headers: responseHeaders,
        status: statusCode,
    })
}

export async function handleError(
    error: unknown,
    { request }: LoaderFunctionArgs | ActionFunctionArgs,
) {
    if (!request.signal.aborted) {
        if (request.method === "GET" || isRouteErrorResponse(error)) {
            return
        }

        if (error instanceof ApplicationError) {
            const message = await parseApplicationError(error, request)

            throw await redirectWithError(request.url, message)
        }

        const i18n = await getI18nextServerInstance(request)

        const message = i18n.t("serverError.unexpected")

        throw await redirectWithError(request.url, message)
    }
}
