import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import axios from 'axios'
import type { Request, Response } from 'express'
import { generateToken, verifyToken, type UserPayload } from '../utils/jwt'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const PORT = process.env.PORT || 3000

let oauth2Client: OAuth2Client | null = null
function getOAuthClient() {
  if (!oauth2Client) {
    oauth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI || `http://localhost:${PORT}/auth/google/callback`,
    )
  }
  return oauth2Client
}

export function mockLogin(req: Request, res: Response) {
  const { email, password } = req.body as { email?: unknown; password?: unknown }
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const mockUser: UserPayload = {
    id: 'evt_123',
    name: 'Demo User',
    email,
    picture: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
  }
  const token = generateToken(mockUser)
  return res.json({ token, user: mockUser })
}

export function mockRegister(req: Request, res: Response) {
  const { name, email, password } = req.body as {
    name?: unknown
    email?: unknown
    password?: unknown
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Name, email, and password are required' })
  }

  const mockUser: UserPayload = {
    id: `evt_${Math.random().toString(36).slice(2, 11)}`,
    name,
    email,
    picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
  }
  const token = generateToken(mockUser)
  return res.status(201).json({ token, user: mockUser, message: 'Registration successful' })
}

export function getProfile(req: Request, res: Response) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })

  const decoded = verifyToken(token)
  if (!decoded) return res.status(401).json({ message: 'Invalid or expired token' })

  return res.json(decoded)
}

export function initiateGoogleLogin(req: Request, res: Response) {
  const state = crypto.randomBytes(32).toString('hex')

  res.cookie('oauth_state', state, {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  const authorizeUrl = getOAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    state,
    prompt: 'consent',
  })

  return res.redirect(authorizeUrl)
}

export async function handleGoogleCallback(req: Request, res: Response) {
  try {
    const code = typeof req.query.code === 'string' ? req.query.code : undefined
    const state = typeof req.query.state === 'string' ? req.query.state : undefined

    const cookieState =
      typeof (req as Request & { signedCookies?: Record<string, unknown> }).signedCookies?.oauth_state ===
      'string'
        ? ((req as Request & { signedCookies: Record<string, unknown> }).signedCookies.oauth_state as string)
        : undefined

    if (!state || !cookieState || state !== cookieState) {
      return res.status(403).json({ error: 'Invalid state parameter. CSRF validation failed.' })
    }

    res.clearCookie('oauth_state')

    if (!code) return res.status(400).json({ error: 'Missing code' })

    const { tokens } = await getOAuthClient().getToken(code)

    const accessToken = tokens.access_token
    if (!accessToken) throw new Error('Missing access token')

    const userResponse = await axios.get<{
      sub: string
      name: string
      email: string
      picture?: string
    }>('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const { sub, name, email, picture } = userResponse.data
    const userPayload: UserPayload = picture
      ? { id: sub, name, email, picture }
      : { id: sub, name, email }

    const token = generateToken(userPayload)
    return res.redirect(`${FRONTEND_URL}/login?token=${token}`)
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Authentication Error:', msg)
    return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`)
  }
}

