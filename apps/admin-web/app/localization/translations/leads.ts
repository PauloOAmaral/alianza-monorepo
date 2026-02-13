export const leadsPT = {
    fields: {
        name: { label: 'Nome', required: 'O nome é obrigatório.' },
        email: { label: 'Email', required: 'O email é obrigatório.', invalid: 'Email inválido.' },
        source: { label: 'Origem', required: 'A origem é obrigatória.' },
        campaign: { label: 'Campanha', none: 'Sem campanha' },
        status: { label: 'Status', required: 'O status é obrigatório.' },
        gender: { label: 'Gênero' },
        age: { label: 'Idade', required: 'A idade é obrigatória.' },
        studyReason: { label: 'Motivo de estudo', required: 'O motivo de estudo é obrigatório.' },
        reason: { label: 'Motivo', required: 'O motivo é obrigatório.' },
        country: { label: 'País', required: 'O país é obrigatório.' },
        city: { label: 'Cidade', required: 'A cidade é obrigatória.' },
        experimentalDate: { label: 'Data da aula', required: 'A data da aula é obrigatória.' },
        experimentalTime: { label: 'Horário da aula', required: 'O horário da aula é obrigatório.' },
        experimentalTeacher: { label: 'Professor', required: 'O professor é obrigatório.' },
        experimentalObservation: { label: 'Observações' },
        eventSourceUrl: { label: 'URL de origem' },
        sellerId: { label: 'Vendedor', required: 'O vendedor é obrigatório.' },
        companyId: { label: 'Empresa' },
        disciplineId: { label: 'Disciplina', required: 'A disciplina é obrigatória.' },
        phoneCountryCode: { label: 'Código de país' },
        phoneNumber: { label: 'Número de teléfono', required: 'Telefono é obrigatório.', invalid: 'Número de telefone inválido.' },
        secondaryPhoneCountryCode: { label: 'Código de país' },
        secondaryPhoneNumber: { label: 'Telefono secundario' }
    },
    dialogs: {
        new: {
            title: 'Novo lead',
            description: 'Cadastre um novo lead para acompanhamento comercial.',
            success: 'Lead cadastrado!'
        },
        schedule: {
            title: 'Agendar aula experimental',
            description: 'Selecione professor, data e horário para agendar a aula experimental.',
            loading: 'Carregando dados do agendamento...',
            success: 'Aula experimental agendada com sucesso!',
            confirm: 'Confirmar agendamento',
            finish: 'Concluir',
            open: 'Agendar aula experimental',
            code: 'Código do agendamento: {{code}}'
        },
        edit: {
            title: 'Editar lead',
            description: 'Atualize as informações do lead.',
            success: 'Lead atualizado!'
        },
        sections: {
            identification: 'Identificação',
            contact: 'Contato',
            source: 'Origem',
            context: 'Contexto'
        },
        messages: {
            created: 'Lead cadastrado com sucesso!',
            duplicateTitle: 'Lead duplicado',
            duplicatePhone: 'Já existe um lead cadastrado com o telefone {phone}. Deseja cadastrar mesmo assim?',
            duplicateEmail: 'Já existe um lead cadastrado com o email {email}. Deseja cadastrar mesmo assim?',
            duplicatePhoneAndEmail: 'Já existe um lead cadastrado com este telefone e email. Deseja cadastrar mesmo assim?',
            duplicateConfirm: 'Cadastrar mesmo assim',
            duplicateCancel: 'Cancelar',
            scheduleTitle: 'Aula experimental',
            scheduleExperimentalClass: 'Deseja seguir agora para o agendamento da aula experimental?',
            scheduleNow: 'Agendar agora',
            scheduleLater: 'Depois'
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
            actions: 'Ações'
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
        email: { label: 'Email', required: 'Email is required.', invalid: 'Invalid email.' },
        source: { label: 'Source', required: 'Source is required.' },
        campaign: { label: 'Campaign', none: 'No campaign' },
        status: { label: 'Status', required: 'Status is required.' },
        gender: { label: 'Gender' },
        age: { label: 'Age', required: 'Age is required.' },
        studyReason: { label: 'Study reason', required: 'Study reason is required.' },
        reason: { label: 'Reason', required: 'Reason is required.' },
        country: { label: 'Country', required: 'Country is required.' },
        city: { label: 'City', required: 'City is required.' },
        experimentalDate: { label: 'Class date', required: 'Class date is required.' },
        experimentalTime: { label: 'Class time', required: 'Class time is required.' },
        experimentalTeacher: { label: 'Teacher', required: 'Teacher is required.' },
        experimentalObservation: { label: 'Observations' },
        eventSourceUrl: { label: 'Source URL' },
        sellerId: { label: 'Seller', required: 'Seller is required.' },
        companyId: { label: 'Company' },
        disciplineId: { label: 'Discipline', required: 'Discipline is required.' },
        phoneCountryCode: { label: 'Country code' },
        phoneNumber: { label: 'Phone number', required: 'Phone number is required.', invalid: 'Invalid phone number.' },
        secondaryPhoneCountryCode: { label: 'Country code' },
        secondaryPhoneNumber: { label: 'Secondary phone' }
    },
    dialogs: {
        new: {
            title: 'New lead',
            description: 'Create a new lead for commercial follow-up.',
            success: 'Lead created!'
        },
        schedule: {
            title: 'Schedule experimental class',
            description: 'Select teacher, date and time to schedule the experimental class.',
            loading: 'Loading scheduling data...',
            success: 'Experimental class scheduled successfully!',
            confirm: 'Confirm schedule',
            finish: 'Finish',
            open: 'Schedule experimental class',
            code: 'Schedule code: {{code}}'
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
            duplicateCancel: 'Cancel',
            scheduleTitle: 'Experimental class',
            scheduleExperimentalClass: 'Do you want to continue now to the experimental class scheduling flow?',
            scheduleNow: 'Schedule now',
            scheduleLater: 'Later'
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
        newLead: 'New lead'
    }
}

export const leadsES = {
    fields: {
        name: { label: 'Nombre', required: 'Nombre es requerido.' },
        email: { label: 'Email', required: 'Email es requerido.', invalid: 'Email inválido.' },
        source: { label: 'Origen', required: 'Origen es requerido.' },
        campaign: { label: 'Campaña', none: 'Sin campaña' },
        status: { label: 'Estado', required: 'Estado es requerido.' },
        gender: { label: 'Género' },
        age: { label: 'Edad', required: 'Edad es requerido.' },
        studyReason: { label: 'Motivo de estudio', required: 'El motivo de estudio es requerido.' },
        reason: { label: 'Motivo', required: 'Motivo es requerido.' },
        country: { label: 'País', required: 'El país es requerido.' },
        city: { label: 'Ciudad', required: 'La ciudad es requerida.' },
        experimentalDate: { label: 'Fecha de la clase', required: 'La fecha de la clase es requerida.' },
        experimentalTime: { label: 'Horario de la clase', required: 'El horario de la clase es requerido.' },
        experimentalTeacher: { label: 'Profesor', required: 'El profesor es requerido.' },
        experimentalObservation: { label: 'Observaciones' },
        eventSourceUrl: { label: 'URL de origen' },
        sellerId: { label: 'Vendedor', required: 'Vendedor es requerido.' },
        companyId: { label: 'Empresa' },
        disciplineId: { label: 'Disciplina', required: 'Disciplina es requerido.' },
        phoneCountryCode: { label: 'Código de país' },
        phoneNumber: { label: 'Número de teléfono', required: 'Telefono es requerido.', invalid: 'Número de teléfono inválido.' },
        secondaryPhoneCountryCode: { label: 'Código de país' },
        secondaryPhoneNumber: { label: 'Telefono secundario' }
    },
    dialogs: {
        new: {
            title: 'Nuevo lead',
            description: 'Registra un nuevo lead para seguimiento comercial.',
            success: '¡Lead registrado!'
        },
        schedule: {
            title: 'Agendar clase experimental',
            description: 'Seleccione profesor, fecha y horario para agendar la clase experimental.',
            loading: 'Cargando datos de agendamiento...',
            success: '¡Clase experimental agendada con éxito!',
            confirm: 'Confirmar agendamiento',
            finish: 'Finalizar',
            open: 'Agendar clase experimental',
            code: 'Código de agendamiento: {{code}}'
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
            duplicateCancel: 'Cancelar',
            scheduleTitle: 'Clase experimental',
            scheduleExperimentalClass: '¿Deseas continuar ahora al flujo de agendamiento de la clase experimental?',
            scheduleNow: 'Agendar ahora',
            scheduleLater: 'Después'
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
