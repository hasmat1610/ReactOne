import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import authRoutes from './routes/auth'
import chatRoutes from './routes/chat'

dotenv.config()

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET || 'fallback_secret_change_me'))

app.use('/auth', authRoutes)
app.use('/chat', chatRoutes)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${PORT}`)
  // eslint-disable-next-line no-console
  console.log(`FRONTEND_URL: ${FRONTEND_URL}`)
})

