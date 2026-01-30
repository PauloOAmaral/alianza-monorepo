import { PermissionProvider } from "@alianza/ui/components/with-permission"
import { useTranslation } from "react-i18next"

export function WithPermissionProvider({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation()

    return (
        <PermissionProvider
            errorMessageForAction={t("errors.permissionForActionNotFound")}
            errorMessageForPage={t("errors.permissionForPageNotFound")}
        >
            {children}
        </PermissionProvider>
    )
}
