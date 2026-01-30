import { Turnstile, type TurnstileInstance, type TurnstileProps } from "@marsidev/react-turnstile"
import type { Ref } from "react"
import { ENV } from "~/utils/env"
import { ClientOnly } from "./utils/client-only"

interface TurnstileWidgetProps
    extends Omit<
        TurnstileProps,
        "siteKey" | "options" | "onSuccess" | "onError" | "onExpire" | "onChange"
    > {
    ref?: Ref<TurnstileInstance | undefined>
    options?: Omit<TurnstileProps["options"], "theme" | "refreshExpired">
    onChange?: (value: string) => void
}

const TurnstileWidget = ({ ref, options, onChange, ...props }: TurnstileWidgetProps) => {
    const handleChange = (value?: string) => {
        onChange?.(value ?? "")
    }

    return (
        <ClientOnly>
            {() => (
                <Turnstile
                    onError={handleChange}
                    onExpire={handleChange}
                    onSuccess={handleChange}
                    options={{ theme: "light", refreshExpired: "auto", ...options }}
                    ref={ref}
                    siteKey={ENV.CLOUDFLARE_TURNSTILE_SITE_KEY}
                    {...props}
                />
            )}
        </ClientOnly>
    )
}

export { TurnstileWidget, type TurnstileInstance }
