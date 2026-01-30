import { Turnstile, type TurnstileInstance, type TurnstileProps } from '@marsidev/react-turnstile'
import type { Ref } from 'react'
import { ClientOnly } from '../utils/client-only'

interface TurnstileWidgetProps extends Omit<TurnstileProps, 'options' | 'onSuccess' | 'onError' | 'onExpire' | 'onChange'> {
    ref?: Ref<TurnstileInstance | undefined>
    options?: Omit<TurnstileProps['options'], 'theme' | 'refreshExpired'>
    onChange?: (value: string) => void
}

const TurnstileWidget = ({ ref, options, onChange, siteKey, ...props }: TurnstileWidgetProps) => {
    const handleChange = (value?: string) => {
        onChange?.(value ?? '')
    }

    return (
        <ClientOnly>
            {() => (
                <Turnstile
                    onError={handleChange}
                    onExpire={handleChange}
                    onSuccess={handleChange}
                    options={{ theme: 'light', refreshExpired: 'auto', ...options }}
                    ref={ref as Parameters<typeof Turnstile>[0]['ref']}
                    siteKey={siteKey}
                    {...props}
                />
            )}
        </ClientOnly>
    )
}

export { TurnstileWidget, type TurnstileInstance }
