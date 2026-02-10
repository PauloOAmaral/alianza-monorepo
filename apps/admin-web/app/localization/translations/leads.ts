export const leadsPT = {
    fields: {
        name: { label: 'Nome', required: 'O nome é obrigatório.' },
        email: { label: 'Email', required: 'O email é obrigatório.' },
        source: { label: 'Origem', required: 'A origem é obrigatória.' },
        campaign: { label: 'Campanha' },
        status: { label: 'Status', required: 'O status é obrigatório.' },
        gender: { label: 'Genero' },
        age: { label: 'Idade', required: 'A idade é obrigatória.' },
        reason: { label: 'Motivo', required: 'O motivo é obrigatório.' },
        eventSourceUrl: { label: 'URL de origem' },
        sellerId: { label: 'Vendedor', required: 'O vendedor é obrigatório.' },
        companyId: { label: 'Empresa' },
        disciplineId: { label: 'Disciplina', required: 'A disciplina é obrigatória.' },
        phoneCountryCode: { label: 'Código de país' },
        phoneNumber: { label: 'Número de teléfono', required: 'Telefono é obrigatório.' },
        secondaryPhoneCountryCode: { label: 'Código de país' },
        secondaryPhoneNumber: { label: 'Telefono secundario' },
    },
    dialogs: {
        new: {
            title: 'Novo lead',
            description: 'Cadastre um novo lead para acompanhamento comercial.',
            success: 'Lead cadastrado !'
        },
        edit: {
            title: 'Editar lead',
            description: 'Atualize as informacoes do lead.',
            success: 'Lead atualizado !'
        },
        sections: {
            identification: 'Identificacao',
            contact: 'Contato',
            source: 'Origem',
            context: 'Contexto'
        },
        messages: {
            created: 'Lead cadastrado com sucesso !',
            duplicateTitle: 'Lead duplicado',
            duplicatePhone: 'Ja existe um lead cadastrado com o telefone {phone}. Deseja cadastrar mesmo assim ?',
            duplicateEmail: 'Ja existe um lead cadastrado com o email {email}. Deseja cadastrar mesmo assim ?',
            duplicatePhoneAndEmail: 'Ja existe um lead cadastrado com este telefone e email. Deseja cadastrar mesmo assim ?',
            duplicateConfirm: 'Cadastrar mesmo assim',
            duplicateCancel: 'Cancelar'
        }
    },
    tablePages: {
        headers: {
            id: 'ID',
            name: 'Nome',
            phone: 'Telefone',
            email: 'Email',
            seller: 'Seller',
            status: 'Status',
            actions: 'Acoes',
        },
        empty: 'Nenhum lead encontrado.'
    },
    formPages: {
        title: 'Leads',
        newLead: 'Novo lead'
    }
}

export const leadsEN = {
    fields: {
        name: { label: 'Name', required: 'Name is required.' },
        email: { label: 'Email', required: 'Email is required.' },
        source: { label: 'Source', required: 'Source is required.' },
        campaign: { label: 'Campaign' },
        status: { label: 'Status', required: 'Status is required.' },
        gender: { label: 'Gender' },
        age: { label: 'Age', required: 'Age is required.' },
        reason: { label: 'Reason', required: 'Reason is required.' },
        eventSourceUrl: { label: 'Source URL' },
        sellerId: { label: 'Seller', required: 'Seller is required.' },
        companyId: { label: 'Company' },
        disciplineId: { label: 'Discipline', required: 'Discipline is required.' },
        phoneCountryCode: { label: 'Country code' },
        phoneNumber: { label: 'Phone number', required: 'Phone number is required.' },
        secondaryPhoneCountryCode: { label: 'Country code' },
        secondaryPhoneNumber: { label: 'Secondary phone' },
    },
    dialogs: {
        new: {
            title: 'New lead',
            description: 'Create a new lead for commercial follow-up.',
            success: 'Lead created!'
        },
        edit: {
            title: 'Edit lead',
            description: 'Update lead information.',
            success: 'Lead updated!'
        },
        sections: {
            identification: 'Identification',
            contact: 'Contact',
            source: 'Source',
            context: 'Context'
        },
        messages: {
            created: 'Lead created successfully!',
            duplicateTitle: 'Duplicate lead',
            duplicatePhone: 'A lead already exists with phone {phone}. Do you want to create anyway?',
            duplicateEmail: 'A lead already exists with email {email}. Do you want to create anyway?',
            duplicatePhoneAndEmail: 'A lead already exists with this phone and email. Do you want to create anyway?',
            duplicateConfirm: 'Create anyway',
            duplicateCancel: 'Cancel'
        }
    },
    tablePages: {
        headers: {
            id: 'ID',
            name: 'Name',
            phone: 'Phone',
            email: 'Email',
            seller: 'Seller',
            status: 'Status',
            actions: 'Actions'
        },
        empty: 'No leads found.'
    },
    formPages: {
        title: 'Leads',
        newLead: 'Nuevo lead'
    }
}

export const leadsES = {
    fields: {
        name: { label: 'Nombre', required: 'Nombre es requerido.' },
        email: { label: 'Email', required: 'Email es requerido.' },
        source: { label: 'Origen', required: 'Origen es requerido.' },
        campaign: { label: 'Campana' },
        status: { label: 'Estado', required: 'Estado es requerido.' },
        gender: { label: 'Genero' },
        age: { label: 'Edad', required: 'Edad es requerido.' },
        reason: { label: 'Motivo', required: 'Motivo es requerido.' },
        eventSourceUrl: { label: 'URL de origen' },
        sellerId: { label: 'Vendedor', required: 'Vendedor es requerido.' },
        companyId: { label: 'Empresa' },
        disciplineId: { label: 'Disciplina', required: 'Disciplina es requerido.' },
        phoneCountryCode: { label: 'Código de país' },
        phoneNumber: { label: 'Número de teléfono', required: 'Telefono es requerido.' },
        secondaryPhoneCountryCode: { label: 'Código de país' },
        secondaryPhoneNumber: { label: 'Telefono secundario' },
    },
    dialogs: {
        new: {
            title: 'Nuevo lead',
            description: 'Registra un nuevo lead para seguimiento comercial.',
            success: '¡Lead registrado!'
        },
        edit: {
            title: 'Editar lead',
            description: 'Actualiza la información del lead.',
            success: '¡Lead actualizado!'
        },
        sections: {
            identification: 'Identificación',
            contact: 'Contacto',
            source: 'Origen',
            context: 'Contexto'
        },
        messages: {
            created: '¡Lead registrado con éxito!',
            duplicateTitle: 'Lead duplicado',
            duplicatePhone: 'Ya existe un lead con el teléfono {phone}. ¿Deseas registrar igualmente?',
            duplicateEmail: 'Ya existe un lead con el email {email}. ¿Deseas registrar igualmente?',
            duplicatePhoneAndEmail: 'Ya existe un lead con este teléfono y email. ¿Deseas registrar igualmente?',
            duplicateConfirm: 'Registrar igualmente',
            duplicateCancel: 'Cancelar'
        }
    },
    tablePages: {
        headers: {
            id: 'ID',
            name: 'Nombre',
            phone: 'Teléfono',
            email: 'Email',
            seller: 'Seller',
            status: 'Estado',
            actions: 'Acciones'
        },
        empty: 'No se encontraron leads.'
    },
    formPages: {
        title: 'Leads',
        newLead: 'Nuevo lead'
    }
}