import { Router } from 'express'
import { handleChatRequest } from '../controllers/chatController'
import { requireSupabaseUser } from '../middleware/auth'

const router = Router()

router.post('/', requireSupabaseUser, handleChatRequest)

export default router

