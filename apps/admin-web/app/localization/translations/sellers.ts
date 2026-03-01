export const sellersPT = {
    fields: {
        userContext: {
            label: 'Usuário do sistema',
            required: 'Selecione um usuário.'
        },
        referralCode: {
            label: 'Código de indicação',
            placeholder: 'Deixe vazio para gerar',
            required: 'Código é obrigatório.'
        },
        leadPrefix: {
            label: 'Prefixo de lead',
            placeholder: 'Deixe vazio para gerar',
            required: 'Prefixo é obrigatório.'
        },
        dailyToSell: { label: 'Meta diária de vendas' },
        dailyExperimentalClass: { label: 'Aula experimental diária' },
        pixelId: { label: 'Pixel ID' },
        pixelSecret: { label: 'Pixel Secret' },
        isActive: { label: 'Vendedor ativo' }
    },
    dialogs: {
        edit: {
            title: 'Editar vendedor',
            description: 'Altere os dados do vendedor.',
            success: 'Vendedor atualizado com sucesso.'
        },
        new: {
            title: 'Novo vendedor',
            description: 'Vincule um usuário do sistema como vendedor. Código e prefixo serão gerados automaticamente.',
            success: 'Vendedor criado com sucesso.'
        },
        activate: {
            title: 'Ativar vendedor',
            description: 'Deseja ativar o vendedor {{name}}?',
            success: 'Vendedor ativado com sucesso.'
        },
        inactivate: {
            title: 'Inativar vendedor',
            description: 'Deseja inativar o vendedor {{name}}?',
            success: 'Vendedor inativado com sucesso.'
        }
    },
    tablePages: {
        actions: 'Ações',
        headers: {
            user: 'Usuário',
            referralCode: 'Código',
            leadPrefix: 'Prefixo',
            status: 'Status'
        },
        empty: 'Nenhum vendedor encontrado.'
    },
    formPages: {
        title: 'Vendedores',
        newSeller: 'Novo vendedor'
    }
}

export const sellersEN = {
    fields: {
        userContext: {
            label: 'System user',
            required: 'Select a user.'
        },
        referralCode: {
            label: 'Referral code',
            placeholder: 'Leave empty to auto-generate',
            required: 'Code is required.'
        },
        leadPrefix: {
            label: 'Lead prefix',
            placeholder: 'Leave empty to auto-generate',
            required: 'Prefix is required.'
        },
        dailyToSell: { label: 'Daily sales target' },
        dailyExperimentalClass: { label: 'Daily experimental class' },
        pixelId: { label: 'Pixel ID' },
        pixelSecret: { label: 'Pixel Secret' },
        isActive: { label: 'Seller active' }
    },
    dialogs: {
        edit: {
            title: 'Edit seller',
            description: 'Update seller details.',
            success: 'Seller updated successfully.'
        },
        new: {
            title: 'New seller',
            description: 'Link a system user as seller. Code and prefix will be generated automatically.',
            success: 'Seller created successfully.'
        },
        activate: {
            title: 'Activate seller',
            description: 'Do you want to activate seller {{name}}?',
            success: 'Seller activated successfully.'
        },
        inactivate: {
            title: 'Deactivate seller',
            description: 'Do you want to deactivate seller {{name}}?',
            success: 'Seller deactivated successfully.'
        }
    },
    tablePages: {
        actions: 'Actions',
        headers: {
            user: 'User',
            referralCode: 'Code',
            leadPrefix: 'Prefix',
            status: 'Status'
        },
        empty: 'No sellers found.'
    },
    formPages: {
        title: 'Sellers',
        newSeller: 'New seller'
    }
}

export const sellersES = {
    fields: {
        userContext: {
            label: 'Usuario del sistema',
            required: 'Seleccione un usuario.'
        },
        referralCode: {
            label: 'Código de referencia',
            placeholder: 'Dejar vacío para generar',
            required: 'El código es obligatorio.'
        },
        leadPrefix: {
            label: 'Prefijo de lead',
            placeholder: 'Dejar vacío para generar',
            required: 'El prefijo es obligatorio.'
        },
        dailyToSell: { label: 'Meta de ventas diaria' },
        dailyExperimentalClass: { label: 'Clase experimental diaria' },
        pixelId: { label: 'Pixel ID' },
        pixelSecret: { label: 'Pixel Secret' },
        isActive: { label: 'Vendedor activo' }
    },
    dialogs: {
        edit: {
            title: 'Editar vendedor',
            description: 'Actualice los datos del vendedor.',
            success: 'Vendedor actualizado con éxito.'
        },
        new: {
            title: 'Nuevo vendedor',
            description: 'Vincule un usuario del sistema como vendedor. El código y el prefijo se generarán automáticamente.',
            success: 'Vendedor creado con éxito.'
        },
        activate: {
            title: 'Activar vendedor',
            description: '¿Desea activar al vendedor {{name}}?',
            success: 'Vendedor activado con éxito.'
        },
        inactivate: {
            title: 'Inactivar vendedor',
            description: '¿Desea inactivar al vendedor {{name}}?',
            success: 'Vendedor inactivado con éxito.'
        }
    },
    tablePages: {
        actions: 'Acciones',
        headers: {
            user: 'Usuario',
            referralCode: 'Código',
            leadPrefix: 'Prefijo',
            status: 'Estado'
        },
        empty: 'Ningún vendedor encontrado.'
    },
    formPages: {
        title: 'Vendedores',
        newSeller: 'Nuevo vendedor'
    }
}
