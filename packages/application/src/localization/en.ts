export const en = {
    dialogs: {
        activate: {
            title: 'Activate'
        },
        deactivate: {
            title: 'Deactivate'
        }
    },
    errors: {
        base: {
            unexpectedError: 'Sorry, an unexpected error occurred. Please try again or contact support.'
        },
        common: {
            invalidTurnstileResponse: 'Invalid captcha response. Please try again.',
            databaseNotFound: 'Database not found.',
            commonAlreadyExists: 'This record already exists.',
            commonExperimentalScheduleLeadNotFound: 'Lead not found for experimental class scheduling.',
            commonExperimentalScheduleLeadInactive: 'Lead is inactive and cannot be scheduled.',
            commonExperimentalScheduleTeacherNotFound: 'Teacher not found.',
            commonExperimentalScheduleTeacherInactive: 'Teacher is inactive.',
            commonExperimentalScheduleTeacherUnavailable: 'Teacher is unavailable for the selected date and time.',
            commonExperimentalScheduleTimeBusy: 'Selected time is already occupied.',
            commonExperimentalScheduleDateInPast: 'Please select a future date and time.',
            commonExperimentalScheduleCountryNotFound: 'Country not found.',
            commonExperimentalScheduleAlreadyExists: 'This lead already has an experimental class scheduled.',
            commonNameAlreadyExists: 'This name is already in use. Please choose another name.',
            commonValidationError: 'The provided data is invalid. Please check your information and try again.',
            commonNotFound: 'Not found.',
            commonVersionLanguageAlreadyExists: 'This version and language combination already exists. Please use a different version or language.'
        },
        auth: {
            authSignupConfirmationExpired: 'The registration confirmation link has expired. Please request a new confirmation link to continue.',
            authUserAlreadyExists: 'This email is already registered. Please login or use another email address.',
            authDomainConfiguredForSaml: 'Your company uses single sign-on (SSO). Please use your corporate email to authenticate.',
            authInvalidPassword: 'The password entered is incorrect. Please verify and try again.',
            authUserNotFound: "We couldn't find an account with this email. Please verify the address provided.",
            authEmailNotVerified: "Your email hasn't been verified yet. Please check your inbox to confirm your registration.",
            authTenantNotFound: "We couldn't find the specified company. Please verify the code and try again.",
            authUserTenantNotFound: "You don't have access to this company. Please verify your permissions or request access.",
            authInviteNotFoundOrExpired: 'The invitation is no longer valid. Please request a new invite from the administrator.',
            authInviteAlreadyAccepted: 'This invitation has already been used. Please login normally with your credentials.',
            authUserAlreadyExistsWithinTenant: 'You already have access to this company.',
            authPasswordResetNotFoundOrExpired: 'The password reset link has expired. Please request a new link to continue.',
            authEmailVerificationNotFoundOrExpired: 'The verification link has expired. Please request a new verification link.',
            authInvalidToken: 'The access token is invalid. Please try again or request a new link.',
            authSessionNotFound: 'Your session has expired for security. Please login again.',
            authInvalidSamlResponse: 'There was a problem with SSO authentication. Please try again.',
            authErrorLinkingSamlProviderToUser: 'Unable to link your account to SSO. Please try again or contact support.',
            authUserEmailDoesNotMatchSamlResponse: "Your account email doesn't match the SSO email. Please verify and try again.",
            authErrorGettingSamlAuthorizeUrl: 'Unable to initiate SSO authentication. Please try again.',
            authDomainNotConfiguredForSaml: "This domain doesn't have SSO configured. Please login with your email and password.",
            authUserTenantInvitationExpired: 'The invitation to this company has expired. Please request a new invite from the administrator.',
            authUserHasNoContext: "Your account isn't linked to any context. Please request an invite from the administrator.",
            authErrorParsingSamlMetadata: 'There was an error processing SSO information. Please try again or contact support.',
            authDocumentAlreadyInUse: 'This document number and type combination is already in use.',
            authCannotEditOwnPermissionGroup: 'You cannot edit or delete your own permission group.',
            authPermissionGroupAdminCannotBeChanged: 'This permission group cannot be changed or deleted.',
            authPermissionGroupUsed: 'This permission group is used by a user tenant. Please remove the user tenant before deleting the permission group.',
            authInvalidPermissionGroups: 'Invalid permission groups selected.',
            authCannotChangeOwnPermissions: 'You cannot change your own permissions.',
            authCannotRemoveYourself: 'You cannot remove yourself.',
            authTooManyAttempts: 'Too many incorrect login attempts. Your account has been temporarily locked for security. Please try again later.',
            authTooManyPasswordResetRequests: 'Too many password reset requests. Please wait a few minutes before trying again.'
        },
        serverError: {
            title: 'Server error',
            unexpected: 'An unexpected error occurred. Please try again.',
            description: 'An error occurred while processing the request.',
            returnHome: 'Return to home page'
        }
    },
    logout: {
        dialogTitle: 'Ending session',
        dialogDescription: 'Your session is being ended. Do you want to continue?',
        cancel: 'Cancel',
        confirm: 'End session'
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
            delete: 'Delete',
            actions: 'Actions',
            active: 'Activate',
            inactive: 'Deactivate',
            continue: 'Continue'
        }
    },
    pagination: {
        previousPage: 'Previous page',
        nextPage: 'Next page'
    },
    languages: {
        pt: 'Portuguese',
        en: 'English',
        es: 'Spanish'
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
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm'
    },
    enums: {
        gender: {
            unknown: 'Not informed',
            masculine: 'Masculine',
            feminine: 'Feminine'
        },
        status: {
            preAnalisys: 'Pre-analysis',
            created: 'Registered',
            inService: 'In service',
            experimentalClass: 'Experimental class',
            experimentalClassMissed: 'Reschedule',
            feedback: 'Feedback',
            contract: 'Contract signing',
            waitingPayment: 'Waiting payment',
            paid: 'Enrolled',
            talkLater: 'Talk later',
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
        age: {
            under12: 'Under 12',
            from12To18: '12 to 18',
            from18To22: '18 to 22',
            from22To28: '22 to 28',
            from28To40: '28 to 40',
            from40To65: '40 to 65',
            older65: 'Over 65'
        },
        studyReason: {
            work: 'Work',
            travel: 'Travel',
            apprenticeship: 'Apprenticeship',
            other: 'Other'
        }
    }
}
