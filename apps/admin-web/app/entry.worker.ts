import { createRequestHandler, RouterContextProvider } from "react-router"

function getLoadContext(_request: Request) {
    return new RouterContextProvider()
}

const handler = createRequestHandler(
    () => import("virtual:react-router/server-build"),
    import.meta.env.MODE,
)

export default {
    async fetch(request: Request) {
        return handler(request, getLoadContext(request))
    },
}

