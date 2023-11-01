import { FastifyInstance } from 'fastify'
import { registerUser } from '../http/controller/registerUser'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
}
