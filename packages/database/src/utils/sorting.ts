import { asc, desc } from "drizzle-orm"

type StripHyphen<T> = T extends `-${infer U}` ? U : T

export function parseQueryFilters<T extends string>({
    sort,
    page,
    limit,
}: {
    sort?: T
    page?: number
    limit?: number
}) {
    const isDesc = sort?.startsWith("-")
    const sortKey = sort?.replace("-", "") as StripHyphen<T> | undefined
    const orderFn = sortKey ? (isDesc ? desc : asc) : undefined
    const offset = page && limit ? (page - 1) * limit : undefined

    return {
        orderFn,
        sortKey,
        offset,
    }
}
