import { InvalidCredentialsError } from '@/use-cases/errors/invalidCredentialsError'
import { buildAuthenticateUseCase } from '@/use-cases/factories/build-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateUser(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const authenticateUserBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateUserBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = buildAuthenticateUseCase()

    await authenticateUserUseCase.execute({ email, password })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: e.message })
    }

    throw e
  }
}
