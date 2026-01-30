import { customAlphabet } from 'nanoid'

export function nanoid(length: number) {
    return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)()
}
