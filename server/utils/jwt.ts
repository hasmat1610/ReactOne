import jwt, { type JwtPayload } from 'jsonwebtoken'

export type UserPayload = {
  id: string
  name: string
  email: string
  picture?: string
}

export const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_change_me'

export function generateToken(user: UserPayload): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): (JwtPayload & UserPayload) | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (typeof decoded === 'string') return null
    return decoded as JwtPayload & UserPayload
  } catch {
    return null
  }
}

