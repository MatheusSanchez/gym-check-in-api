import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, beforeEach, describe, it } from 'vitest'
import { GetUserMetricsUseCase } from './getUserMetrics'

let checkInRepository: InMemoryCheckInRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Check-in use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be to get count check ins metric', async () => {
    await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
