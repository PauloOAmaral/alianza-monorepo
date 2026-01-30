import bcrypt from 'bcrypt-edge'

const SALT_ROUNDS = 10

export function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)

    return bcrypt.hashSync(password, salt)
}

export function comparePasswords(plaintext: string, hash: string): boolean {
    return bcrypt.compareSync(plaintext, hash)
}
