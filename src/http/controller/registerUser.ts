import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUserUseCase } from '../../use-cases/registerUser'

export async function registerUser(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchmea = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchmea.parse(request.body)

  await registerUserUseCase({ name, email, password })

  return response.status(201).send()
}
