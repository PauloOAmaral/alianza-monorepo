export const pt = {
    dialogs: {
        activate: {
            title: 'Ativar'
        },
        deactivate: {
            title: 'Desativar'
        }
    },
    errors: {
        base: {
            unexpectedError: 'Sorry, an unexpected error occurred. Please try again or contact support.'
        },
        common: {
            invalidTurnstileResponse: 'Resposta inválida do captcha. Por favor, tente novamente.',
            databaseNotFound: 'Banco de dados não encontrado.',
            commonAlreadyExists: 'Este registro já existe.',
            commonNameAlreadyExists: 'Este nome já está em uso. Por favor, escolha outro nome.',
            commonValidationError: 'Os dados fornecidos são inválidos. Por favor, verifique suas informações e tente novamente.',
            commonNotFound: 'Não encontrado.',
            commonVersionLanguageAlreadyExists: 'Esta combinação de versão e idioma já existe. Por favor, use uma versão ou idioma diferente.'
        },
        serverError: {
            title: 'Erro do servidor',
            unexpected: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
            description: 'Ocorreu um erro ao processar a solicitação.',
            returnHome: 'Voltar para a página inicial'
        },
        auth: {
            authSignupConfirmationExpired: 'O link de confirmação de cadastro expirou. Por favor, solicite um novo link de confirmação para continuar.',
            authUserAlreadyExists: 'Este email já está cadastrado. Por favor, faça login ou utilize outro endereço de email.',
            authDomainConfiguredForSaml: 'Sua empresa utiliza autenticação única (SSO). Por favor, utilize seu e-mail corporativo para autenticar.',
            authInvalidPassword: 'A senha informada está incorreta. Por favor, verifique e tente novamente.',
            authUserNotFound: 'Não encontramos uma conta com este email. Por favor, verifique o endereço informado.',
            authEmailNotVerified: 'Seu email ainda não foi verificado. Por favor, acesse sua caixa de entrada para confirmar seu cadastro.',
            authTenantNotFound: 'Não encontramos a empresa informada. Por favor, verifique o código e tente novamente.',
            authUserTenantNotFound: 'Você não possui acesso a esta empresa. Por favor, verifique suas permissões ou solicite acesso.',
            authInviteNotFoundOrExpired: 'O convite não está mais válido. Por favor, solicite um novo convite ao administrador.',
            authInviteAlreadyAccepted: 'Este convite já foi utilizado. Por favor, faça login normalmente com suas credenciais.',
            authUserAlreadyExistsWithinTenant: 'O usuário já possui acesso a esta empresa.',
            authPasswordResetNotFoundOrExpired: 'O link de redefinição de senha expirou. Por favor, solicite um novo link para continuar.',
            authEmailVerificationNotFoundOrExpired: 'O link de verificação expirou. Por favor, solicite um novo link de verificação.',
            authInvalidToken: 'O token de acesso é inválido. Por favor, tente novamente ou solicite um novo link.',
            authSessionNotFound: 'Sua sessão expirou por segurança. Por favor, faça login novamente.',
            authInvalidSamlResponse: 'Houve um problema com a autenticação SSO. Por favor, tente novamente.',
            authErrorLinkingSamlProviderToUser: 'Não foi possível vincular sua conta ao SSO. Por favor, tente novamente ou contate o suporte.',
            authUserEmailDoesNotMatchSamlResponse: 'O email da sua conta não corresponde ao email do SSO. Por favor, verifique e tente novamente.',
            authErrorGettingSamlAuthorizeUrl: 'Não foi possível iniciar a autenticação SSO. Por favor, tente novamente.',
            authDomainNotConfiguredForSaml: 'Este domínio não possui SSO configurado. Por favor, faça login com seu email e senha.',
            authUserTenantInvitationExpired: 'O convite para esta empresa expirou. Por favor, solicite um novo convite ao administrador.',
            authUserHasNoContext: 'Sua conta não está vinculada a nenhum contexto. Por favor, solicite um convite ao administrador.',
            authErrorParsingSamlMetadata: 'Houve um erro ao processar as informações do SSO. Por favor, tente novamente ou contate o suporte.',
            authDocumentAlreadyInUse: 'Esta combinação de número e tipo de documento já está em uso.',
            authCannotEditOwnPermissionGroup: 'Você não pode editar ou excluir seu próprio grupo de permissões.',
            authPermissionGroupAdminCannotBeChanged: 'Este grupo de permissões não pode ser alterado ou deletado.',
            authPermissionGroupUsed: 'Este grupo de permissões está sendo utilizado por uma empresa. Por favor, remova a empresa antes de deletar o grupo de permissões.',
            authInvalidPermissionGroups: 'Grupos de permissões inválidos selecionados.',
            authCannotChangeOwnPermissions: 'Você não pode alterar suas próprias permissões.',
            authCannotRemoveYourself: 'Você não pode remover a si mesmo.',
            authTooManyAttempts: 'Muitas tentativas de login incorretas. Sua conta foi bloqueada temporariamente por segurança. Tente novamente mais tarde.',
            authTooManyPasswordResetRequests: 'Muitas solicitações de redefinição de senha. Aguarde alguns minutos antes de tentar novamente.',
        }
    },
    logout: {
        dialogTitle: 'Encerrando sessão',
        dialogDescription: 'Sua sessão está sendo encerrada. Deseja continuar?',
        cancel: 'Cancelar',
        confirm: 'Encerrar sessão'
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
            actions: 'Ações',
            active: 'Ativar',
            inactive: 'Desativar',
            continue: 'Continuar'
        }
    },
    pagination: {
        previousPage: 'Página anterior',
        nextPage: 'Página seguinte'
    },
    languages: {
        pt: 'Português',
        en: 'Inglês',
        es: 'Espanhol'
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
    buttons: {
        save: 'Salvar',
        cancel: 'Cancelar',
        confirm: 'Confirmar'
    },
    enums: {
        gender: {
            unknown: 'Nao informado',
            masculine: 'Masculino',
            feminine: 'Feminino'
        },
        status: {
            preAnalisys: 'Pre-analise',
            created: 'Cadastrado',
            inService: 'Em atendimento',
            experimentalClass: 'Aula experimental',
            experimentalClassMissed: 'Reagendar',
            feedback: 'Feedback',
            contract: 'Assinatura do contrato',
            waitingPayment: 'Aguardando pagamento',
            paid: 'Matriculado',
            talkLater: 'Falar depois',
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
        age: {
            under12: 'Abaixo de 12',
            from12To18: '12 a 18',
            from18To22: '18 a 22',
            from22To28: '22 a 28',
            from28To40: '28 a 40',
            from40To65: '40 a 65',
            older65: 'Acima de 65'
        },
    }
}
