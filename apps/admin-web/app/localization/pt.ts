export const pt = {
    ariaLabels: {
        profileMenu: 'Menu de perfil'
    },
    languages: {
        pt: 'Português',
        en: 'Inglês'
    },
    dates: {
        short: '{{date, short}}',
        long: '{{date, long}}',
        ago: '{{date, ago}}'
    },
    duration: {
        short: '{{duration, duration}}',
        long: '{{duration, durationLong}}'
    },
    common: {},
    titles: {
        login: 'Entrar',
        home: 'Início',
        dashboard: 'Dashboard',
        linksPage: 'Links',
        leads: 'Leads'
    },
    sidebar: {},
    permissions: {},
    fields: {
        leads: {
            name: { label: 'Nome', required: 'O nome é obrigatório.' },
            phone: { label: 'Telefone', required: 'O telefone é obrigatório.' },
            secondaryPhone: { label: 'Telefone secundario' },
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
            disciplineId: { label: 'Disciplina', required: 'A disciplina é obrigatória.' }
        },
        auth: {
            verification: {
                required: 'A verificação é obrigatória'
            },
            email: {
                invalid: 'E-mail inválido',
                maxLength: 'O e-mail deve ter no máximo 255 caracteres'
            },
            password: {
                required: 'Senha é obrigatória',
                minLength: 'A senha deve ter pelo menos 6 caracteres',
                maxLength: 'A senha deve ter no máximo 100 caracteres'
            }
        }
    },
    tablePages: {
        leads: {
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
        }
    },
    formPages: {
        leads: {
            title: 'Leads',
            newLead: 'Novo lead'
        },
        login: {
            title: 'Entre na sua conta',
            description: 'Digite seu e-mail abaixo para entrar na sua conta',
            pageTitle: 'Entrar Alianza',
            pageDescription: 'Entre na sua conta Alianza',
            success: 'Login realizado com sucesso'
        }
    },
    dialogs: {
        leads: {
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
        }
    },
    tables: {
        headers: {
            actions: 'Ações',
            active: 'Ativo',
            createdAt: 'Data de cadastro',
            email: 'Email',
            inactive: 'Inativo',
            status: 'Status',
            protocols: 'Protocolos',
            type: 'Tipo'
        },
        totalRecords: 'Total de registros',
        summary: 'Mostrando {{start}}-{{end}} de {{count}}',
        pageOf: 'Página {{page}} de {{total}}',
        buttons: {
            edit: 'Editar',
            delete: 'Remover',
            active: 'Ativar',
            inactive: 'Desativar',
            continue: 'Continuar'
        }
    },
    pagination: {
        previousPage: 'Página anterior',
        nextPage: 'Próxima página'
    },
    links: {},
    buttons: {},
    serverError: {
        title: 'Erro do servidor',
        unexpected: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        description: 'Ocorreu um erro ao processar a solicitação.',
        returnHome: 'Voltar para a página inicial'
    },
    turnstile: {
        invalidResponse: 'Resposta inválida do captcha. Por favor, tente novamente.'
    },
    errors: {
        invalidCaptchaResponse: 'Resposta inválida do captcha. Por favor, tente novamente.'
    },
    alerts: {},
    logout: {
        dialogTitle: 'Encerrando sessão',
        dialogDescription: 'Sua sessão está sendo encerrada. Deseja continuar?',
        cancel: 'Cancelar',
        confirm: 'Encerrar sessão'
    },
    applicationErrors: {
        authTooManyAttempts: 'Muitas tentativas de login. Por favor, tente novamente mais tarde.',
        authUserNotFound: 'Usuário não encontrado.',
        unexpectedError: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
    }
}
