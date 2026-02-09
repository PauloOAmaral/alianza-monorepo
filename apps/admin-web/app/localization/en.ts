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
        required: 'Required',
        password: 'Password',
        forgotPassword: 'Forgot your password?',
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
    tablePages: {},
    leads: {
        page: {
            title: 'Leads',
            summary: 'Showing {{start}}-{{end}} of {{count}}',
            pageOf: 'Page {{page}} of {{total}}',
            newLead: 'New lead'
        },
        table: {
            id: 'ID',
            name: 'Name',
            phone: 'Phone',
            email: 'Email',
            seller: 'Seller',
            status: 'Status',
            actions: 'Actions',
            empty: 'No leads found.'
        },
        status: {
            pre_analisys: 'Pre-analysis',
            created: 'Created',
            in_service: 'In service',
            experimental_class: 'Experimental class',
            experimental_class_missed: 'Reschedule',
            feedback: 'Feedback',
            contract: 'Contract signing',
            waiting_payment: 'Waiting payment',
            paid: 'Enrolled',
            talk_later: 'Talk later',
            disqualified: 'Disqualified'
        },
        sources: {
            facebook: 'Facebook',
            messenger: 'Messenger',
            instagram: 'Instagram',
            direct: 'Direct',
            google: 'Google',
            tiktok: 'TikTok',
            youtube: 'YouTube',
            blog: 'Blog',
            email: 'Email',
            indication: 'Indication',
            company: 'Company',
            affiliate: 'Affiliate',
            influencer: 'Influencer',
            studentIndication: 'Student indication',
            facebookForms: 'Facebook forms',
            exStudent: 'Ex-student',
            campaign: 'Campaign'
        },
        form: {
            title: 'New lead',
            description: 'Create a new lead for commercial follow-up.',
            sections: {
                identification: 'Identification',
                contact: 'Contact',
                source: 'Source',
                context: 'Context'
            },
            fields: {
                name: 'Name',
                phone: 'Phone',
                secondaryPhone: 'Secondary phone',
                email: 'Email',
                source: 'Source',
                campaign: 'Campaign',
                status: 'Status',
                gender: 'Gender',
                age: 'Age',
                reason: 'Reason',
                eventSourceUrl: 'Source URL',
                sellerId: 'Seller ID',
                companyId: 'Company ID',
                disciplineId: 'Discipline ID'
            },
            placeholders: {
                name: 'Full name',
                phone: 'Primary number',
                email: 'email@example.com',
                source: 'Select source',
                campaign: 'Select campaign',
                status: 'Select status',
                noCampaign: 'No campaign',
                phoneCountryCode: 'DDI',
                phoneNumber: 'Number',
                gender: 'Select gender',
                age: 'Select age',
                reason: 'Describe the reason',
                eventSourceUrl: 'https://',
                sellerId: 'Seller ID',
                companyId: 'Company ID',
                disciplineId: 'Discipline ID'
            },
            age: {
                under_12: 'Under 12',
                from_12_to_18: '12 to 18',
                from_18_to_22: '18 to 22',
                from_22_to_28: '22 to 28',
                from_28_to_40: '28 to 40',
                from_40_to_65: '40 to 65',
                older_65: 'Over 65'
            },
            gender: {
                unknown: 'Not informed',
                masculine: 'Masculine',
                feminine: 'Feminine'
            },
            actions: {
                save: 'Save lead',
                cancel: 'Cancel'
            },
            errors: {
                nameRequired: 'Please provide a name.',
                phoneRequired: 'Please provide a phone number.',
                phoneInvalid: 'Invalid phone number.',
                phoneCountryRequired: 'Country code is required.',
                emailInvalid: 'Invalid email',
                sourceRequired: 'Source is required.'
            }
        },
        edit: {
            title: 'Edit lead',
            description: 'Update lead information.',
            actions: {
                save: 'Save changes'
            },
            messages: {
                updated: 'Lead updated successfully!'
            }
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
    },
    formPages: {
        login: {
            title: 'Login to your account',
            description: 'Enter your email below to login to your account',
            pageTitle: 'Login Alianza',
            pageDescription: 'Login to your Alianza account',
            success: 'Login successful'
        }
    },
    dialogs: {},
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
    }
}
