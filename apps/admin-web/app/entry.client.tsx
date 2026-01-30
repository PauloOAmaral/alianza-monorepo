import { StrictMode, startTransition } from "react"
import { hydrateRoot } from "react-dom/client"
import { I18nextProvider } from "react-i18next"
import { HydratedRouter } from "react-router/dom"
import { getI18nextClient } from "./localization/i18next-config"

async function main() {
    const i18n = await getI18nextClient()

    startTransition(() => {
        hydrateRoot(
            document,
            <StrictMode>
                <I18nextProvider i18n={i18n}>
                    <HydratedRouter />
                </I18nextProvider>
            </StrictMode>,
        )
    })
}

main().catch((error) => console.error(error))
