export const usersPT = {
    fields: {
        email: {
            label: 'E-mail',
            required: 'O e-mail é obrigatório.',
            invalid: 'Informe um e-mail válido.'
        },
        firstName: { label: 'Nome' },
        lastName: { label: 'Sobrenome' }
    },
    dialogs: {
        edit: {
            title: 'Editar usuário',
            description: 'Atualize os dados do usuário do sistema.',
            success: 'Usuário atualizado com sucesso.'
        }
    },
    tablePages: {
        headers: {
            name: 'Nome',
            email: 'E-mail',
            emailConfirmed: 'E-mail confirmado',
            actions: 'Ações'
        },
        empty: 'Nenhum usuário encontrado.',
        emailConfirmed: 'Confirmado',
        emailNotConfirmed: 'Não confirmado'
    },
    formPages: {
        title: 'Usuários do sistema',
        newUser: 'Novo usuário'
    }
}

export const usersEN = {
    fields: {
        email: {
            label: 'Email',
            required: 'Email is required.',
            invalid: 'Enter a valid email.'
        },
        firstName: { label: 'First name' },
        lastName: { label: 'Last name' }
    },
    dialogs: {
        edit: {
            title: 'Edit user',
            description: 'Update system user data.',
            success: 'User updated successfully.'
        }
    },
    tablePages: {
        headers: {
            name: 'Name',
            email: 'Email',
            emailConfirmed: 'Email confirmed',
            actions: 'Actions'
        },
        empty: 'No users found.',
        emailConfirmed: 'Confirmed',
        emailNotConfirmed: 'Not confirmed'
    },
    formPages: {
        title: 'System users',
        newUser: 'New user'
    }
}

export const usersES = {
    fields: {
        email: {
            label: 'Correo electrónico',
            required: 'El correo es obligatorio.',
            invalid: 'Ingrese un correo válido.'
        },
        firstName: { label: 'Nombre' },
        lastName: { label: 'Apellido' }
    },
    dialogs: {
        edit: {
            title: 'Editar usuario',
            description: 'Actualice los datos del usuario del sistema.',
            success: 'Usuario actualizado con éxito.'
        }
    },
    tablePages: {
        headers: {
            name: 'Nombre',
            email: 'Correo',
            emailConfirmed: 'Correo confirmado',
            actions: 'Acciones'
        },
        empty: 'Ningún usuario encontrado.',
        emailConfirmed: 'Confirmado',
        emailNotConfirmed: 'No confirmado'
    },
    formPages: {
        title: 'Usuarios del sistema',
        newUser: 'Nuevo usuario'
    }
}
