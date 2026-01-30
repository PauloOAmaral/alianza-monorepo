import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@alianza/ui/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { useMatches } from "react-router"

interface BreadcrumbHandle {
    breadcrumb?: (data: unknown) => ReactNode | ReactNode[]
}

interface MatchWithBreadcrumb {
    handle?: BreadcrumbHandle
    data?: unknown
}

interface BreadcrumbItemData {
    id: string
    breadcrumb: ReactNode
    index: number
}

/**
 * Breadcrumbs component that displays the breadcrumb trail for the current page.
 * Router data is passed to the breadcrumb function as the first argument.
 *
 * Example:
 *
 * ```tsx
 * import { NavLink } from "react-router"
 * import { Trans } from "react-i18next"
 *
    export const handle = {
        breadcrumb: (data: Awaited<ReturnType<typeof loader>>) => (
            <NavLink to="/courses">
                <Trans i18nKey="titles.courses" /> or {data.course.name}
            </NavLink>
        ),
    }
 * ```
 *
 * @returns The breadcrumb trail for the current page.
 */
const Breadcrumbs = () => {
    const matches = useMatches() as MatchWithBreadcrumb[]

    const breadcrumbs: BreadcrumbItemData[] = matches
        .filter((match) => Boolean(match.handle?.breadcrumb))
        .flatMap((match, matchIndex) => {
            const breadcrumbResult = match.handle?.breadcrumb?.(match.data) ?? null

            if (Array.isArray(breadcrumbResult)) {
                return breadcrumbResult.map((breadcrumb, breadcrumbIndex) => ({
                    id: `${matchIndex}-${breadcrumbIndex}`,
                    breadcrumb,
                }))
            }

            return { id: matchIndex.toString(), breadcrumb: breadcrumbResult }
        })
        .map((item, index) => ({
            id: item.id,
            breadcrumb: item.breadcrumb,
            index,
        }))

    if (!breadcrumbs.length) {
        return null
    }

    return (
        <Breadcrumb>
            <BreadcrumbList className="flex [&>li]:flex [&>li]:items-center">
                {breadcrumbs.map((item) => (
                    <BreadcrumbItem key={item.id}>
                        {item.breadcrumb}
                        {item.index < breadcrumbs.length - 1 && (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export { Breadcrumbs }
