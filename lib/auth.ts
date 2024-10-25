import { cookies } from "next/headers"

const jwtCookieName = "krs_dash_sess"
const jwtSecret = process.env.JWT_SECRET!

export type jwtSchema = {
  username: string,
  iat: number
}

/**
 * Get JWT cookie. Should already be authenticated.
 * @returns {string}
 */
export function getJwt(): string {
  return cookies().get(jwtCookieName)?.value!
}

export { jwtCookieName, jwtSecret }
