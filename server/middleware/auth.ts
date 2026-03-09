import type { NextFunction, Request, Response } from 'express'
import { supabaseAdmin } from '../supabaseClient'

export interface AuthedRequest extends Request {
  user?: {
    id: string
    email?: string | undefined
    [key: string]: unknown
  }
}

export async function requireSupabaseUser(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing Authorization header' })
    return
  }

  const token = authHeader.slice('Bearer '.length)

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !data.user) {
      res.status(401).json({ error: 'Invalid or expired token' })
      return
    }

    req.user = {
      id: data.user.id,
      email: data.user.email ?? undefined,
      ...(data.user.user_metadata as Record<string, unknown>),
    }

    next()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error verifying Supabase token', err)
    res.status(500).json({ error: 'Failed to verify authentication token' })
  }
}

