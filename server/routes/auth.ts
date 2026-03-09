import { Router } from 'express'
import {
  getProfile,
  handleGoogleCallback,
  initiateGoogleLogin,
  mockLogin,
  mockRegister,
} from '../controllers/authController'

const router = Router()

router.post('/login', mockLogin)
router.post('/register', mockRegister)
router.get('/profile', getProfile)
router.get('/google', initiateGoogleLogin)
router.get('/google/callback', handleGoogleCallback)

export default router

