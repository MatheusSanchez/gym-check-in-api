import { FastifyReply, FastifyRequest } from 'fastify'
import { buildGetUserMetricsUseCase } from '@/use-cases/factories/build-get-user-metrics'

export async function getUserMetrics(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const getUserMetricsUseCase = buildGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return response.status(200).send({ checkInsCount })
}
