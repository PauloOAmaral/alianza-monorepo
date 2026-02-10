export const authPT = {
    fields: {
        verification: {
            required: 'A verificação é obrigatória'
        },
        email: {
            invalid: 'E-mail inválido',
            maxLength: 'O e-mail deve ter no máximo 255 caracteres'
        },
        password: {
            label: 'Senha',
            forgotPassword: 'Esqueceu sua senha?',
            required: 'Senha é obrigatória',
            minLength: 'A senha deve ter pelo menos 6 caracteres',
            maxLength: 'A senha deve ter no máximo 100 caracteres'
        }
    },
    formPages: {
        title: 'Entre na sua conta',
        description: 'Digite seu e-mail abaixo para entrar na sua conta',
        pageTitle: 'Entrar Alianza',
        pageDescription: 'Entre na sua conta Alianza',
        success: 'Login realizado com sucesso'
    }
}

export const authEN = {
    fields: {
        verification: {
            required: 'Verification is required'
        },
        email: {
            invalid: 'Invalid email',
            maxLength: 'Email must be at most 255 characters'
        },
        password: {
            label: 'Password',
            forgotPassword: 'Forgot your password?',
            required: 'Password is required',
            minLength: 'Password must be at least 6 characters',
            maxLength: 'Password must be at most 100 characters'
        }

    },
    formPages: {
        title: 'Login to your account',
        description: 'Enter your email below to login to your account',
        pageTitle: 'Login Alianza',
        pageDescription: 'Login to your Alianza account',
        success: 'Login successful'
    }
}

export const authES = {
    fields: {
        verification: {
            required: 'La verificación es obligatoria'
        },
        email: {
            invalid: 'Correo electrónico inválido',
            maxLength: 'El correo debe tener como máximo 255 caracteres'
        },
        password: {
            label: 'Contraseña',
            forgotPassword: '¿Olvidaste tu contraseña?',
            required: 'La contraseña es obligatoria',
            minLength: 'La contraseña debe tener al menos 6 caracteres',
            maxLength: 'La contraseña debe tener como máximo 100 caracteres'
        }
    },
    formPages: {
        title: 'Inicia sesión en tu cuenta',
        description: 'Ingresa tu correo electrónico para iniciar sesión en tu cuenta',
        pageTitle: 'Iniciar sesión Alianza',
        pageDescription: 'Inicia sesión en tu cuenta Alianza',
        success: 'Inicio de sesión exitoso'
    }
}