import { FastifyInstance } from 'fastify'
import { authenticateUser } from './authenticateUser'
import { getUserProfile } from './profile'
import { registerUser } from './registerUser'
import { verifyJWT } from '../../middlewares/verifyJwt'
import { getUserMetrics } from './getUserMetrics'
import { refreshToken } from './refreshToken'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/session', authenticateUser)

  app.patch('/token/refresh', refreshToken)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
  app.get('/users/metrics', { onRequest: [verifyJWT] }, getUserMetrics)
}
