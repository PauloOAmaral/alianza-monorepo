import { addSeconds, isBefore } from "date-fns"
import { ENV } from "~/utils/env"

/**
 * Checks if the session should be refreshed based on the expiration threshold
 * @param expiresAt - The expiration date of the session
 * @returns True if the session should be refreshed, false otherwise
 */
export function shouldRefreshSession(expiresAt: Date) {
    return isBefore(
        expiresAt,
        addSeconds(new Date(), Number(ENV.SESSION_REFRESH_THRESHOLD)),
    )
}
