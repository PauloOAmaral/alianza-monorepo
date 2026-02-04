export const pt = {
    errors: {
        base: {
            unexpectedError: 'Sorry, an unexpected error occurred. Please try again or contact support.'
        },
        common: {
            databaseNotFound: 'Banco de dados não encontrado.',
            commonAlreadyExists: 'Este registro já existe.',
            commonNameAlreadyExists: 'Este nome já está em uso. Por favor, escolha outro nome.',
            commonValidationError: 'Os dados fornecidos são inválidos. Por favor, verifique suas informações e tente novamente.',
            commonNotFound: 'Não encontrado.',
            commonVersionLanguageAlreadyExists: 'Esta combinação de versão e idioma já existe. Por favor, use uma versão ou idioma diferente.'
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
            authTooManyPasswordResetRequests: 'Muitas solicitações de redefinição de senha. Aguarde alguns minutos antes de tentar novamente.'
        }
    }
}
