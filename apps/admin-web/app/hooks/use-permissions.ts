import type { PermissionType } from "@alianza/application/types/admin"
import { useUserSession } from "./use-user-session"

/**
 * Hook to check if the user has a permission
 * @returns hasPermission - function to check if the user has a permission
 * @returns permissions - array of permissions
 */
export function usePermissions() {
    const userSession = useUserSession()

    /**
     * @description Check if the user has a permission
     * @param permission - permission to check
     * @param mode - mode to check
     * @returns true if the user has the permission, false otherwise
     */
    function hasPermission(
        permission: PermissionType | PermissionType[],
        mode: "some" | "all" = "all",
    ) {
        if (userSession.permissions.includes("full")) {
            return true
        }

        const permissions = Array.isArray(permission) ? permission : [permission]

        return mode === "some"
            ? permissions.some((p) => userSession.permissions.includes(p))
            : permissions.every((p) => userSession.permissions.includes(p))
    }

    return { hasPermission, permissions: userSession.permissions }
}
