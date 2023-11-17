import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { buildFetchNearbyGymsUseCase } from '@/use-cases/factories/build-fetch-nearby-gyms-use-case'

export async function fetchNearbyGyms(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const nearbyGymsSchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsSchema.parse(request.query)

  const fetchNearbyGymsUseCase = buildFetchNearbyGymsUseCase()
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return response.status(200).send({ gyms })
}
