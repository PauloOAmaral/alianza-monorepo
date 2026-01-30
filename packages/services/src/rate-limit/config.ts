import type { RateLimitConfig, RateLimitType } from "./types"

/**
 * Rate limit configurations following OWASP 2025 security standards.
 *
 * Multiple tiers provide progressive lockout strategy:
 * - Each tier represents stricter limits based on time window
 * - When attempts exceed a tier's threshold within its window, the next tier's lockout applies
 * - Prevents brute force attacks while avoiding permanent account lockout (DoS vulnerability)
 *
 * Example (login):
 * - 5 failed attempts in 15 minutes → locked for 15 minutes
 * - 10 failed attempts in 1 hour → locked for 1 hour
 * - 15 failed attempts in 24 hours → locked for 24 hours
 */
export const RATE_LIMIT_CONFIGS: Record<RateLimitType, RateLimitConfig[]> = {
    login: [
        { attempts: 5, windowMinutes: 15, lockoutMinutes: 15 },
        { attempts: 10, windowMinutes: 60, lockoutMinutes: 60 },
        { attempts: 15, windowMinutes: 1440, lockoutMinutes: 1440 },
    ],
    "password-reset": [
        { attempts: 3, windowMinutes: 15, lockoutMinutes: 15 },
        { attempts: 5, windowMinutes: 60, lockoutMinutes: 60 },
    ],
    "password-reset-ip": [
        { attempts: 10, windowMinutes: 15, lockoutMinutes: 15 },
        { attempts: 30, windowMinutes: 60, lockoutMinutes: 60 },
    ],
}
