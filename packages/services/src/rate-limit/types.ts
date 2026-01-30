export type RateLimitType = 'login' | 'password-reset' | 'password-reset-ip'

export interface RateLimitConfig {
    attempts: number
    windowMinutes: number
    lockoutMinutes: number
}

export interface RateLimitData {
    attempts: number
    firstAttemptAt: number
    lockedUntil?: number
    currentTier: number
}

export interface RateLimitResult {
    allowed: boolean
    remainingAttempts?: number
    lockedUntil?: Date
    lockoutDurationMinutes?: number
}
