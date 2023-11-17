import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { buildValidateCheckInUseCase } from '@/use-cases/factories/build-validate-check-in-use-case'

export async function validateCheckIn(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = buildValidateCheckInUseCase()
  await validateCheckInUseCase.execute({
    checkInId,
  })

  return response.status(204).send()
}
