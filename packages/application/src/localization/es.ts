export const es = {
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
            unexpectedError: 'Lo sentimos, ha ocurrido un error inesperado. Por favor, inténtelo de nuevo o contacte con soporte.'
        },
        common: {
            invalidTurnstileResponse: 'Respuesta inválida del captcha. Por favor, inténtelo de nuevo.',
            databaseNotFound: 'Base de datos no encontrada.',
            commonAlreadyExists: 'Este registro ya existe.',
            commonNameAlreadyExists: 'Este nombre ya está en uso. Por favor, elija otro nombre.',
            commonValidationError: 'Los datos proporcionados no son válidos. Por favor, verifique su información e inténtelo de nuevo.',
            commonNotFound: 'No encontrado.',
            commonVersionLanguageAlreadyExists: 'Esta combinación de versión e idioma ya existe. Por favor, use una versión o idioma diferente.'
        },
        auth: {
            authSignupConfirmationExpired: 'El enlace de confirmación de registro ha expirado. Por favor, solicite un nuevo enlace de confirmación para continuar.',
            authUserAlreadyExists: 'Este correo ya está registrado. Por favor, inicie sesión o utilice otra dirección de correo.',
            authDomainConfiguredForSaml: 'Su empresa utiliza inicio de sesión único (SSO). Por favor, utilice su correo corporativo para autenticarse.',
            authInvalidPassword: 'La contraseña introducida es incorrecta. Por favor, verifique e inténtelo de nuevo.',
            authUserNotFound: 'No encontramos una cuenta con este correo. Por favor, verifique la dirección proporcionada.',
            authEmailNotVerified: 'Su correo aún no ha sido verificado. Por favor, revise su bandeja de entrada para confirmar su registro.',
            authTenantNotFound: 'No encontramos la empresa especificada. Por favor, verifique el código e inténtelo de nuevo.',
            authUserTenantNotFound: 'No tiene acceso a esta empresa. Por favor, verifique sus permisos o solicite acceso.',
            authInviteNotFoundOrExpired: 'La invitación ya no es válida. Por favor, solicite una nueva invitación al administrador.',
            authInviteAlreadyAccepted: 'Esta invitación ya ha sido utilizada. Por favor, inicie sesión normalmente con sus credenciales.',
            authUserAlreadyExistsWithinTenant: 'Ya tiene acceso a esta empresa.',
            authPasswordResetNotFoundOrExpired: 'El enlace de restablecimiento de contraseña ha expirado. Por favor, solicite un nuevo enlace para continuar.',
            authEmailVerificationNotFoundOrExpired: 'El enlace de verificación ha expirado. Por favor, solicite un nuevo enlace de verificación.',
            authInvalidToken: 'El token de acceso no es válido. Por favor, inténtelo de nuevo o solicite un nuevo enlace.',
            authSessionNotFound: 'Su sesión ha expirado por seguridad. Por favor, inicie sesión de nuevo.',
            authInvalidSamlResponse: 'Hubo un problema con la autenticación SSO. Por favor, inténtelo de nuevo.',
            authErrorLinkingSamlProviderToUser: 'No se pudo vincular su cuenta al SSO. Por favor, inténtelo de nuevo o contacte con soporte.',
            authUserEmailDoesNotMatchSamlResponse: 'El correo de su cuenta no coincide con el correo del SSO. Por favor, verifique e inténtelo de nuevo.',
            authErrorGettingSamlAuthorizeUrl: 'No se pudo iniciar la autenticación SSO. Por favor, inténtelo de nuevo.',
            authDomainNotConfiguredForSaml: 'Este dominio no tiene SSO configurado. Por favor, inicie sesión con su correo y contraseña.',
            authUserTenantInvitationExpired: 'La invitación a esta empresa ha expirado. Por favor, solicite una nueva invitación al administrador.',
            authUserHasNoContext: 'Su cuenta no está vinculada a ningún contexto. Por favor, solicite una invitación al administrador.',
            authErrorParsingSamlMetadata: 'Hubo un error al procesar la información del SSO. Por favor, inténtelo de nuevo o contacte con soporte.',
            authDocumentAlreadyInUse: 'Esta combinación de número y tipo de documento ya está en uso.',
            authCannotEditOwnPermissionGroup: 'No puede editar ni eliminar su propio grupo de permisos.',
            authPermissionGroupAdminCannotBeChanged: 'Este grupo de permisos no puede ser modificado ni eliminado.',
            authPermissionGroupUsed: 'Este grupo de permisos está en uso por un usuario de la empresa. Por favor, elimine el usuario de la empresa antes de eliminar el grupo de permisos.',
            authInvalidPermissionGroups: 'Grupos de permisos no válidos seleccionados.',
            authCannotChangeOwnPermissions: 'No puede cambiar sus propios permisos.',
            authCannotRemoveYourself: 'No puede eliminarse a sí mismo.',
            authTooManyAttempts: 'Demasiados intentos de inicio de sesión incorrectos. Su cuenta ha sido bloqueada temporalmente por seguridad. Por favor, inténtelo más tarde.',
            authTooManyPasswordResetRequests: 'Demasiadas solicitudes de restablecimiento de contraseña. Por favor, espere unos minutos antes de intentar de nuevo.'
        },
        serverError: {
            title: 'Error del servidor',
            unexpected: 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.',
            description: 'Ha ocurrido un error al procesar la solicitud.',
            returnHome: 'Volver a la página principal'
        }
    },
    logout: {
        dialogTitle: 'Cerrando sesión',
        dialogDescription: 'Su sesión se está cerrando. ¿Desea continuar?',
        cancel: 'Cancelar',
        confirm: 'Cerrar sesión'
    },
    tables: {
        headers: {
            actions: 'Acciones',
            active: 'Activo',
            createdAt: 'Fecha de registro',
            email: 'Email',
            inactive: 'Inactivo',
            status: 'Status',
            protocols: 'Protocolos',
            type: 'Tipo'
        },
        totalRecords: 'Total de registros',
        summary: 'Mostrando {{start}}-{{end}} de {{count}}',
        pageOf: 'Página {{page}} de {{total}}',
        buttons: {
            edit: 'Editar',
            delete: 'Eliminar',
            actions: 'Acciones',
            active: 'Activar',
            inactive: 'Desactivar',
            continue: 'Continuar'
        }
    },
    pagination: {
        previousPage: 'Página anterior',
        nextPage: 'Página siguiente'
    },
    languages: {
        pt: 'Portugués',
        en: 'Inglés',
        es: 'Español'
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
        save: 'Guardar',
        cancel: 'Cancelar',
        confirm: 'Confirmar'
    },
    enums: {
        gender: {
            unknown: 'No informado',
            masculine: 'Masculino',
            feminine: 'Femenino'
        },
        status: {
            preAnalisys: 'Pre-análisis',
            created: 'Registrado',
            inService: 'En atención',
            experimentalClass: 'Clase experimental',
            experimentalClassMissed: 'Reprogramar',
            feedback: 'Feedback',
            contract: 'Firma de contrato',
            waitingPayment: 'Esperando pago',
            paid: 'Matriculado',
            talkLater: 'Hablar después',
            disqualified: 'Descalificado'
        },
        sources: {
            facebook: 'Facebook',
            messenger: 'Messenger',
            instagram: 'Instagram',
            direct: 'Directo',
            google: 'Google',
            tiktok: 'TikTok',
            youtube: 'YouTube',
            blog: 'Blog',
            email: 'Email',
            indication: 'Indicación',
            company: 'Empresa',
            affiliate: 'Afiliado',
            influencer: 'Influencer',
            studentIndication: 'Indicación de alumno',
            facebookForms: 'Formularios Facebook',
            exStudent: 'Ex alumno',
            campaign: 'Campaña'
        },
        age: {
            under12: 'Menor de 12',
            from12To18: '12 a 18',
            from18To22: '18 a 22',
            from22To28: '22 a 28',
            from28To40: '28 a 40',
            from40To65: '40 a 65',
            older65: 'Mayor de 65'
        }
    }
}
