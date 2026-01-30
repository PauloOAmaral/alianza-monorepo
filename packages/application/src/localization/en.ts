export const en = {
    errors: {
        base: {
            unexpectedError:
                "Sorry, an unexpected error occurred. Please try again or contact support.",
        },
        common: {
            databaseNotFound: "Database not found.",
            commonAlreadyExists: "This record already exists.",
            commonNameAlreadyExists: "This name is already in use. Please choose another name.",
            commonValidationError:
                "The provided data is invalid. Please check your information and try again.",
            commonNotFound: "Not found.",
            commonVersionLanguageAlreadyExists:
                "This version and language combination already exists. Please use a different version or language.",
        },
        auth: {
            authSignupConfirmationExpired:
                "The registration confirmation link has expired. Please request a new confirmation link to continue.",
            authUserAlreadyExists:
                "This email is already registered. Please login or use another email address.",
            authDomainConfiguredForSaml:
                "Your company uses single sign-on (SSO). Please use your corporate email to authenticate.",
            authInvalidPassword:
                "The password entered is incorrect. Please verify and try again.",
            authUserNotFound:
                "We couldn't find an account with this email. Please verify the address provided.",
            authEmailNotVerified:
                "Your email hasn't been verified yet. Please check your inbox to confirm your registration.",
            authTenantNotFound:
                "We couldn't find the specified company. Please verify the code and try again.",
            authUserTenantNotFound:
                "You don't have access to this company. Please verify your permissions or request access.",
            authInviteNotFoundOrExpired:
                "The invitation is no longer valid. Please request a new invite from the administrator.",
            authInviteAlreadyAccepted:
                "This invitation has already been used. Please login normally with your credentials.",
            authUserAlreadyExistsWithinTenant: "You already have access to this company.",
            authPasswordResetNotFoundOrExpired:
                "The password reset link has expired. Please request a new link to continue.",
            authEmailVerificationNotFoundOrExpired:
                "The verification link has expired. Please request a new verification link.",
            authInvalidToken:
                "The access token is invalid. Please try again or request a new link.",
            authSessionNotFound: "Your session has expired for security. Please login again.",
            authInvalidSamlResponse:
                "There was a problem with SSO authentication. Please try again.",
            authErrorLinkingSamlProviderToUser:
                "Unable to link your account to SSO. Please try again or contact support.",
            authUserEmailDoesNotMatchSamlResponse:
                "Your account email doesn't match the SSO email. Please verify and try again.",
            authErrorGettingSamlAuthorizeUrl:
                "Unable to initiate SSO authentication. Please try again.",
            authDomainNotConfiguredForSaml:
                "This domain doesn't have SSO configured. Please login with your email and password.",
            authUserTenantInvitationExpired:
                "The invitation to this company has expired. Please request a new invite from the administrator.",
            authUserHasNoTenant:
                "Your account isn't linked to any company. Please request an invite from the administrator.",
            authErrorParsingSamlMetadata:
                "There was an error processing SSO information. Please try again or contact support.",
            authDocumentAlreadyInUse:
                "This document number and type combination is already in use.",
            authCannotEditOwnPermissionGroup:
                "You cannot edit or delete your own permission group.",
            authPermissionGroupAdminCannotBeChanged:
                "This permission group cannot be changed or deleted.",
            authPermissionGroupUsed:
                "This permission group is used by a user tenant. Please remove the user tenant before deleting the permission group.",
            authInvalidPermissionGroups: "Invalid permission groups selected.",
            authCannotChangeOwnPermissions: "You cannot change your own permissions.",
            authCannotRemoveYourself: "You cannot remove yourself.",
            authTooManyAttempts:
                "Too many incorrect login attempts. Your account has been temporarily locked for security. Please try again later.",
            authTooManyPasswordResetRequests:
                "Too many password reset requests. Please wait a few minutes before trying again.",
        },
    },
}
