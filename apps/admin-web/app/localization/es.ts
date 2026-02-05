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
            pageOf: 'PÃ¡gina {{page}} de {{total}}'
        },
        table: {
            id: 'ID',
            name: 'Nombre',
            phone: 'TelÃ©fono',
            email: 'Email',
            status: 'Estado',
            actions: 'Acciones',
            empty: 'No se encontraron leads.'
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
