import { FastifyInstance } from 'fastify'
import { registerUser } from '../http/controller/registerUser'
import { authenticateUser } from './controller/authenticateUser'
import { getUserProfile } from './controller/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/session', authenticateUser)

  app.get('/me', getUserProfile)
}
