import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verifyJwt'
import { createCheckIn } from './createCheckIn'
import { fetchUserCheckIns } from './fetchUserCheckIns'
import { validateCheckIn } from './validateCheckIn'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gym/:gymId/check-in', createCheckIn)
  app.get('/check-in/history', fetchUserCheckIns)
  app.patch('/check-in/:checkInId/validate', validateCheckIn)
}
