import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { buildSearchGymUseCase } from '@/use-cases/factories/build-search-gym-use-case'

export async function searchGym(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymQuerySchema.parse(request.query)

  const searchGymUseCase = buildSearchGymUseCase()
  const { gyms } = await searchGymUseCase.execute({
    title: q,
    page,
  })

  return response.status(200).send({ gyms })
}
