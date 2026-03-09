import api from '../lib/axios'

export type ChatReply = { reply: string }

export const chatApi = {
  sendMessage: async (message: string): Promise<ChatReply> => {
    const response = await api.post<ChatReply>('/chat', { message })
    return response.data
  },
}

