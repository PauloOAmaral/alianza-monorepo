export const es = {
    ariaLabels: {
        profileMenu: 'Menú de perfil'
    },
    languages: {
        pt: 'Portuguese',
        en: 'English',
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
    common: {},
    titles: {
        login: 'Login',
        home: 'Home',
        dashboard: 'Dashboard',
        linksPage: 'Links',
        leads: 'Leads'
    },
    sidebar: {},
    permissions: {},
    fields: {
        required: 'Obligatorio',
        password: 'Contraseña',
        forgotPassword: '¿Olvidaste tu contraseña?',
        auth: {
            verification: {
                required: 'La verificación es obligatoria'
            },
            email: {
                invalid: 'Correo electrónico inválido',
                maxLength: 'El correo debe tener como máximo 255 caracteres'
            },
            password: {
                required: 'La contraseña es obligatoria',
                minLength: 'La contraseña debe tener al menos 6 caracteres',
                maxLength: 'La contraseña debe tener como máximo 100 caracteres'
            }
        }
    },
    tablePages: {},
    leads: {
        page: {
            title: 'Leads',
            summary: 'Mostrando {{start}}-{{end}} de {{count}}',
            pageOf: 'Pagina {{page}} de {{total}}',
            newLead: 'Nuevo lead'
        },
        table: {
            id: 'ID',
            name: 'Nombre',
            phone: 'Telefono',
            email: 'Email',
            seller: 'Seller',
            status: 'Estado',
            actions: 'Acciones',
            empty: 'No se encontraron leads.'
        },
        status: {
            pre_analisys: 'Pre-analisis',
            created: 'Creado',
            in_service: 'En atencion',
            experimental_class: 'Clase experimental',
            experimental_class_missed: 'Reprogramar',
            feedback: 'Feedback',
            contract: 'Firma de contrato',
            waiting_payment: 'Esperando pago',
            paid: 'Matriculado',
            talk_later: 'Hablar despues',
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
            indication: 'Indicacion',
            company: 'Empresa',
            affiliate: 'Afiliado',
            influencer: 'Influencer',
            studentIndication: 'Indicacion de alumno',
            facebookForms: 'Formularios Facebook',
            exStudent: 'Ex alumno',
            campaign: 'Campana'
        },
        form: {
            title: 'Nuevo lead',
            description: 'Registra un nuevo lead para seguimiento comercial.',
            sections: {
                identification: 'Identificacion',
                contact: 'Contacto',
                source: 'Origen',
                context: 'Contexto'
            },
            fields: {
                name: 'Nombre',
                phone: 'Telefono',
                secondaryPhone: 'Telefono secundario',
                email: 'Email',
                source: 'Origen',
                campaign: 'Campana',
                status: 'Estado',
                gender: 'Genero',
                age: 'Edad',
                reason: 'Motivo',
                eventSourceUrl: 'URL de origen',
                sellerId: 'Seller ID',
                companyId: 'Company ID',
                disciplineId: 'Discipline ID'
            },
            placeholders: {
                name: 'Nombre completo',
                phone: 'Numero principal',
                email: 'email@ejemplo.com',
                source: 'Selecciona el origen',
                campaign: 'Selecciona la campana',
                status: 'Selecciona el estado',
                noCampaign: 'Sin campana',
                phoneCountryCode: 'DDI',
                phoneNumber: 'Numero',
                gender: 'Selecciona el genero',
                age: 'Selecciona la edad',
                reason: 'Describe el motivo',
                eventSourceUrl: 'https://',
                sellerId: 'ID del vendedor',
                companyId: 'ID de la empresa',
                disciplineId: 'ID de la disciplina'
            },
            age: {
                under_12: 'Menor de 12',
                from_12_to_18: '12 a 18',
                from_18_to_22: '18 a 22',
                from_22_to_28: '22 a 28',
                from_28_to_40: '28 a 40',
                from_40_to_65: '40 a 65',
                older_65: 'Mayor de 65'
            },
            gender: {
                unknown: 'No informado',
                masculine: 'Masculino',
                feminine: 'Femenino'
            },
            actions: {
                save: 'Guardar lead',
                cancel: 'Cancelar'
            },
            errors: {
                nameRequired: 'Completa el nombre para continuar.',
                phoneRequired: 'Completa el telefono para continuar.',
                phoneInvalid: 'Numero de telefono invalido.',
                phoneCountryRequired: 'DDI obligatorio.',
                emailInvalid: 'Email invalido',
                sourceRequired: 'Origen obligatorio.'
            }
        },
        edit: {
            title: 'Editar lead',
            description: 'Actualiza la informacion del lead.',
            actions: {
                save: 'Guardar cambios'
            },
            messages: {
                updated: 'Lead actualizado con exito!'
            }
        },
        messages: {
            created: 'Lead creado con exito!',
            duplicateTitle: 'Lead duplicado',
            duplicatePhone: 'Ya existe un lead con el telefono {phone}. Deseas registrar igualmente?',
            duplicateEmail: 'Ya existe un lead con el email {email}. Deseas registrar igualmente?',
            duplicatePhoneAndEmail: 'Ya existe un lead con este telefono y email. Deseas registrar igualmente?',
            duplicateConfirm: 'Registrar igualmente',
            duplicateCancel: 'Cancelar'
        }
    },
    formPages: {
        login: {
            title: 'Inicia sesión en tu cuenta',
            description: 'Ingresa tu correo electrónico para iniciar sesión en tu cuenta',
            pageTitle: 'Iniciar sesión Alianza',
            pageDescription: 'Inicia sesión en tu cuenta Alianza',
            success: 'Inicio de sesión exitoso'
        }
    },
    dialogs: {},
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
        buttons: {
            edit: 'Editar',
            delete: 'Eliminar',
            active: 'Activar',
            inactive: 'Desactivar',
            continue: 'Continuar'
        }
    },
    pagination: {
        previousPage: 'Página anterior',
        nextPage: 'Página siguiente'
    },
    links: {},
    buttons: {},
    serverError: {
        title: 'Error del servidor',
        unexpected: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.',
        description: 'Ocurrió un error al procesar la solicitud.',
        returnHome: 'Volver a la página principal'
    },
    turnstile: {
        invalidResponse: 'Respuesta de captcha inválida. Por favor, inténtalo de nuevo.'
    },
    errors: {
        invalidCaptchaResponse: 'Respuesta de captcha inválida. Por favor, inténtalo de nuevo.'
    },
    alerts: {},
    logout: {
        dialogTitle: 'Cerrando sesión',
        dialogDescription: 'Tu sesión está siendo cerrada. ¿Deseas continuar?',
        cancel: 'Cancelar',
        confirm: 'Cerrar sesión'
    },
    applicationErrors: {
        authTooManyAttempts: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.',
        authUserNotFound: 'Usuario no encontrado.',
        unexpectedError: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
    }
}
