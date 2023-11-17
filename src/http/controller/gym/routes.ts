import { FastifyInstance } from 'fastify'
import { createGym } from '../gym/createGym'
import { fetchNearbyGyms } from '../gym/fetchNearbyGyms'
import { searchGym } from '../gym/searchGym'
import { verifyJWT } from '../../middlewares/verifyJwt'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gym', createGym)
  app.get('/gym/search', searchGym)
  app.get('/gym/nearby', fetchNearbyGyms)
}
