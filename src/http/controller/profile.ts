import { buildGetUserProfileUseCase } from '@/use-cases/factories/build-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserProfile(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const getUserProfileUseCase = buildGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  })

  return response.status(200).send({ ...user, password_hash: undefined })
}
