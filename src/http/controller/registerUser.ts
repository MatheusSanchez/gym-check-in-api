import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUserUseCase } from '../../use-cases/registerUserUseCase'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'

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

  try {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository)

    await registerUserUseCase.execute({ name, email, password })
  } catch (e) {
    console.log(e)
    return response.status(409).send()
  }

  return response.status(201).send()
}
