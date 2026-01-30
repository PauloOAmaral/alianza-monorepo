import { useEffect, useState } from 'react'

/**
 * Debounces a value with a configurable delay.
 * @param initialValue - The initial value
 * @param config - Configuration options
 * @param config.delay - Delay in ms (default: 500)
 * @returns The debounced state
 */
export function useDebounce<T>(initialValue: T, config: { delay?: number } = {}) {
    const { delay = 500 } = config
    const [value, setValue] = useState<T>(initialValue)
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return {
        value,
        setValue,
        debouncedValue
    }
}
