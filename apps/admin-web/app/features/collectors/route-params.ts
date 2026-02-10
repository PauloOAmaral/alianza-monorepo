import { createLoader, parseAsInteger, parseAsString } from 'nuqs'

export const collectorsSearchParams = {
    query: parseAsString.withDefault('').withOptions({ throttleMs: 500 }),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(20)
}

export const collectorsSearchParamsLoader = createLoader(collectorsSearchParams)
