import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, beforeEach, describe, it, vi, afterAll } from 'vitest'
import { FetchUserCheckInsUseCase } from './fetchUserCheckIns'

let checkInRepository: InMemoryCheckInRepository
let fetchUserCheckInsUseCase: FetchUserCheckInsUseCase

describe('Fetch Check-ins use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    fetchUserCheckInsUseCase = new FetchUserCheckInsUseCase(checkInRepository)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch check-in history', async () => {
    await checkInRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })
    await checkInRepository.create({ gym_id: 'gym-02', user_id: 'user-02' })

    const { checkIns } = await fetchUserCheckInsUseCase.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01', user_id: 'user-01' }),
      expect.objectContaining({ gym_id: 'gym-02', user_id: 'user-01' }),
    ])
  })

  it('should be able to fetch paginated check-ins', async () => {
    for (let i = 1; i <= 21; i++) {
      await checkInRepository.create({ gym_id: `gym-${i}`, user_id: 'user-01' })
    }
    const { checkIns } = await fetchUserCheckInsUseCase.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(1)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21', user_id: 'user-01' }),
    ])
  })
})
