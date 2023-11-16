import { FastifyInstance } from 'fastify'
import { registerUser } from '../http/controller/registerUser'
import { authenticateUser } from './controller/authenticateUser'
import { getUserProfile } from './controller/profile'
import { verifyJWT } from './middlewares/verifyJwt'
import { createGym } from './controller/createGym'
import { searchGym } from './controller/searchGym'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/session', authenticateUser)

  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)

  app.post('/gym', { onRequest: [verifyJWT] }, createGym)
  app.get('/gym/search', { onRequest: [verifyJWT] }, searchGym)
}
