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
        required: 'Obrigatório',
        password: 'Senha',
        forgotPassword: 'Esqueceu sua senha?',
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
    tablePages: {},
    leads: {
        page: {
            title: 'Leads',
            summary: 'Mostrando {{start}}-{{end}} de {{count}}',
            pageOf: 'Página {{page}} de {{total}}',
            newLead: 'Novo lead'
        },
        table: {
            id: 'ID',
            name: 'Nome',
            phone: 'Telefone',
            email: 'Email',
            seller: 'Seller',
            status: 'Status',
            actions: 'Acoes',
            empty: 'Nenhum lead encontrado.'
        },
        status: {
            pre_analisys: 'Pre-analise',
            created: 'Cadastrado',
            in_service: 'Em atendimento',
            experimental_class: 'Aula experimental',
            experimental_class_missed: 'Reagendar',
            feedback: 'Feedback',
            contract: 'Assinatura do contrato',
            waiting_payment: 'Aguardando pagamento',
            paid: 'Matriculado',
            talk_later: 'Falar depois',
            disqualified: 'Desqualificado'
        },
        sources: {
            facebook: 'Facebook',
            messenger: 'Messenger',
            instagram: 'Instagram',
            direct: 'Direto',
            google: 'Google',
            tiktok: 'TikTok',
            youtube: 'YouTube',
            blog: 'Blog',
            email: 'Email',
            indication: 'Indicacao',
            company: 'Empresa',
            affiliate: 'Afiliado',
            influencer: 'Influenciador',
            studentIndication: 'Indicacao de aluno',
            facebookForms: 'Formularios Facebook',
            exStudent: 'Ex-aluno',
            campaign: 'Campanha'
        },
        form: {
            title: 'Novo lead',
            description: 'Cadastre um novo lead para acompanhamento comercial.',
            sections: {
                identification: 'Identificacao',
                contact: 'Contato',
                source: 'Origem',
                context: 'Contexto'
            },
            fields: {
                name: 'Nome',
                phone: 'Telefone',
                secondaryPhone: 'Telefone secundario',
                email: 'Email',
                source: 'Origem',
                campaign: 'Campanha',
                status: 'Status',
                gender: 'Genero',
                age: 'Idade',
                reason: 'Motivo',
                eventSourceUrl: 'URL de origem',
                sellerId: 'Seller ID',
                companyId: 'Company ID',
                disciplineId: 'Discipline ID'
            },
            placeholders: {
                name: 'Nome completo',
                phone: 'Numero principal',
                email: 'email@exemplo.com',
                source: 'Selecione a origem',
                campaign: 'Selecione a campanha',
                status: 'Selecione o status',
                noCampaign: 'Sem campanha',
                phoneCountryCode: 'DDI',
                phoneNumber: 'Numero',
                gender: 'Selecione o genero',
                age: 'Selecione a idade',
                reason: 'Descreva o motivo',
                eventSourceUrl: 'https://',
                sellerId: 'ID do vendedor',
                companyId: 'ID da empresa',
                disciplineId: 'ID da disciplina'
            },
            age: {
                under_12: 'Abaixo de 12',
                from_12_to_18: '12 a 18',
                from_18_to_22: '18 a 22',
                from_22_to_28: '22 a 28',
                from_28_to_40: '28 a 40',
                from_40_to_65: '40 a 65',
                older_65: 'Acima de 65'
            },
            gender: {
                unknown: 'Nao informado',
                masculine: 'Masculino',
                feminine: 'Feminino'
            },
            actions: {
                save: 'Salvar lead',
                cancel: 'Cancelar'
            },
            errors: {
                nameRequired: 'Preencha o nome para continuar.',
                phoneRequired: 'Preencha o telefone para continuar.',
                phoneInvalid: 'Numero de telefone invalido.',
                phoneCountryRequired: 'DDI obrigatorio.',
                emailInvalid: 'Email invalido',
                sourceRequired: 'Origem obrigatoria.'
            }
        },
        edit: {
            title: 'Editar lead',
            description: 'Atualize as informacoes do lead.',
            actions: {
                save: 'Salvar alteracoes'
            },
            messages: {
                updated: 'Lead atualizado com sucesso!'
            }
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
    formPages: {
        login: {
            title: 'Entre na sua conta',
            description: 'Digite seu e-mail abaixo para entrar na sua conta',
            pageTitle: 'Entrar Alianza',
            pageDescription: 'Entre na sua conta Alianza',
            success: 'Login realizado com sucesso'
        }
    },
    dialogs: {},
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
