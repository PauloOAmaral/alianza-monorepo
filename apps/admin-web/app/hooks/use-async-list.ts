import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFetcher } from 'react-router'
import { useDebounce } from './use-debounce'

interface UseAsyncListProps<T, LoaderData> {
    defaultItems?: T[]
    defaultSelectedKeys?: Array<string | number> | null
    getText?: (item: T) => string
    getUrl: (filterText: string) => string
    getItems?: (data: LoaderData) => T[] | null
}

/**
 * A hook for managing async searchable lists with smart fetch optimization.
 *
 * Key features:
 * - Debounces user input to reduce API calls (500ms delay)
 * - Prevents duplicate requests for the same search term
 * - Avoids fetching when exact matches already exist in current data
 * - Gracefully falls back to default items when no search is active
 *
 * @example
 * const { data, isPending, setFilterText, selectedKeys, setSelectedKeys } = useAsyncList({
 *   defaultItems: initialPlaces,
 *   getUrl: (text) => `/api/places?search=${text}`,
 *   getText: (place) => place.name,
 *   getItems: (response) => response.data
 * })
 */
export function useAsyncList<T, LoaderData>({ defaultItems, defaultSelectedKeys, getText, getUrl, getItems }: UseAsyncListProps<T, LoaderData>) {
    const [selectedKeys, setSelectedKeys] = useState<Array<string | number> | null | undefined>(defaultSelectedKeys)

    // Debounce user input to avoid excessive API calls while typing
    const { debouncedValue, setValue } = useDebounce('', { delay: 500 })

    // Track the last search term and URL we fetched to prevent duplicate requests
    // This is crucial for preventing infinite loops when props change
    const lastFetchedTerm = useRef<string>('')
    const lastRequestedUrlRef = useRef<string>('')

    const { load: fetcherLoad, data: fetcherData, state: fetcherState } = useFetcher()

    // Extract text from items for comparison, with safe fallback
    // Default to string representation of the item if no getText function is provided
    const extractText = useCallback((item: T) => (getText ? getText(item) : String(item)), [getText])

    /**
     * Determine which data to display based on current state:
     * - If searching and have results: show fetched data
     * - If not searching or no results: show default items
     * - Extract items from loader response if needed
     */
    const data = useMemo<T[]>(() => {
        if (!debouncedValue || !fetcherData) {
            return defaultItems ?? []
        }

        return getItems?.(fetcherData) ?? fetcherData ?? []
    }, [defaultItems, debouncedValue, fetcherData, getItems])

    /**
     * Smart fetch logic to minimize unnecessary API calls:
     * 1. Don't fetch if no search term
     * 2. Don't fetch if we already fetched this exact term (prevents loops)
     * 3. Don't fetch if current data already contains an exact match
     *
     * The exact match check is especially useful for scenarios where
     * the user types something that already exists in the default items.
     */
    const shouldFetch = useMemo(() => {
        if (!debouncedValue || lastFetchedTerm.current === debouncedValue) {
            return false
        }

        // Check default items for exact matches (case-insensitive)
        // Avoid using fetched data here to reduce re-computation loops
        const hasExactMatch = (defaultItems ?? []).some(item => extractText(item).toLowerCase() === debouncedValue.toLowerCase())

        return !hasExactMatch
    }, [debouncedValue, defaultItems, extractText])

    /**
     * Perform the actual fetch when conditions are met.
     * Updates our deduplication tracker before making the request.
     */
    const performFetch = useCallback(() => {
        if (!shouldFetch || !debouncedValue) {
            return
        }

        const url = getUrl(debouncedValue)

        if (lastRequestedUrlRef.current === url) {
            return
        }

        lastFetchedTerm.current = debouncedValue
        lastRequestedUrlRef.current = url

        fetcherLoad(url)
    }, [shouldFetch, debouncedValue, fetcherLoad, getUrl])

    /**
     * Normalize key input to always return an array or null/undefined.
     * This provides a consistent API regardless of how parent components
     * pass keys (single value, array, null, etc.)
     */
    const normalizeKeys = useCallback((keys: Array<string | number> | string | number | null | undefined) => {
        if (keys === null || keys === undefined) {
            return keys
        }

        return Array.isArray(keys) ? keys : [keys]
    }, [])

    // Public API functions - wrapped to hide internal implementation details (standard state action)
    const handleSelectedKeysChange = useCallback(
        (keys: Array<string | number> | string | number | null | undefined) => {
            setSelectedKeys(normalizeKeys(keys))
        },
        [normalizeKeys]
    )

    const handleFilterTextChange = useCallback(
        (text: string) => {
            setValue(text)
        },
        [setValue]
    )

    useEffect(() => {
        performFetch()
    }, [performFetch])

    // Reset deduplication trackers when search is cleared
    // This ensures we can fetch again if user searches for the same term later
    useEffect(() => {
        if (!debouncedValue) {
            lastFetchedTerm.current = ''
            lastRequestedUrlRef.current = ''
        }
    }, [debouncedValue])

    return {
        data,
        isPending: fetcherState !== 'idle',
        setFilterText: handleFilterTextChange,
        selectedKeys,
        setSelectedKeys: handleSelectedKeysChange
    }
}
