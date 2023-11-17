import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { buildCheckInUseCase } from '@/use-cases/factories/build-check-in-use-case'

export async function createCheckIn(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const createCheckInBodySchmea = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { latitude, longitude } = createCheckInBodySchmea.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const createCheckInUseCase = buildCheckInUseCase()
  await createCheckInUseCase.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: request.user.sub,
  })

  return response.status(201).send()
}
