import type { PermissionType } from '@alianza/application/types/admin'
import { useTranslation } from 'react-i18next'

export type PermissionCategory = {
    id: string
    label: string
    permissions: Permission[]
}

export type Permission = {
    name: PermissionType
    label: string
    description: string
}

export function getPermissionCategories(): PermissionCategory[] {
    const { t } = useTranslation()

    return [
        {
            id: 'admin',
            label: t('permissions.categoryAdmin'),
            permissions: [
                {
                    name: 'full',
                    label: t('fields.permissions.permissionFull'),
                    description: t('permissions.permissionFullDescription')
                }
            ]
        },
        {
            id: 'users',
            label: t('permissions.categoryUsers'),
            permissions: [
                {
                    name: 'users_view',
                    label: t('fields.permissions.usersView'),
                    description: t('permissions.usersViewDescription')
                },
                {
                    name: 'users_create',
                    label: t('fields.permissions.usersCreate'),
                    description: t('permissions.usersCreateDescription')
                },
                {
                    name: 'users_edit',
                    label: t('fields.permissions.usersEdit'),
                    description: t('permissions.usersEditDescription')
                },
                {
                    name: 'users_delete',
                    label: t('fields.permissions.usersDelete'),
                    description: t('permissions.usersDeleteDescription')
                }
            ]
        },
        {
            id: 'permissions',
            label: t('permissions.categoryPermissionGroups'),
            permissions: [
                {
                    name: 'permissions_view',
                    label: t('fields.permissions.permissionsView'),
                    description: t('permissions.permissionsViewDescription')
                },
                {
                    name: 'permissions_create',
                    label: t('fields.permissions.permissionsCreate'),
                    description: t('permissions.permissionsCreateDescription')
                },
                {
                    name: 'permissions_edit',
                    label: t('fields.permissions.permissionsEdit'),
                    description: t('permissions.permissionsEditDescription')
                },
                {
                    name: 'permissions_delete',
                    label: t('fields.permissions.permissionsDelete'),
                    description: t('permissions.permissionsDeleteDescription')
                }
            ]
        }
    ]
}

export function getPermissionLabelAndDescription(name: PermissionType) {
    const permissionCategories = getPermissionCategories()

    for (const category of permissionCategories) {
        for (const permission of category.permissions) {
            if (permission.name === name) {
                return {
                    label: permission.label,
                    description: permission.description
                }
            }
        }
    }
}
