import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlredyExistError } from '@/use-cases/errors/userAlreadyExistsError'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '@/use-cases/registerUserUseCase'

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
    if (e instanceof UserAlredyExistError) {
      return response.status(409).send({ message: e.message })
    }

    throw e
  }

  return response.status(201).send()
}
