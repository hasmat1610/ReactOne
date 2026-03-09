import api from '../lib/axios'
import type { AuthUser } from '../context/AuthContext'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  name: string
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', credentials)
    return response.data
  },

  getGoogleAuthUrl: async (): Promise<{ url: string } | AuthUser> => {
    const response = await api.get('/auth/google/url')
    return response.data as { url: string } | AuthUser
  },

  getProfile: async (): Promise<AuthUser> => {
    const response = await api.get<AuthUser>('/auth/profile')
    return response.data
  },

  logout: async (): Promise<unknown> => {
    const response = await api.post('/auth/logout')
    return response.data
  },
}

