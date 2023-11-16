import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { buildCreateGymUseCase } from '@/use-cases/factories/build-create-gym-use-case'

export async function createGym(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const createGymBodySchmea = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBodySchmea.parse(request.body)

  const createGymUseCase = buildCreateGymUseCase()
  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return response.status(201).send()
}
