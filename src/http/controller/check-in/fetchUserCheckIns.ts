import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { buildFetchUserCheckInsUseCase } from '@/use-cases/factories/build-fetch-user-check-ins-use-case'

export async function fetchUserCheckIns(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const fetchUserCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchUserCheckInsQuerySchema.parse(request.query)

  const fetchCheckInUseCas = buildFetchUserCheckInsUseCase()
  const { checkIns } = await fetchCheckInUseCas.execute({
    page,
    userId: request.user.sub,
  })

  return response.status(200).send({ checkIns })
}
