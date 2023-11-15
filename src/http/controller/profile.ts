import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserProfile(
  request: FastifyRequest,
  response: FastifyReply,
) {
  await request.jwtVerify()
  console.log(request.user.sub)

  return response.status(200).send()
}
