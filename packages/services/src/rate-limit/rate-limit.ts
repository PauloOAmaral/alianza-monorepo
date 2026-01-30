import { getRateLimitKv } from '../kv'
import { RATE_LIMIT_CONFIGS } from './config'
import type { RateLimitConfig, RateLimitData, RateLimitResult, RateLimitType } from './types'

function getRateLimitKey(type: RateLimitType, identifier: string): string {
    return `rate-limit:${type}:${identifier.toLowerCase()}`
}

async function getRateLimitData(type: RateLimitType, identifier: string): Promise<RateLimitData | null> {
    const kv = getRateLimitKv()
    const key = getRateLimitKey(type, identifier)
    const data = await kv.get(key)

    if (!data) {
        return null
    }

    return JSON.parse(data) as RateLimitData
}

async function setRateLimitData(type: RateLimitType, identifier: string, data: RateLimitData, expirationMinutes: number): Promise<void> {
    const kv = getRateLimitKv()
    const key = getRateLimitKey(type, identifier)

    await kv.set(key, JSON.stringify(data), {
        expirationTtl: expirationMinutes * 60
    })
}

function findViolatedTier(configs: RateLimitConfig[], attempts: number, firstAttemptAt: number, now: number): { tier: number; config: RateLimitConfig } | null {
    for (let i = configs.length - 1; i >= 0; i--) {
        const config = configs[i]

        if (!config) {
            continue
        }

        const windowStart = now - config.windowMinutes * 60 * 1000

        if (firstAttemptAt >= windowStart && attempts >= config.attempts) {
            return { tier: i, config }
        }
    }

    return null
}

export async function checkRateLimit(type: RateLimitType, identifier: string): Promise<RateLimitResult> {
    const data = await getRateLimitData(type, identifier)
    const now = Date.now()

    if (!data) {
        return { allowed: true }
    }

    if (data.lockedUntil && now < data.lockedUntil) {
        return {
            allowed: false,
            lockedUntil: new Date(data.lockedUntil),
            lockoutDurationMinutes: Math.ceil((data.lockedUntil - now) / (60 * 1000))
        }
    }

    const configs = RATE_LIMIT_CONFIGS[type]
    const nextAttemptCount = data.attempts + 1
    const violatedTier = findViolatedTier(configs, nextAttemptCount, data.firstAttemptAt, now)

    if (violatedTier) {
        return {
            allowed: false,
            lockedUntil: new Date(now + violatedTier.config.lockoutMinutes * 60 * 1000),
            lockoutDurationMinutes: violatedTier.config.lockoutMinutes
        }
    }

    const currentTier = findViolatedTier(configs, data.attempts, data.firstAttemptAt, now)

    if (currentTier) {
        const remainingAttempts = currentTier.config.attempts - data.attempts

        return {
            allowed: true,
            remainingAttempts: remainingAttempts > 0 ? remainingAttempts : 0
        }
    }

    return { allowed: true }
}

export async function recordAttempt(type: RateLimitType, identifier: string): Promise<void> {
    const data = await getRateLimitData(type, identifier)
    const now = Date.now()
    const configs = RATE_LIMIT_CONFIGS[type]
    const maxWindowMinutes = Math.max(...configs.map(c => c.windowMinutes))

    if (!data) {
        await setRateLimitData(
            type,
            identifier,
            {
                attempts: 1,
                firstAttemptAt: now,
                currentTier: 0
            },
            maxWindowMinutes
        )

        return
    }

    const largestWindow = configs[configs.length - 1]

    if (!largestWindow) {
        return
    }

    const largestWindowStart = now - largestWindow.windowMinutes * 60 * 1000

    if (data.firstAttemptAt < largestWindowStart) {
        await setRateLimitData(
            type,
            identifier,
            {
                attempts: 1,
                firstAttemptAt: now,
                currentTier: 0
            },
            maxWindowMinutes
        )

        return
    }

    const updatedAttempts = data.attempts + 1
    const updatedData: RateLimitData = {
        ...data,
        attempts: updatedAttempts
    }

    const violatedTier = findViolatedTier(configs, updatedAttempts, data.firstAttemptAt, now)

    if (violatedTier) {
        updatedData.currentTier = violatedTier.tier
        updatedData.lockedUntil = now + violatedTier.config.lockoutMinutes * 60 * 1000
    }

    await setRateLimitData(type, identifier, updatedData, maxWindowMinutes)
}

export async function resetRateLimit(type: RateLimitType, identifier: string): Promise<void> {
    const kv = getRateLimitKv()
    const key = getRateLimitKey(type, identifier)

    await kv.delete(key)
}
