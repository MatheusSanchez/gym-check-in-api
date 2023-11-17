import { FastifyInstance } from 'fastify'
import { authenticateUser } from './authenticateUser'
import { getUserProfile } from './profile'
import { registerUser } from './registerUser'
import { verifyJWT } from '../../middlewares/verifyJwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/session', authenticateUser)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
}
