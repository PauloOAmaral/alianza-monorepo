import { en as enApplication } from '@alianza/application/localization'
export const en = {
    ariaLabels: {
        profileMenu: 'Profile menu'
    },
    languages: {
        pt: 'Portuguese',
        en: 'English'
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
            name: { label: 'Name', required: 'Name is required.' },
            phone: { label: 'Phone', required: 'Phone is required.' },
            secondaryPhone: { label: 'Secondary phone' },
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
            disciplineId: { label: 'Discipline', required: 'Discipline is required.' }
        },
        auth: {
            verification: {
                required: 'Verification is required'
            },
            email: {
                invalid: 'Invalid email',
                maxLength: 'Email must be at most 255 characters'
            },
            password: {
                required: 'Password is required',
                minLength: 'Password must be at least 6 characters',
                maxLength: 'Password must be at most 100 characters'
            }
        }
    },
    tablePages: {
        leads: {
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
        }
    },
    formPages: {
        leads: {
            title: 'Leads',
            newLead: 'New lead'
        },
        login: {
            title: 'Login to your account',
            description: 'Enter your email below to login to your account',
            pageTitle: 'Login Alianza',
            pageDescription: 'Login to your Alianza account',
            success: 'Login successful'
        }
    },
    dialogs: {
        leads: {
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
        }
    },
    tables: {
        headers: {
            actions: 'Actions',
            active: 'Active',
            createdAt: 'Registration date',
            email: 'Email',
            inactive: 'Inactive',
            status: 'Status',
            protocols: 'Protocols',
            type: 'Type'
        },
        totalRecords: 'Total records',
        summary: 'Showing {{start}}-{{end}} of {{count}}',
        pageOf: 'Page {{page}} of {{total}}',
        buttons: {
            edit: 'Edit',
            delete: 'Remove',
            active: 'Activate',
            inactive: 'Deactivate',
            continue: 'Continue'
        }
    },
    pagination: {
        previousPage: 'Previous page',
        nextPage: 'Next page'
    },
    links: {},
    buttons: {},
    serverError: {
        title: 'Server error',
        unexpected: 'An unexpected error occurred. Please try again.',
        description: 'An error occurred while processing the request.',
        returnHome: 'Return to home page'
    },
    turnstile: {
        invalidResponse: 'Invalid captcha response. Please try again.'
    },
    errors: {
        invalidCaptchaResponse: 'Invalid captcha response. Please try again.'
    },
    alerts: {},
    logout: {
        dialogTitle: 'Ending session',
        dialogDescription: 'Your session is being ended. Do you want to continue?',
        cancel: 'Cancel',
        confirm: 'End session'
    },
    applicationErrors: {
        authTooManyAttempts: 'Too many login attempts. Please try again later.',
        authUserNotFound: 'User not found.',
        unexpectedError: 'An unexpected error occurred. Please try again.'
    },
    enums: enApplication.enums
}
