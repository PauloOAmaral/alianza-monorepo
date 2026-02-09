import { es as esApplication } from '@alianza/application/localization'
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
        leads: {
            name: { label: 'Nombre', required: 'El nombre es obligatorio.' },
            phone: { label: 'Teléfono', required: 'El teléfono es obligatorio.' },
            secondaryPhone: { label: 'Teléfono secundario' },
            email: { label: 'Email', required: 'El email es obligatorio.' },
            source: { label: 'Origen', required: 'El origen es obligatorio.' },
            campaign: { label: 'Campaña' },
            status: { label: 'Estado', required: 'El estado es obligatorio.' },
            gender: { label: 'Género' },
            age: { label: 'Edad', required: 'La edad es obligatoria.' },
            reason: { label: 'Motivo', required: 'El motivo es obligatorio.' },
            eventSourceUrl: { label: 'URL de origen' },
            sellerId: { label: 'Vendedor', required: 'El vendedor es obligatorio.' },
            companyId: { label: 'Empresa' },
            disciplineId: { label: 'Disciplina', required: 'La disciplina es obligatoria.' }
        },
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
    tablePages: {
        leads: {
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
        }
    },
    formPages: {
        leads: {
            title: 'Leads',
            newLead: 'Nuevo lead'
        },
        login: {
            title: 'Inicia sesión en tu cuenta',
            description: 'Ingresa tu correo electrónico para iniciar sesión en tu cuenta',
            pageTitle: 'Iniciar sesión Alianza',
            pageDescription: 'Inicia sesión en tu cuenta Alianza',
            success: 'Inicio de sesión exitoso'
        }
    },
    dialogs: {
        leads: {
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
        }
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
    },
    enums: esApplication.enums
}
