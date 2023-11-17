import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verifyJwt'
import { createCheckIn } from './createCheckIn'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gym/:gymId/check-in', createCheckIn)
}
