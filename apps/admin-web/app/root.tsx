import { notify, Toaster } from "@alianza/ui/components/toaster"
import { NuqsAdapter } from "nuqs/adapters/react-router/v7"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router"
import { getToast } from "remix-toast"
import { ToastMessages } from "~/components/shared/toast-message"
import type { Route } from "./+types/root"
import {
  getLocale,
  serializeLocaleCookie,
} from "./middleware/i18next-middleware"
import { WithPermissionProvider } from "./providers/with-permission-provider"
import "./app.css"
import { ENV } from "./utils/env"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export const shouldRevalidate = () => true

export async function loader({ request }: Route.LoaderArgs) {
  const locale = (await getLocale(request)) ?? "pt"

  const { toast, headers: toastHeaders } = await getToast(request)

  const headers = new Headers(toastHeaders)

  headers.append(
    "Set-Cookie",
    await serializeLocaleCookie(request),
  )

  return data(
    {
      toast,
      locale,
      env: {
        CLOUDFLARE_TURNSTILE_SITE_KEY:
          ENV.CLOUDFLARE_TURNSTILE_SITE_KEY,
      },
    },
    { headers },
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>()

  const toast = loaderData?.toast
  const env = loaderData?.env
  const locale = loaderData?.locale ?? "pt"

  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  useEffect(() => {
    switch (toast?.type) {
      case "info":
        notify.info(<ToastMessages errors={toast.message} />)
        break
      case "warning":
        notify.warning(<ToastMessages errors={toast.message} />)
        break
      case "success":
        notify.success(<ToastMessages errors={toast.message} />)
        break
      case "error":
        console.error(toast.message)
        notify.error(<ToastMessages errors={toast.message} />)
        break
    }
  }, [toast])

  return (
    <html dir={i18n.dir(i18n.language)} lang={i18n.language}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed for env vars
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env ?? {})}`,
          }}
        />
      </head>
      <body className="min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  )
}

export default function App({ loaderData: _loaderData }: Route.ComponentProps) {
  return (
    <NuqsAdapter>
      <WithPermissionProvider>
        <Outlet />
      </WithPermissionProvider>
    </NuqsAdapter>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
